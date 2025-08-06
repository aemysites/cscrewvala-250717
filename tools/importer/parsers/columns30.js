/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the grid's direct children (columns in the layout)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 4) return;

  // First column: the left-aligned text ("Taylor Brooks")
  const col1 = gridChildren[0];
  // Second column: the tags (list of .tag)
  const col2 = gridChildren[1];
  // Third column: the heading (h2)
  const heading = gridChildren[2];
  // Fourth column: the paragraphs (rich text)
  const description = gridChildren[3];

  // Combine heading and description into one column, preserving semantic elements
  const col3 = document.createElement('div');
  if (heading) col3.appendChild(heading);
  if (description) col3.appendChild(description);

  // Build the table manually to ensure the header row has a single cell
  // that spans all data columns with colspan
  const table = document.createElement('table');
  // Header row
  const trHead = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns30)';
  th.setAttribute('colspan', '3'); // Ensure header spans all columns
  trHead.appendChild(th);
  table.appendChild(trHead);
  // Data row
  const trData = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.appendChild(col1);
  const td2 = document.createElement('td');
  td2.appendChild(col2);
  const td3 = document.createElement('td');
  td3.appendChild(col3);
  trData.appendChild(td1);
  trData.appendChild(td2);
  trData.appendChild(td3);
  table.appendChild(trData);
  // Replace the old element
  element.replaceWith(table);
}
