# SmartPort UI

Static HTML/CSS/JS. No build step: open `index.html` (or `login.html`) in a browser.

```
index.html            redirects to login.html
login.html            sign-in page (no dashboard shell)
overview.html         one HTML file per dashboard page
operations.html  vessels.html  cargo.html  yard.html
services.html  equipment.html  gis.html  admin.html
css/app.css           design tokens (light + dark), shell and components
js/theme.js           applies the saved or OS theme before first paint
js/icons.js           icon paths and ic()
js/ui.js              shared helpers: KPI cards, tables, tabs, panels, port schematic
js/layout.js          shared dashboard layout: sidebar, top bar, SP.mount(key)
js/pages/*.js         content and behaviour for each page
```

## Add a page
1. Add `[key, 'Label', 'icon']` to `NAV` in `js/layout.js`.
2. Copy any dashboard HTML file (e.g. `yard.html`) to `<key>.html` and change the title and the last script to `js/pages/<key>.js`.
3. In `js/pages/<key>.js` define `V.<key>=()=>\`...html...\``, optionally `BIND.<key>=()=>{...}`, then call `SP.mount('<key>')`.

The shared layout (sidebar, top bar, theme toggle, active menu item, breadcrumb) lives only in `js/layout.js`.
All data in the pages is sample data from the Figma design.
