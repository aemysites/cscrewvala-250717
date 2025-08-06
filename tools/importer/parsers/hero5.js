/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as specified
  const headerRow = ['Hero (hero5)'];

  // Find the immediate .w-layout-grid in the section
  const topGrid = element.querySelector(':scope > .w-layout-grid');
  if (!topGrid) return;

  // Get immediate children of the grid
  const gridChildren = Array.from(topGrid.children);

  // Find the IMG element (background image)
  const img = gridChildren.find(el => el.tagName === 'IMG');

  // 2nd row: background image (optional)
  const imageRow = [img || ''];

  // Find the main content container (the nested grid or section)
  let contentDiv = gridChildren.find(el =>
    el.classList.contains('w-layout-grid')
  );

  // If the nested grid has only one child and that is the .section, use it
  if (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.classList.contains('section')) {
    contentDiv = contentDiv.firstElementChild;
  }

  // Fallback: If not found, try to find a .section directly among gridChildren
  if (!contentDiv) {
    contentDiv = gridChildren.find(el => el.classList.contains('section'));
  }

  // Compose content cell: heading, paragraphs, CTAs (all present in contentDiv)
  const contentRowElements = [];
  if (contentDiv) {
    // All headings (in order)
    const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentRowElements.push(h));
    // Paragraphs, rich text
    contentDiv.querySelectorAll('div.rich-text, div.w-richtext, p').forEach(el => {
      // Avoid duplicate paragraphs if inside a .rich-text container
      if (el.tagName === 'P' && el.closest('.rich-text, .w-richtext')) return;
      contentRowElements.push(el);
    });
    // Button group (CTAs)
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) contentRowElements.push(buttonGroup);
  }
  const contentRow = [contentRowElements.length ? contentRowElements : ['']];

  // Compose the block table as per spec
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
