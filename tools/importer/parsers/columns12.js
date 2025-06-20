/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row containing columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get immediate child columns
  const columns = Array.from(row.querySelectorAll(':scope > .col'));
  if (columns.length === 0) return;

  // For each column, extract the .col-inner content if present
  const colContents = columns.map(col => {
    const colInner = col.querySelector(':scope > .col-inner') || col;
    return colInner;
  });

  // Ensure the header row has as many cells as the content row: first cell is the block name, rest are blank
  const headerRow = ['Columns (columns12)'];
  for (let i = 1; i < colContents.length; i++) {
    headerRow.push('');
  }

  const cells = [headerRow, colContents];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(block);
}
