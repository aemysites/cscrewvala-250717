/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid as columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be a single cell (single-element array)
  const headerRow = ['Columns (columns9)'];
  // The columns row is an array of column elements
  const columnsRow = columns;

  // Compose the table for columns block
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block
  element.replaceWith(block);
}
