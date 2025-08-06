/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container inside the provided block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all the direct child columns of the grid
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The first row: exactly one cell containing the block name
  const headerRow = ['Columns (columns31)'];
  // The second row: as many cells as column elements found
  const contentRow = columns;

  // Build the table as required
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table block
  element.replaceWith(block);
}
