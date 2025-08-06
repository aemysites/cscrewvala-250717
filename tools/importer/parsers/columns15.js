/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid for the main hero section
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  const cols = Array.from(grid.children);
  // Each cell should gather all meaningful content, preserving text and structure
  const rowCells = cols.map(col => {
    // Gather all child nodes: headings, paragraphs, buttons, images, etc.
    const content = [];
    col.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Wrap stray text in a <p> for structure and to not lose content
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        content.push(p);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        content.push(node);
      }
    });
    // If the column is only text via textContent (no child nodes), include it
    if (content.length === 0 && col.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = col.textContent.trim();
      content.push(p);
    }
    // If still empty (should not happen), include the original column as fallback
    if (content.length === 0) return col;
    // If single element, return just that, else array
    return content.length === 1 ? content[0] : content;
  });

  // The header row must match the example: exactly one cell with the block name
  const headerRow = ['Columns (columns15)'];

  // The cells array: headerRow (single cell), content row (N columns)
  const cells = [
    headerRow,
    rowCells
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure the header cell spans all columns in the second row
  const th = table.querySelector('th');
  if (th && rowCells.length > 1) {
    th.setAttribute('colspan', rowCells.length);
  }
  element.replaceWith(table);
}
