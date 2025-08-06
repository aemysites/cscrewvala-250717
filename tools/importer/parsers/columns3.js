/* global WebImporter */
export default function parse(element, { document }) {
  // Attempt to match the block header to the actual number of columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // If the block name includes a variant, update to reflect the column count
  let header = 'Columns';
  const blockNameMatch = /(columns\d+)/i.exec(element.textContent);
  let variant = '';
  // Prefer class if present, otherwise fallback to number of columns
  const blockClass = Array.from(grid.classList).find(cls => /columns\d+/i.test(cls));
  if (blockClass) {
    variant = blockClass.match(/columns\d+/i)[0];
  } else {
    variant = `columns${columns.length}`;
  }
  header = `Columns (${variant})`;
  const cells = [
    [header],
    columns.map(col => col)
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
