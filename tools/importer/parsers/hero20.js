/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as in the example
  const headerRow = ['Hero (hero20)'];

  // 2. Background images: collage
  // Look for .ix-hero-scale-3x-to-1x > .grid-layout (contains images)
  let backgroundCell = '';
  const collageMain = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (collageMain) {
    const grid = collageMain.querySelector('.grid-layout');
    if (grid) {
      // All direct children utility-position-relative > img
      const imgs = Array.from(grid.querySelectorAll(':scope > .utility-position-relative > img'));
      if (imgs.length === 1) {
        backgroundCell = imgs[0];
      } else if (imgs.length > 1) {
        // Group in a DIV for layout/semantics
        const collageDiv = document.createElement('div');
        imgs.forEach(img => collageDiv.appendChild(img));
        backgroundCell = collageDiv;
      }
    }
  }

  // 3. Content block: heading, subheading, CTAs
  // This is all inside .ix-hero-scale-3x-to-1x-content > .container
  let contentCell = '';
  const contentWrapper = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentWrapper) {
    contentCell = contentWrapper;
  }

  // 4. Build rows as per spec: header, background, content
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
