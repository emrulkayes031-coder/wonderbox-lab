const paths = {
  "arrow-right": '<path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5"/>',
  "arrow-up-right": '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  "arrow-left": '<path d="M19.5 12h-14M11 6.5 5.5 12 11 17.5"/>',
  "chevron-down": '<path d="m6.5 9.5 5.5 5.5 5.5-5.5"/>',
  "arrow-down": '<path d="M12 4.5v14M6.5 13l5.5 5.5 5.5-5.5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.8 7.2 8.2 5.6 8.2-5.6"/>',
  gamepad:
    '<path d="M7.2 8.2h9.6a4.7 4.7 0 0 1 4.6 5.7l-.7 3a2.5 2.5 0 0 1-4.3 1.1L14.7 16H9.3l-1.7 2a2.5 2.5 0 0 1-4.3-1.1l-.7-3a4.7 4.7 0 0 1 4.6-5.7Z"/><path d="M8 11v4M6 13h4"/><circle cx="16.4" cy="12.4" r=".9" fill="currentColor" stroke="none"/><circle cx="17.8" cy="14.6" r=".9" fill="currentColor" stroke="none"/>',
  apps:
    '<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.5"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1.5"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1.5"/><rect x="14" y="14" width="6.5" height="6.5" rx="1.5"/>',
  spark:
    '<path d="M12 3.5c.7 4.6 2.9 6.8 7.5 7.5-4.6.7-6.8 2.9-7.5 7.5-.7-4.6-2.9-6.8-7.5-7.5 4.6-.7 6.8-2.9 7.5-7.5Z"/><path d="M19 3.5v3M17.5 5h3"/>',
  layers:
    '<path d="m12 3.5 8.5 4.7L12 12.9 3.5 8.2 12 3.5Z"/><path d="m3.5 12.2 8.5 4.7 8.5-4.7M3.5 16.2l8.5 4.7 8.5-4.7"/>',
  target:
    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  shield:
    '<path d="M12 3c2.1 1.5 4.6 2.4 7 2.7v5.6c0 4.2-2.7 7.5-7 9.2-4.3-1.7-7-5-7-9.2V5.7C7.4 5.4 9.9 4.5 12 3Z"/><path d="m8.8 12 2.1 2.1 4.4-4.4"/>',
  map:
    '<path d="m3.5 6.5 5-2.5 7 2.5 5-2.5v13l-5 2.5-7-2.5-5 2.5v-13Z"/><path d="M8.5 4v13M15.5 6.5v13"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.3l3.4 2"/>',
  bolt: '<path d="m13.2 2.8-7 10h5.2l-.6 8.4 7-10h-5.2l.6-8.4Z"/>',
  paw: '<circle cx="7" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="17" cy="8" r="2"/><path d="M6.8 14.5c1.2-2 3-3.1 5.2-3.1s4 1.1 5.2 3.1c1 1.7-.2 3.8-2.2 3.8-.9 0-1.8-.4-3-.4s-2.1.4-3 .4c-2 0-3.2-2.1-2.2-3.8Z"/>',
  gift:
    '<rect x="3.5" y="8.5" width="17" height="4" rx="1.2"/><path d="M5 12.5v7.2c0 .7.6 1.3 1.3 1.3h11.4c.7 0 1.3-.6 1.3-1.3v-7.2M12 8.5v12.5"/><path d="M12 8.5C10.8 5 9.4 4 7.8 4 6.3 4 5.5 5.1 5.5 6.2c0 1.3 1.2 2.3 3.2 2.3H12ZM12 8.5C13.2 5 14.6 4 16.2 4c1.5 0 2.3 1.1 2.3 2.2 0 1.3-1.2 2.3-3.2 2.3H12Z"/>',
  lock:
    '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8.2 10V7.8a3.8 3.8 0 0 1 7.6 0V10M12 14v2.5"/>',
  lifebuoy:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.6"/><path d="m6 6 3.5 3.5M14.5 14.5 18 18M18 6l-3.5 3.5M9.5 14.5 6 18"/>',
  check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  external: '<path d="M14 4h6v6M20 4 10 14"/><path d="M18 13.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7.5A1.5 1.5 0 0 1 5 6h5.5"/>',
  play: '<path d="M9 6.8v10.4L17.5 12 9 6.8Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

export function icon(name, className = "") {
  const body = paths[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

export function brandMark(className = "") {
  return `<svg class="brand-mark-svg ${className}" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <rect width="512" height="512" rx="123" fill="var(--mark-bg, #12140f)"/>
    <path d="M135.7 220.2 256 145.9l120.3 74.3v148.7L256 443.2 135.7 368.9V220.2Z" fill="none" stroke="var(--mark-fg, #f3f0e8)" stroke-width="17.9" stroke-linejoin="round"/>
    <path d="m135.7 220.2 120.3 74.3 120.3-74.3M256 294.5v148.7" fill="none" stroke="var(--mark-fg, #f3f0e8)" stroke-width="17.9" stroke-linejoin="round"/>
    <path d="M396.8 115.2c3.6 22 13.6 32 35.6 35.6-22 3.6-32 13.6-35.6 35.6-3.6-22-13.6-32-35.6-35.6 22-3.6 32-13.6 35.6-35.6Z" fill="var(--acid, #d8ff63)"/>
  </svg>`;
}

export function wordmark() {
  return `<span class="brand-word">Wonder Box <span class="brand-word-lab">Lab</span></span>`;
}
