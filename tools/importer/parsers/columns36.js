/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the two main columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column contains heading, subheading and button group
  const leftCol = columns[0];
  // Right column contains images
  const rightCol = columns[1];

  // Reference the leftCol element directly
  // (per instructions, reference existing elements; don't clone)

  // For the right column, find the image grid
  let rightColContent;
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  if (imageGrid) {
    // Use the original imageGrid as the cell content
    rightColContent = imageGrid;
  } else {
    // Fallback: use the whole rightCol
    rightColContent = rightCol;
  }

  const cells = [
    ['Columns (columns36)'],
    [leftCol, rightColContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
