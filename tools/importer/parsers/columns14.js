/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the direct child with .grid-layout)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  
  // Table header: one single cell as per the requirements
  const headerRow = ['Columns (columns14)'];
  // Content row: as many cells as there are columns in the layout
  const contentRow = columns;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
