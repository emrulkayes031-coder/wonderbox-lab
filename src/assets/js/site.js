/* Wonder Box Lab — small, dependency-free interactions. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header state ---------- */

  var header = document.querySelector("[data-site-header]");
  var lastScroll = -1;

  function updateHeader() {
    if (!header) return;
    var y = window.scrollY || 0;
    if (y === lastScroll) return;
    lastScroll = y;
    header.classList.toggle("is-scrolled", y > 8);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ---------- Mobile menu ---------- */

  var dialog = document.getElementById("site-menu");
  var openButton = document.querySelector("[data-menu-open]");
  var closeButton = document.querySelector("[data-menu-close]");
  var closeTimer = null;

  function setMenuState(open) {
    if (openButton) openButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }

  function openMenu() {
    if (!dialog) return;
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
    dialog.classList.remove("is-closing");
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    setMenuState(true);
    var firstLink = dialog.querySelector(".menu-link");
    if (firstLink && !reduceMotion) {
      window.setTimeout(function () {
        firstLink.focus({ preventScroll: true });
      }, 80);
    }
  }

  function closeMenu() {
    if (!dialog || !dialog.open) return;
    setMenuState(false);
    if (reduceMotion) {
      dialog.close();
      return;
    }
    dialog.classList.add("is-closing");
    closeTimer = window.setTimeout(function () {
      dialog.classList.remove("is-closing");
      if (dialog.open) dialog.close();
      if (openButton) openButton.focus({ preventScroll: true });
    }, 250);
  }

  if (openButton) {
    openButton.addEventListener("click", openMenu);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMenu);
  }

  if (dialog) {
    dialog.addEventListener("close", function () {
      setMenuState(false);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeMenu();
    });

    dialog.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeMenu();
    });

    dialog.querySelectorAll(".menu-nav a, .menu-foot a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuState(false);
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dialog && dialog.open) {
      event.preventDefault();
      closeMenu();
    }
  });

  /* ---------- Scroll reveals ---------- */

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reveals.length && !reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("reveal-enabled");
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
    window.setTimeout(function () {
      reveals.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-visible");
        }
      });
    }, 120);
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Hero pointer tilt ---------- */

  var stage = document.querySelector("[data-hero-stage]");
  var stageWrap = document.querySelector("[data-hero-visual]");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (stage && stageWrap && canHover && !reduceMotion) {
    var targetX = 0;
    var targetY = 0;
    var currentX = 0;
    var currentY = 0;
    var raf = null;

    function tick() {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      stage.style.setProperty("--tx", currentX.toFixed(3));
      stage.style.setProperty("--ty", currentY.toFixed(3));
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        raf = window.requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    function startTicking() {
      if (!raf) raf = window.requestAnimationFrame(tick);
    }

    stageWrap.addEventListener("pointermove", function (event) {
      var rect = stageWrap.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetX = Math.max(-1, Math.min(1, targetX));
      targetY = Math.max(-1, Math.min(1, targetY));
      startTicking();
    });

    stageWrap.addEventListener("pointerleave", function () {
      targetX = 0;
      targetY = 0;
      startTicking();
    });
  }

  /* ---------- Product filters ---------- */

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var productCards = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));
  var emptyState = document.querySelector("[data-catalog-empty]");
  var emptyCopy = document.querySelector("[data-empty-copy]");
  var filterStatus = document.querySelector("[data-filter-status]");
  var resetButton = document.querySelector("[data-filter-reset]");

  var categoryNames = {
    all: "All products",
    games: "Games",
    apps: "Apps",
    ai: "AI tools",
    saas: "SaaS",
  };

  var emptyMessages = {
    all: "There are no products to show right now.",
    apps: "Apps are part of the plan, but there is nothing public in this lane yet. When an app is ready, it will appear here.",
    ai: "AI tools are part of the plan, but there is nothing public in this lane yet. Exploring, not announcing.",
    saas: "SaaS is part of the plan, but there is nothing public in this lane yet. The shelf is ready when the work is.",
  };

  function setFilter(category, updateUrl) {
    if (!filterButtons.length) return;

    var valid = filterButtons.some(function (button) {
      return button.getAttribute("data-filter") === category;
    });
    if (!valid) category = "all";

    var visibleCount = 0;

    productCards.forEach(function (card) {
      var show = category === "all" || card.getAttribute("data-category") === category;
      card.hidden = !show;
      card.classList.toggle("is-filtered-out", !show);
      if (show) visibleCount += 1;
    });

    filterButtons.forEach(function (button) {
      var active = button.getAttribute("data-filter") === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
      if (emptyCopy && visibleCount === 0) {
        emptyCopy.textContent = emptyMessages[category] || emptyMessages.all;
      }
    }

    if (filterStatus) {
      filterStatus.textContent =
        visibleCount === 0
          ? "No products in " + (categoryNames[category] || "this category") + " yet"
          : "Showing " + visibleCount + (visibleCount === 1 ? " product" : " products") +
            (category === "all" ? "" : " in " + (categoryNames[category] || category));
    }

    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (category === "all") {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", category);
      }
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }

  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setFilter(button.getAttribute("data-filter"), true);
    });
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      setFilter("all", true);
    });
  }

  if (productCards.length) {
    var initial = "all";
    try {
      var requested = new URLSearchParams(window.location.search).get("category");
      if (requested && categoryNames[requested]) initial = requested;
    } catch (error) {
      initial = "all";
    }
    setFilter(initial, false);
  }

  /* ---------- Copy email ---------- */

  var copyButtons = Array.prototype.slice.call(document.querySelectorAll("[data-copy-email]"));

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-copy-email");
      var label = button.querySelector("[data-copy-label]");
      var original = label ? label.textContent : "Copy address";

      function done() {
        if (label) label.textContent = "Copied";
        button.classList.add("is-copied");
        window.setTimeout(function () {
          if (label) label.textContent = original;
          button.classList.remove("is-copied");
        }, 2200);
      }

      function fallbackCopy() {
        var temp = document.createElement("textarea");
        temp.value = value;
        temp.setAttribute("readonly", "");
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        try {
          document.execCommand("copy");
          done();
        } catch (error) {
          if (label) label.textContent = "Copy failed";
        }
        document.body.removeChild(temp);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });
  });

  /* ---------- Screenshot rail keyboard support ---------- */

  document.querySelectorAll(".shot-rail").forEach(function (rail) {
    rail.addEventListener("keydown", function (event) {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      var first = rail.querySelector(".shot");
      if (!first) return;
      var step = first.getBoundingClientRect().width + 14;
      if (event.key === "ArrowRight") rail.scrollLeft += step;
      if (event.key === "ArrowLeft") rail.scrollLeft -= step;
      if (event.key === "Home") rail.scrollLeft = 0;
      if (event.key === "End") rail.scrollLeft = rail.scrollWidth;
      event.preventDefault();
    });
  });

  /* ---------- Details: close others in the same list ---------- */

  document.querySelectorAll(".faq-list").forEach(function (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll("details"));
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      });
    });
  });
})();
