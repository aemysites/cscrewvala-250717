/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards21)'];

  // Find the card body (this contains heading, img, and possible description)
  let cardBody = element.querySelector('.card-body') || element;

  // Get the image element for the card
  const img = cardBody.querySelector('img');

  // Find the heading inside the card (h4-heading class or any heading tag)
  let heading = cardBody.querySelector('.h4-heading') || cardBody.querySelector('h1, h2, h3, h4, h5, h6');

  // Collect all text/content after the heading (as description)
  const textCell = [];
  if (heading) {
    textCell.push(heading);
    let sibling = heading.nextSibling;
    while (sibling) {
      // For element nodes or text nodes with non-empty content
      if (sibling.nodeType === 1) {
        textCell.push(document.createElement('br'));
        textCell.push(sibling);
      } else if (
        sibling.nodeType === 3 && sibling.textContent.trim() !== ''
      ) {
        textCell.push(document.createElement('br'));
        textCell.push(document.createTextNode(sibling.textContent.trim()));
      }
      sibling = sibling.nextSibling;
    }
  } else {
    // Fallback: all text content
    if (cardBody.textContent && cardBody.textContent.trim()) {
      textCell.push(cardBody.textContent.trim());
    } else {
      textCell.push('');
    }
  }

  // Compose the row for this card
  const row = [img, textCell];
  // Compose the table: header row followed by one content row
  const cells = [headerRow, row];
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
