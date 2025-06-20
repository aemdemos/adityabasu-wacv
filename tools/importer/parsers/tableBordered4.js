/* global WebImporter */
export default function parse(element, { document }) {
  // Collect tab titles from direct <li> children
  const liElements = Array.from(element.querySelectorAll(':scope > li'));
  // Each tab as its own cell (span or fallback text)
  const tabCells = liElements.map(li => {
    const span = li.querySelector('span');
    if (span) return span;
    const a = li.querySelector('a');
    if (a) return a;
    return document.createTextNode(li.textContent.trim());
  });
  // Compose table: header row is one cell, next row has as many cells as tabs
  const cells = [
    ['Table (bordered)'],
    tabCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
