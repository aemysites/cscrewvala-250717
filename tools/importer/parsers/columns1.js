/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // According to the markdown/example: header row is a single cell, content row has n columns
  const headerRow = ['Columns (columns1)'];
  const columnsRow = columns;

  // Create the table using createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
