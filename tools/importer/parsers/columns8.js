/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get .col-inner or fallback to col
  function getColContent(col) {
    const inner = col.querySelector('.col-inner');
    return inner || col;
  }

  // Find all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div.col'));
  
  // Check if the first column is a heading (e.g., "BRONZE") and not an image/logo
  let hasTitle = false;
  let titleContent = null;
  if (columns.length > 0) {
    const firstColInner = columns[0].querySelector('.col-inner');
    if (firstColInner) {
      // Look for heading in first col-inner
      const heading = firstColInner.querySelector('h1, h2, h3, h4, h5, h6, b, strong');
      // We'll accept even bold for the title
      if (heading && heading.textContent.trim()) {
        hasTitle = true;
        titleContent = heading;
      }
    }
  }

  // Prepare the content cells
  let contentCells = [];
  if (hasTitle) {
    // First cell: the title, subsequent cells: logos/links
    contentCells = [titleContent];
    // For the rest of the columns, get their content
    for (let i = 1; i < columns.length; i += 1) {
      contentCells.push(getColContent(columns[i]));
    }
  } else {
    // No title, just use all columns as is
    contentCells = columns.map(getColContent);
  }

  // Table header matches EXACTLY 'Columns (columns8)'
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns8)'],
    contentCells,
  ], document);

  element.replaceWith(table);
}
