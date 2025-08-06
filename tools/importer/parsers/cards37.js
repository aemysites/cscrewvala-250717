/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get the first image descendant from a card
  function getImage(card) {
    return card.querySelector('img') || '';
  }

  // Helper: assemble text content from a card into a container
  function getTextContent(card) {
    const container = document.createElement('div');
    // Try to preserve heading and paragraph order
    // Heading: choose h2, h3, or h4 in order of appearance
    const heading = card.querySelector('h2, h3, h4, h5, h6');
    if (heading) container.appendChild(heading);
    // All paragraphs
    card.querySelectorAll('p').forEach((p) => container.appendChild(p));
    // Any CTA: .button (Webflow), button, or last <a> (if present, not image links)
    // Only add if it's not already included (e.g., not just a wrapping link)
    // Also: don't add the <a> if it's the card wrapper
    // Prefer direct descendant with .button or button
    let cta = card.querySelector(':scope > .button, :scope > button, :scope > a.button');
    if (!cta) {
      // fallback: a direct <a> child that's not just a wrapping link
      const directLinks = Array.from(card.children).filter(
        el => el.tagName === 'A' && !el.classList.contains('utility-link-content-block')
      );
      if (directLinks.length) cta = directLinks[0];
    }
    if (cta) container.appendChild(cta);
    return container.childNodes.length ? container : '';
  }

  // Cards are utility-link-content-block (possibly nested in a grid)
  // Top layout: .grid-layout direct children
  // Some children themselves are .grid-layout (nested grid)
  // Gather all .utility-link-content-block (recursively)
  function collectCards(parent) {
    let cards = [];
    parent.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        if (node.classList.contains('utility-link-content-block')) {
          cards.push(node);
        } else if (node.classList.contains('grid-layout')) {
          cards = cards.concat(collectCards(node));
        }
      }
    });
    return cards;
  }

  // Find the first .grid-layout inside the section
  const cardsGrid = element.querySelector('.grid-layout');
  if (!cardsGrid) return; // no cards present
  const cards = collectCards(cardsGrid);

  // Build the rows: header then one row per card (image, text)
  const rows = [['Cards (cards37)']];
  cards.forEach(card => {
    const img = getImage(card);
    const text = getTextContent(card);
    rows.push([img, text]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
