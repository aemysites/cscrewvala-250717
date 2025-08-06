/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one cell, even if the next row has more columns
  const headerRow = ['Columns (columns11)'];

  // Find the two main columns in the main grid
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainCols = mainGrid.querySelectorAll(':scope > div');
  if (mainCols.length < 2) return;
  const textCol = mainCols[0];
  const infoCol = mainCols[1];

  // LEFT COLUMN: All text, author, button
  const leftColContent = [];
  // Eyebrow
  const eyebrow = textCol.querySelector('.eyebrow');
  if (eyebrow) leftColContent.push(eyebrow);
  // Heading
  const heading = textCol.querySelector('h1');
  if (heading) leftColContent.push(heading);
  // Description
  const desc = infoCol.querySelector('.rich-text p');
  if (desc) leftColContent.push(desc);
  // Author block
  const authorRow = infoCol.querySelector('.w-layout-grid:not(.tablet-1-column) .flex-horizontal.y-center');
  if (authorRow) leftColContent.push(authorRow);
  // Read more button
  const readMore = infoCol.querySelector('a.button');
  if (readMore) leftColContent.push(readMore);

  // RIGHT COLUMN: Two images
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  const rightImages = [];
  if (imagesGrid) {
    const imgs = imagesGrid.querySelectorAll('img');
    imgs.forEach(img => rightImages.push(img));
  }

  // Compose rows: header (one cell), then content row (one array per column)
  const cells = [
    headerRow,
    [leftColContent, rightImages]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
