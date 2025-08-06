/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Each direct child of the grid is a column cell
  const columnDivs = Array.from(grid.children);

  // For each column, collect all direct child elements (to support images, text, buttons, lists, etc)
  const columnCells = columnDivs.map(colDiv => {
    // Collect all non-empty nodes (elements or significant text)
    const nodes = Array.from(colDiv.childNodes).filter(node => {
      if (node.nodeType === 1) return true; // element
      if (node.nodeType === 3 && node.textContent.trim()) return true; // non-empty text
      return false;
    });
    // If only one node, return it directly; otherwise return an array
    if (nodes.length === 1) return nodes[0];
    if (nodes.length > 1) return nodes;
    // If column is empty, return an empty string
    return '';
  });

  // Table header for the Columns block
  const tableRows = [
    ['Columns (columns16)'],
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
