/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero28)'];

  // Locate the .w-layout-grid which contains the hero layout
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = '';
  let content = '';

  if (grid) {
    const children = Array.from(grid.children);
    // 1st child: should contain the image
    if (children.length > 0) {
      const img = children[0].querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
    // 2nd child: should contain the content (usually inside a container)
    if (children.length > 1) {
      // Look for the first container div with margin-bottom, or just the first div inside
      let contentDiv = children[1].querySelector('.utility-margin-bottom-6rem');
      if (!contentDiv) {
        // fallback: just grab the first div
        const fallbackDiv = children[1].querySelector('div');
        if (fallbackDiv) {
          contentDiv = fallbackDiv;
        } else {
          contentDiv = children[1]; // fallback to the child itself if nothing else
        }
      }
      if (contentDiv) {
        content = contentDiv;
      }
    }
  }

  const cells = [
    headerRow,
    [bgImg || ''],
    [content || ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
