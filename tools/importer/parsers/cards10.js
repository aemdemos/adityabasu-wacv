/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all immediate child columns (cards)
  const columns = element.querySelectorAll(':scope > div');
  columns.forEach((col) => {
    const colInner = col.querySelector('.col-inner');
    if (!colInner) return;

    // Find the image for the card (first <img> in colInner)
    const img = colInner.querySelector('img');
    
    // Find the heading (first h3/h2/h4 in colInner)
    const heading = colInner.querySelector('h3, h2, h4, h5, h6');

    // Find the description (first <p> in colInner)
    let desc = colInner.querySelector('p');
    // If <p> contains just a <span>, use that instead, so the cell is not nested <p><span>text</span></p>
    if (desc && desc.childNodes.length === 1 && desc.firstElementChild && desc.firstElementChild.tagName === 'SPAN') {
      desc = desc.firstElementChild;
    }

    // Compose text cell: heading (bold), then description
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // If heading or desc is missing, still fill with available content (shouldn't happen for this block)
    // Compose row: [image, text cell]
    rows.push([
      img,
      textContent.length > 1 ? textContent : textContent[0] || ''
    ]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
