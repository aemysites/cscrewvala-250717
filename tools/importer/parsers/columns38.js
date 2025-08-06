/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell spanning all columns
  const headerRow = ['Columns (columns38)'];

  // Get all direct child divs (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // The content row has one cell per column
  const contentRow = columns;

  // Compose the table
  const cells = [
    headerRow, // one cell in header row
    contentRow // as many cells as columns
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
