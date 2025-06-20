/* global WebImporter */
export default function parse(element, { document }) {
  // The Columns (columns13) block has a header row and one content row matching the example block structure
  // Find the timer inside the element (it may be missing, so handle that edge case)
  const headerRow = ['Columns (columns13)'];
  let timer = element.querySelector('.ux-timer');
  // Fallback for missing timer element
  if (!timer) {
    // If not found, create an empty div to avoid table cell being empty
    timer = document.createElement('div');
  }
  // The table has just one column (1 cell in 2nd row, with the timer as its content)
  const cells = [
    headerRow,
    [timer]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
