/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (the columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: filter out any non-element or empty columns
  const contentRow = columnDivs.filter(div => div && div.childNodes.length > 0).map(div => div);
  const numColumns = contentRow.length || 1;

  // Header row: single cell, but padded with empty string cells so total length === numColumns
  // This makes the header row span all columns semantically (colspan handled by WebImporter)
  const headerRow = ['Columns (columns29)', ...Array(numColumns - 1).fill('')];

  const cells = [
    headerRow,
    contentRow.length ? contentRow : ['']
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
