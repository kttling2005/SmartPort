/* Icon paths and the ic() helper. */
const IC={
 overview:'<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/>',
 ops:'<path d="M3 17l2 3h14l2-3M6 17V9h12v8M9 9V5h6v4"/>',
 vessel:'<path d="M3 16l2 4h14l2-4zM7 16V8h10v8M12 8V4"/>',
 cargo:'<path d="M12 3l8 4.500v9L12 21l-8-4.500v-9zM4 7.500l8 4.500 8-4.500M12 12v9"/>',
 yard:'<rect x="4" y="5" width="16" height="14"/><path d="M4 10h16M9 10v9M15 10v9"/>',
 bill:'<rect x="4" y="3" width="16" height="18"/><path d="M12 8v8M9.500 10c0-1 1-1.500 2.500-1.500s2.500.7 2.500 1.700-1 1.400-2.500 1.800-2.500.8-2.500 1.800 1 1.700 2.500 1.700 2.500-.6 2.500-1.500"/>',
 tool:'<path d="M14.500 6.500a4 4 0 0 0-5 5L4 17l3 3 5.500-5.500a4 4 0 0 0 5-5l-2.500 2.500-2-2z"/>',
 map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
 ship:'<path d="M4 16l2 4h12l2-4zM8 16V9h8v7M12 9V5"/>',
 anchor:'<circle cx="12" cy="5" r="2"/><path d="M12 7v14M7 11h10M5 15c0 3 3 6 7 6s7-3 7-6"/>',
 box:'<path d="M12 3l8 4.500v9L12 21l-8-4.500v-9zM4 7.500l8 4.500 8-4.500"/>',
 timer:'<circle cx="12" cy="13" r="7"/><path d="M12 9v4l2 2M10 3h4"/>',
 warn:'<path d="M12 4l9 16H3zM12 10v4M12 17v.1"/>',
 in:'<path d="M19 5L7 17M7 9v8h8"/>',out:'<path d="M5 19L17 7M9 7h8v8"/>',
 arr:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 dl:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 cal:'<rect x="4" y="5" width="16" height="15"/><path d="M4 10h16M9 3v4M15 3v4"/>',
 filt:'<path d="M4 6h16M7 12h10M10 18h4"/>',
 shield:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
 layers:'<path d="M12 4l9 5-9 5-9-5zM3 14l9 5 9-5"/>',expand:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'
};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
