/* global WebImporter */
export default function parse(element, { document }) {
  // Compose table header as specified
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];
  // Each .w-tab-pane represents a tabbed card group
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    // Find grid layout in each tab
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each direct child <a> is a card
    Array.from(grid.children).forEach((card) => {
      if (card.tagName !== 'A') return;
      // Try to find an image as first cell (img element only, never as link)
      let imageCell = '';
      const imgWrap = card.querySelector('.utility-aspect-3x2');
      if (imgWrap) {
        const img = imgWrap.querySelector('img');
        if (img) imageCell = img;
      }
      // Compose text cell: title (h3/h4) and description (div.paragraph-sm)
      // There may be a nested div wrapping the text, but we want just the block elements
      let titleEl = card.querySelector('h3, .h4-heading');
      let descEl = card.querySelector('.paragraph-sm');
      // If both missing, fallback to textContent
      const textCell = document.createElement('div');
      if (titleEl) textCell.appendChild(titleEl);
      if (descEl) textCell.appendChild(descEl);
      if (!titleEl && !descEl) {
        textCell.textContent = card.textContent.trim();
      }
      // Add row with [imageCell, textCell]
      cells.push([imageCell, textCell]);
    });
  });
  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
