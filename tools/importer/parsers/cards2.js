/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name
  const headerRow = ['Cards (cards2)'];

  // Find the three main columns in the .row
  const columns = element.querySelectorAll(':scope > div');

  // Defensive check
  if (!columns || columns.length < 3) {
    return;
  }

  // Second column: image
  let imageCell = null;
  const imageCol = columns[1];
  if (imageCol) {
    const img = imageCol.querySelector('img');
    if (img) imageCell = img;
  }

  // Third column: text content (bio + talk)
  let textCell = null;
  const textCol = columns[2];
  if (textCol) {
    // Grab all children of .col-inner inside this column
    const inner = textCol.querySelector('.col-inner');
    if (inner) {
      // Only keep element nodes and meaningful text nodes
      const nodes = Array.from(inner.childNodes).filter(node => {
        // Elements or non-empty text
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
      textCell = nodes;
    }
  }

  // If there's no image or no text, don't proceed
  if (!imageCell || !textCell || textCell.length === 0) {
    return;
  }

  // Compose table rows: header, then the single card row
  const rows = [headerRow, [imageCell, textCell]];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
