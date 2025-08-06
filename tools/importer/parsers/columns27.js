/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get the direct children of grid: expect two columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: need at least two columns for this block

  // 3. Build block table
  const headerRow = ['Columns (columns27)'];
  // Reference elements directly, do not clone or create new unless required
  const contentRow = [columns[0], columns[1]];

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 5. Replace the section with the new table
  element.replaceWith(table);
}
