/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid
  const gridChildren = Array.from(grid.children);

  // There are three main regions: left text (DIV), contact list (UL), right image (IMG)
  // Sometimes the order may vary, but typically it's DIV, UL, IMG
  // Let's extract by tag, but keep order as left column: (DIV + UL), right column: IMG
  let textDiv = null;
  let contactsList = null;
  let image = null;

  gridChildren.forEach(child => {
    if (!textDiv && child.tagName === 'DIV') {
      textDiv = child;
    } else if (!contactsList && child.tagName === 'UL') {
      contactsList = child;
    } else if (!image && child.tagName === 'IMG') {
      image = child;
    }
  });

  // Prepare header row
  const headerRow = ['Columns (columns18)'];

  // Prepare content row
  // The left column combines the textDiv and contactsList if present
  const leftCol = [];
  if (textDiv) leftCol.push(textDiv);
  if (contactsList) leftCol.push(contactsList);

  const rightCol = image ? image : '';

  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element
  element.replaceWith(table);
}
