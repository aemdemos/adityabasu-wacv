/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches the example
  const headerRow = ['Columns (columns6)'];

  // Get all direct children columns (div.col)
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));

  let nameElem = null;
  let bioElem = null;
  let imageElem = null;

  // Find name, bio, image
  for (const col of colDivs) {
    const colInner = col.querySelector('.col-inner');
    if (!colInner) continue;
    const h3 = colInner.querySelector('h3');
    if (h3 && !nameElem) {
      nameElem = h3;
    }
    const p = colInner.querySelector('p');
    if (p && !bioElem) {
      bioElem = p;
    }
    // Use the first image found
    const img = colInner.querySelector('img');
    if (img && !imageElem) {
      imageElem = img;
    }
  }

  // Defensive: fallback if any are missing
  // If no name was found, try a strong in the first column
  if (!nameElem && colDivs[0]) {
    const strong = colDivs[0].querySelector('strong');
    if (strong) nameElem = strong;
  }

  // Compose left cell: heading, then bio
  const leftCell = [];
  if (nameElem) leftCell.push(nameElem);
  if (bioElem) leftCell.push(bioElem);
  // If nothing found, fallback to empty string
  const leftCellFinal = leftCell.length > 0 ? leftCell : [''];

  // Compose cells (2 columns: left is name+bio, right is image)
  const contentRow = [leftCellFinal, imageElem || ''];

  // Build final table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the table
  element.replaceWith(table);
}
