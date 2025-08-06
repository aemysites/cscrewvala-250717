/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: matches exactly the example
  const headerRow = ['Hero (hero6)'];

  // 2nd row: background image (or blank if not found)
  // 1st grid-child is the image wrapper
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > div.w-layout-grid > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 3rd row: content (heading, subheading, CTAs)
  // Get the card inside the .w-layout-grid
  let contentArr = [];
  const card = element.querySelector('.card');
  if (card) {
    // Heading: first h1-h6
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentArr.push(heading);
    // Subheading: typically p.subheading, else next p
    let subheading = card.querySelector('p.subheading');
    if (!subheading) {
      // Fallback: first p not inside a button group
      const allPs = card.querySelectorAll('p');
      for (const p of allPs) {
        if (!p.closest('.button-group')) {
          subheading = p;
          break;
        }
      }
    }
    if (subheading) contentArr.push(subheading);
    // CTAs: all links inside .button-group
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup && btnGroup.children.length > 0) {
      contentArr.push(btnGroup);
    }
  }

  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentArr.length ? contentArr : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
