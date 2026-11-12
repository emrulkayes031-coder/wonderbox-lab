from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630
PAPER = (244, 241, 232)
INK = (17, 19, 14)
MUTED = (95, 99, 87)
ACID = (217, 255, 106)
VIOLET = (216, 210, 255)

AVENIR = "/System/Library/Fonts/Avenir Next.ttc"
GEORGIA_I = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
GEORGIA = "/System/Library/Fonts/Supplemental/Georgia.ttf"


def font(path, size, index=0):
    return ImageFont.truetype(path, size, index=index)


def logo():
    im = Image.open("src/assets/img/brand/logo-512.png").convert("RGBA")
    return im.resize((78, 78), Image.LANCZOS)


def crop_cover(path, box_w, box_h):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    target = box_w / box_h
    if w / h > target:
        new_w = int(h * target)
        im = im.crop(((w - new_w) // 2, 0, (w + new_w) // 2, h))
    else:
        new_h = int(w / target)
        im = im.crop((0, 0, w, max(1, new_h)))
    return im.resize((box_w, box_h), Image.LANCZOS)


def rounded(im, radius):
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle(
        [0, 0, im.size[0] - 1, im.size[1] - 1], radius=radius, fill=255
    )
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def place_phone(base, path, w, h, radius, rotate, x, y, border=7):
    img = crop_cover(path, w, h)
    card = Image.new("RGBA", (w + border * 2, h + border * 2), (0, 0, 0, 0))
    bd = ImageDraw.Draw(card)
    bd.rounded_rectangle(
        [0, 0, card.size[0] - 1, card.size[1] - 1],
        radius=radius,
        fill=(255, 253, 247, 238),
    )
    shot = rounded(img, max(6, radius - border))
    card.paste(shot, (border, border), shot)
    if rotate:
        card = card.rotate(rotate, expand=True, resample=Image.BICUBIC)

    pad = 60
    final = Image.new("RGBA", (card.size[0] + pad * 2, card.size[1] + pad * 2), (0, 0, 0, 0))
    shadow = Image.new("RGBA", card.size, (12, 14, 9, 95))
    alpha = card.split()[3]
    sh = Image.new("RGBA", final.size, (0, 0, 0, 0))
    sh.paste(shadow, (pad, pad + 14), alpha)
    sh = sh.filter(ImageFilter.GaussianBlur(20))
    final.alpha_composite(sh)
    final.alpha_composite(card, (pad, pad))
    base.alpha_composite(final, (x - pad, y - pad))
    return (x, y, card.size[0], card.size[1])


def spark(draw, cx, cy, r, fill):
    pts = []
    for i in range(8):
        angle_r = r if i % 2 == 0 else r * 0.28
        import math

        angle = math.pi / 4 * i - math.pi / 2
        pts.append((cx + math.cos(angle) * angle_r, cy + math.sin(angle) * angle_r))
    draw.polygon(pts, fill=fill)


def brand_lockup(base):
    mark = logo()
    base.alpha_composite(mark, (68, 54))
    d = ImageDraw.Draw(base)
    f_logo = font(AVENIR, 26, 2)
    d.text((162, 73), "Wonder Box", font=f_logo, fill=INK)
    lw = d.textlength("Wonder Box ", font=f_logo)
    d.text((162 + lw, 73), "Lab", font=font(GEORGIA_I, 29), fill=INK)
    suffix = "An independent product & technology brand"
    f_label = font(AVENIR, 15, 5)
    d.text((162, 108), suffix, font=f_label, fill=MUTED)


def grid(base):
    d = ImageDraw.Draw(base)
    for gx in range(0, W, 84):
        d.line([(gx, 0), (gx, H)], fill=(17, 19, 14, 8), width=1)
    for gy in range(0, H, 84):
        d.line([(0, gy), (W, gy)], fill=(17, 19, 14, 8), width=1)
    return d


def save(base, path):
    base.convert("RGB").save(path, quality=91, optimize=True, progressive=True)


# ---------- Generic OG ----------
base = Image.new("RGBA", (W, H), PAPER + (255,))
d = grid(base)

circle = Image.new("RGBA", (760, 760), (0, 0, 0, 0))
cd = ImageDraw.Draw(circle)
cd.ellipse([0, 0, 760, 760], fill=(216, 210, 255, 185))
circle = circle.filter(ImageFilter.GaussianBlur(8))
base.alpha_composite(circle, (700, -90))
circle2 = Image.new("RGBA", (430, 430), (0, 0, 0, 0))
cd = ImageDraw.Draw(circle2)
cd.ellipse([0, 0, 430, 430], fill=(217, 255, 106, 150))
circle2 = circle2.filter(ImageFilter.GaussianBlur(12))
base.alpha_composite(circle2, (900, 380))

ring = Image.new("RGBA", (540, 540), (0, 0, 0, 0))
rd = ImageDraw.Draw(ring)
rd.ellipse([10, 10, 530, 530], outline=(17, 19, 14, 48), width=1)
rd.ellipse([65, 65, 475, 475], outline=(17, 19, 14, 26), width=1)
base.alpha_composite(ring, (730, 34))

place_phone(base, "src/assets/img/rushtrail/home.jpg", 196, 348, 26, -8, 986, 158)
place_phone(base, "src/assets/img/tap-defense/home.jpg", 236, 420, 30, 4, 760, 96)

brand_lockup(base)

f_title = font(AVENIR, 82, 2)
f_title_it = font(GEORGIA_I, 92)
f_body = font(AVENIR, 22, 5)
f_small = font(AVENIR, 15, 2)
d.text((68, 218), "A lab for", font=f_title, fill=INK)
d.text((68, 298), "things worth", font=f_title, fill=INK)
d.text((64, 380), "opening.", font=f_title_it, fill=INK)
d.text((68, 510), "Games today. Apps, AI tools, and SaaS next.", font=f_body, fill=MUTED)
d.text((68, 566), "wonderboxlab", font=f_small, fill=(126, 130, 116))
save(base, "src/assets/img/og.jpg")


# ---------- Product OG ----------
def wrap_words(draw, text, fnt, max_width):
    words = text.split()
    lines, line = [], ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textlength(test, font=fnt) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def product_og(name, tagline, status, screen, accent, soft, path):
    base = Image.new("RGBA", (W, H), PAPER + (255,))
    d = grid(base)

    panel = Image.new("RGBA", (760, 760), (0, 0, 0, 0))
    pd = ImageDraw.Draw(panel)
    pd.ellipse([30, 30, 730, 730], fill=soft + (255,))
    base.alpha_composite(panel, (570, -110))

    circle2 = Image.new("RGBA", (380, 380), (0, 0, 0, 0))
    cd = ImageDraw.Draw(circle2)
    cd.ellipse([0, 0, 380, 380], fill=accent + (115,))
    circle2 = circle2.filter(ImageFilter.GaussianBlur(10))
    base.alpha_composite(circle2, (880, 380))

    ring = Image.new("RGBA", (480, 480), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse([10, 10, 470, 470], outline=(17, 19, 14, 42), width=1)
    rd.ellipse([58, 58, 422, 422], outline=(17, 19, 14, 24), width=1)
    base.alpha_composite(ring, (700, 120))

    place_phone(base, screen, 246, 438, 30, 3, 768, 104)

    d = ImageDraw.Draw(base)
    spark(d, 1120, 152, 28, accent)
    brand_lockup(base)

    fname = font(AVENIR, 76, 2)
    lines = wrap_words(d, name, fname, 640)
    y = 206
    for line in lines:
        d.text((68, y), line, font=fname, fill=INK)
        y += 78
    d.text((66, y + 22), tagline, font=font(GEORGIA_I, 36), fill=(58, 62, 51))

    cy = 492
    fchip = font(AVENIR, 15, 2)
    x = 68
    for text, bg in [("GAME", (255, 253, 247)), (status.upper(), accent)]:
        tw = d.textlength(text, font=fchip)
        d.rounded_rectangle(
            [x, cy, x + tw + 28, cy + 34],
            radius=17,
            fill=bg,
            outline=(17, 19, 14, 40),
        )
        d.text((x + 14, cy + 9), text, font=fchip, fill=INK)
        x += tw + 28 + 8

    d.text((68, 574), "MADE BY WONDER BOX LAB", font=font(AVENIR, 13, 2), fill=(126, 130, 116))
    save(base, path)


product_og(
    "Tap Defense",
    "Small taps. Strong defenses.",
    "PRE-RELEASE",
    "src/assets/img/tap-defense/home.jpg",
    (255, 130, 106),
    (255, 212, 200),
    "src/assets/img/og-tap-defense.jpg",
)
product_og(
    "RushTrail Runaway",
    "Run wild. Go further.",
    "IN DEVELOPMENT",
    "src/assets/img/rushtrail/home.jpg",
    (154, 215, 90),
    (223, 241, 198),
    "src/assets/img/og-rushtrail-runaway.jpg",
)
print("done")
