/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the rows for the hero35 block table
  // Row 1: Header row
  const cells = [['Hero (hero35)']];

  // Row 2: Background image row (none in this HTML, so empty cell)
  cells.push(['']);

  // Row 3: Content cell: headline, subheading, call-to-action (CTA)
  // Locate grid children (should be two: 1st div = text, 2nd a = button)
  let headline, subheading, cta;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const children = Array.from(grid.children);
    // find content div (with headline/subheading) and CTA link
    for (const child of children) {
      if (!headline && child.querySelector('h1, h2, h3, h4, h5, h6')) {
        headline = child.querySelector('h1, h2, h3, h4, h5, h6');
      }
      if (!subheading && child.querySelector('p, .subheading')) {
        subheading = child.querySelector('p, .subheading');
      }
      if (child.tagName === 'A' && !cta) {
        cta = child;
      }
    }
  }
  // Compose content cell
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  cells.push([contentCell]);

  // Create and swap in the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
