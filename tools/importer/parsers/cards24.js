/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards24)'];

  // Find all direct card anchors
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map((card) => {
    // First cell: the image
    let image = null;
    const imageDiv = card.querySelector(':scope > div');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) image = img;
    }

    // Second cell: text content
    // Compose: infoBar (tag + date) + h3 heading
    const textContent = [];
    const infoBar = card.querySelector('.flex-horizontal');
    if (infoBar) {
      textContent.push(infoBar);
    }
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      textContent.push(heading);
    }

    // If both are missing, use empty string to avoid empty cell
    const cell2 = textContent.length ? textContent : '';
    return [image || '', cell2];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
