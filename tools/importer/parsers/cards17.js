/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards17)'];
  // Get all cards: direct children div.utility-aspect-1x1 each containing an image
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = Array.from(cardDivs).map(div => {
    // Each card: first cell = image, second cell = empty string (no text content in provided HTML)
    const img = div.querySelector('img');
    return [img, ''];
  });
  // Compose the block table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
