/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero12)'];

  // Find the top-level grid (desktop-1-column)
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  let bgImage = null;
  let contentCell = null;
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    // First column: background image (find .cover-image, but not the card's image)
    if (gridChildren.length > 0) {
      const maybeBg = gridChildren[0].querySelector('img.cover-image');
      if (maybeBg) bgImage = maybeBg;
    }
    // Second column: text/content block (grab the .card-body for semantics)
    if (gridChildren.length > 1) {
      const cardBody = gridChildren[1].querySelector('.card-body');
      if (cardBody) {
        contentCell = cardBody;
      } else {
        // Fallback: use the entire grid cell if .card-body missing
        contentCell = gridChildren[1];
      }
    }
  }

  // Edge case: fallback if top-level grid not found
  if (!bgImage) {
    // Try to find any .cover-image descendant (but not in card-body)
    const imgs = element.querySelectorAll('img.cover-image');
    for (const img of imgs) {
      if (!img.closest('.card-body')) {
        bgImage = img;
        break;
      }
    }
  }
  if (!contentCell) {
    // Try to fallback to any .card-body in the element
    const cardBody = element.querySelector('.card-body');
    if (cardBody) contentCell = cardBody;
  }

  // Always output 3 rows: header, image, content
  // Use .filter(Boolean) to avoid inserting undefined/null
  const rows = [
    headerRow,
    [bgImage].filter(Boolean),
    [contentCell].filter(Boolean)
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
