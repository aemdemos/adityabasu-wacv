/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child columns
  const cols = Array.from(element.querySelectorAll(':scope > div.col'));

  // Gather the actual column content (skip empty columns)
  const contentCols = cols.map(col => {
    // Use .col-inner if present for text and images
    const inner = col.querySelector('.col-inner');
    const contentBlock = inner || col;
    // Only include if has text or images
    const hasText = contentBlock.textContent && contentBlock.textContent.trim() !== '';
    const hasImg = contentBlock.querySelector('img');
    if (hasText || hasImg) {
      return contentBlock;
    }
    return null;
  }).filter(Boolean);

  // Defensive: if nothing found, fall back to all .col-inner or .col
  const columns = contentCols.length ? contentCols : cols.map(col => col.querySelector('.col-inner') || col);

  // Compose the table cells
  const cells = [];
  // Header row -- exactly as the example, one cell
  cells.push(['Columns (columns5)']);
  // Content row -- as many cells as columns
  cells.push(columns);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
