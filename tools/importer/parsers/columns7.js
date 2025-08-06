/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate children divs (each represents a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the contained image (or blank)
  const cols = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : '';
  });
  // Build table with one header cell in the first row, and a content row that may have multiple columns
  const rows = [
    ['Columns (columns7)'],
    cols
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
