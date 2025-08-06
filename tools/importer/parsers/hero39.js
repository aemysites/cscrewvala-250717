/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero39)'];

  // Find the two main grid columns (image and content)
  // The root element is <header> → <div.w-layout-grid.grid-layout> → two children
  const gridLayout = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let imgCell = null;
  let contentCell = null;

  if (gridLayout) {
    const cols = gridLayout.querySelectorAll(':scope > div');
    // One will have the background image, the other the textual content
    // Image cell: look for direct descendant with <img>
    for (const col of cols) {
      const img = col.querySelector('img');
      if (img && !imgCell) {
        imgCell = img;
      }
      // Content cell: look for h1
      if (col.querySelector('h1') && !contentCell) {
        // The block containing the h1, subheading, and button group
        // There might be a grid inside here containing the content
        const innerGrid = col.querySelector('.w-layout-grid.grid-layout');
        if (innerGrid) {
          contentCell = innerGrid;
        } else {
          contentCell = col;
        }
      }
    }
  }

  // Fallbacks
  if (!imgCell) {
    imgCell = element.querySelector('img');
  }
  if (!contentCell) {
    // Use the element itself, but this should never happen for the given structure
    contentCell = element;
  }

  const rows = [
    headerRow,
    [imgCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}