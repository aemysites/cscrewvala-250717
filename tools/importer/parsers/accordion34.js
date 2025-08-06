/* global WebImporter */
export default function parse(element, { document }) {
  // Construct the block header as specified
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Select all direct children accordions
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  accordionItems.forEach((acc) => {
    // Title: find the closest .w-dropdown-toggle > .paragraph-lg
    let titleEl = null;
    const toggle = acc.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer .paragraph-lg, but fallback to toggle if not found
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Content: find .accordion-content (or .w-dropdown-list), then descend to .rich-text if it exists
    let contentEl = null;
    const content = acc.querySelector('.accordion-content') || acc.querySelector('.w-dropdown-list');
    if (content) {
      // The visible content is inside a .utility-padding-all-1rem or .rich-text
      let rich = content.querySelector('.rich-text');
      if (rich) {
        contentEl = rich;
      } else {
        // fallback to the first .utility-padding-all-1rem inside content
        let pad = content.querySelector('.utility-padding-all-1rem');
        if (pad) {
          contentEl = pad;
        } else {
          // fallback to the content directly
          contentEl = content;
        }
      }
    }
    // Only add row if both title and content are found
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Create the table using the helper, referencing the original elements
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
