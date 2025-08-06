/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns at root level)
  const gridChildren = Array.from(grid.children);

  // Depending on the markup, the grid may contain 3 children (1 big left, 2 stacked right, 1 long right)
  // Let's identify them by their structure

  // 1. The main left feature block (large image, tags, title, desc, link)
  // 2. The vertical stack of two blocks (each with img/tag/h3/p)
  // 3. The vertical stack of many text blocks (each with h3/p, separated by .divider)

  // For robustness, we'll try to identify them by their content structure

  // Helper to check if a node contains an image
  function hasImg(node) {
    return node.querySelector && node.querySelector('img');
  }
  // Helper to count how many a.utility-link-content-block children
  function countContentLinks(node) {
    if (!node) return 0;
    return node.querySelectorAll(':scope > a.utility-link-content-block').length;
  }
  // Identify the columns
  let leftCol = null, rightUpperCol = null, rightLowerCol = null;
  for (const node of gridChildren) {
    const aCount = countContentLinks(node);
    if (hasImg(node) && aCount === 0) {
      leftCol = node; // main feature
    } else if (aCount > 1 && hasImg(node)) {
      rightUpperCol = node; // 2 stacked content blocks with images
    } else if (aCount > 1 && !hasImg(node)) {
      rightLowerCol = node; // stack of text blocks with no images
    }
  }
  // Fallback: if leftCol not found, pick first; assign the rest
  if (!leftCol) leftCol = gridChildren[0];
  if (!rightUpperCol) rightUpperCol = gridChildren[1];
  if (!rightLowerCol) rightLowerCol = gridChildren[2];

  // Table header: must match the block name and variant
  const headerRow = ['Columns (columns2)'];

  // --- LEFT COLUMN ---
  // Use the leftCol element (contains the main feature block)
  // --- RIGHT COLUMN ---
  // Wrap the 2 blocks from rightUpperCol and the stack from rightLowerCol
  const rightColWrapper = document.createElement('div');

  // Add the two stacked blocks from rightUpperCol
  Array.from(rightUpperCol.querySelectorAll(':scope > a.utility-link-content-block')).forEach((el) => {
    rightColWrapper.appendChild(el);
  });

  // Add the many text blocks from rightLowerCol, including dividers
  const rightLowerChildren = Array.from(rightLowerCol.childNodes);
  rightLowerChildren.forEach((el) => {
    // Only add a.utility-link-content-block or .divider elements
    if (
      (el.nodeType === 1 && el.matches('a.utility-link-content-block')) ||
      (el.nodeType === 1 && el.matches('.divider'))
    ) {
      rightColWrapper.appendChild(el);
    }
  });

  // Compose the rows for the table
  const cells = [
    headerRow,
    [leftCol, rightColWrapper],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
