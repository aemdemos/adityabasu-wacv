/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches block name exactly
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];
  // Find all direct .col children
  const colDivs = element.querySelectorAll(':scope > div');
  colDivs.forEach((col) => {
    const inner = col.querySelector('.col-inner');
    if (!inner) return; // skip if malformed
    // Find the image (mandatory)
    const img = inner.querySelector('img');
    // Find the card text (mandatory)
    const textBlock = inner.querySelector('div.text');
    if (!img || !textBlock) return;
    // For text cell, retain all block children and preserve their structure
    const textCell = Array.from(textBlock.childNodes).filter(node => {
      // Remove empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    rows.push([img, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
