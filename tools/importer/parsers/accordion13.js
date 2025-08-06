/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Accordion block
  const headerRow = ['Accordion (accordion13)'];

  // Each accordion item is a direct .divider child
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  
  // Each divider should have a .w-layout-grid child containing two divs: the title and the content
  const rows = dividers.map(divider => {
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return null;
    // Only immediate children of grid
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length < 2) return null;
    const title = gridChildren[0];
    const content = gridChildren[1];
    // Reference the actual elements, don't clone or create new
    return [title, content];
  }).filter(Boolean);

  // Prepend header row
  const tableCells = [headerRow, ...rows];
  
  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(table);
}
