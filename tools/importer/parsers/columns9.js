/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, get the .col-inner (if present), else the column itself
  const columnContents = columns.map(col => {
    const inner = col.querySelector('.col-inner') || col;
    return inner;
  });

  // Compose the table: header row is a single cell, then a content row with all columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns9)'],
    columnContents
  ], document);

  element.replaceWith(table);
}
