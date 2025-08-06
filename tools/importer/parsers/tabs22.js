/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab menu and tab links
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  // Find the tab content container and tab panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // The correct structure is:
  // [ ['Tabs'], [label1, content1], [label2, content2], ... ]
  // So the header row is a single cell, all data rows are 2 cells

  // Header row - single cell with block name
  const headerRow = ['Tabs'];
  const rows = [];

  for (let i = 0; i < tabLinks.length; i++) {
    // Get label text from tab link
    let label = '';
    const labelDiv = tabLinks[i].querySelector('.paragraph-lg');
    if (labelDiv && labelDiv.textContent.trim()) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }
    // Tab content: reference the main block in the tab pane
    let content = '';
    if (tabPanes[i]) {
      // Find the first div child
      const mainDiv = tabPanes[i].querySelector('div');
      if (mainDiv) {
        content = mainDiv;
      } else {
        content = tabPanes[i];
      }
    }
    rows.push([label, content]);
  }

  // Construct the cells array: header row (1 col), then each data row (2 cols)
  const cells = [headerRow, ...rows];

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
