/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all direct children (each card or image block)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  cardDivs.forEach(card => {
    // Try to get the image in the card
    const image = card.querySelector('img');
    // Try to get the text content block
    let textContent = '';
    const contentContainer = card.querySelector('.utility-padding-all-2rem');
    if (contentContainer) {
      // Use the container as-is (h3 + p)
      textContent = contentContainer;
    }
    // Only add rows that have an image (mandatory for this block)
    if (image) {
      rows.push([image, textContent]);
    }
  });

  // Create and insert table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
