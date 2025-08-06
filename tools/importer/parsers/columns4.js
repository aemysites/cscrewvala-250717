/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab its single img child if it exists, otherwise the whole div
  const images = columns.map((col) => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // Build the rows: first row is single-cell header, second row is a row with N cells (the images)
  const rows = [
    ['Columns (columns4)'],
    images
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
