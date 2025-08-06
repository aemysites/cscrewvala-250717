/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Find all direct <a> children as cards
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // Image: first direct child <img> of the <a>
    const img = card.querySelector('img');

    // Text content: direct child <div> of the <a>, not containing the img
    // By structure, text div is after the img, but sometimes there may be only one div
    let textDiv = null;
    // Get all direct children
    const children = Array.from(card.children);
    // Find the first <div> that is not an ancestor of the <img>
    for (const c of children) {
      if (c.tagName === 'DIV' && (!img || !c.contains(img))) {
        textDiv = c;
        break;
      }
    }
    // Fallback: if none found, grab first <div>
    if (!textDiv) {
      textDiv = card.querySelector('div');
    }
    // Defensive: if still not found, create an empty div
    if (!textDiv) {
      textDiv = document.createElement('div');
    }
    // Table row: [image, text content]
    rows.push([img, textDiv]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
