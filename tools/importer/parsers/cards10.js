/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header as in the example
  const cells = [['Cards (cards10)']];

  // 2. Find all card links (immediate children)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // LEFT CELL: Image (mandatory)
    let imageEl = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }

    // RIGHT CELL: Tag (optional), Heading (h3), Description (p)
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textWrapper) {
      // Tag (optional), style as span.tag (reference original if possible)
      const tag = textWrapper.querySelector('.tag-group .tag');
      if (tag) textContent.push(tag);
      // Heading (h3 or h4)
      let heading = textWrapper.querySelector('h3, h4');
      if (heading) textContent.push(heading);
      // Description (p)
      let desc = textWrapper.querySelector('p');
      if (desc) textContent.push(desc);
    }

    cells.push([
      imageEl,
      textContent
    ]);
  });

  // 3. Create Table & Replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}