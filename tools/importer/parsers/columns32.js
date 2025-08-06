/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container where columns are defined
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid; these are the columns
  const columns = Array.from(grid.children);
  // As per spec, the block name and variant is exactly:
  const headerRow = ['Columns (columns32)'];
  // Compose the columns row, referencing existing elements directly (no cloning)
  const columnsRow = columns.map((col) => col);
  // Build the table structure as per requirements
  const cells = [
    headerRow,
    columnsRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
