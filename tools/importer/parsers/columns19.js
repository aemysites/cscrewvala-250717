/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the header row exactly as specified
  const headerRow = ['Columns (columns19)'];

  // Arrange the 8 columns into 2 rows of 4 columns each
  const columnsPerRow = 4;
  const contentRows = [];
  for (let i = 0; i < columns.length; i += columnsPerRow) {
    const rowColumns = columns.slice(i, i + columnsPerRow).map(col => {
      const items = [];
      // Extract SVG icon (if present)
      const iconDiv = col.querySelector('.icon');
      if (iconDiv && iconDiv.firstElementChild) {
        items.push(iconDiv.firstElementChild);
      }
      // Extract text paragraph (if present)
      const p = col.querySelector('p');
      if (p) items.push(p);
      return items.length === 1 ? items[0] : items;
    });
    contentRows.push(rowColumns);
  }

  // Assemble the table: header row + each row of 4 columns
  const cells = [headerRow, ...contentRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
