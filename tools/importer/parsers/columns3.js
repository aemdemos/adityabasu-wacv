/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs
  const cols = Array.from(element.querySelectorAll(':scope > div.col'));
  if (cols.length < 3) return;

  // First column: Name heading
  let nameContent = null;
  const firstColInner = cols[0].querySelector('.col-inner');
  if (firstColInner) {
    // Prefer first heading (h3/h2/h1), else all content
    const heading = firstColInner.querySelector('h1, h2, h3, h4, h5, h6');
    nameContent = heading ? heading : firstColInner;
  }

  // Second column: Image
  let imageContent = null;
  const secondColInner = cols[1].querySelector('.col-inner');
  if (secondColInner) {
    const img = secondColInner.querySelector('img');
    if (img) imageContent = img;
  }

  // Third column: Description paragraph(s)
  let descContent = null;
  const thirdColInner = cols[2].querySelector('.col-inner');
  if (thirdColInner) {
    // Use all child nodes so as not to miss formatting
    const children = Array.from(thirdColInner.childNodes).filter(n => {
      // Exclude whitespace-only text nodes
      return n.nodeType !== 3 || n.textContent.trim().length > 0;
    });
    if (children.length === 1) {
      descContent = children[0];
    } else if (children.length > 1) {
      descContent = children;
    } else {
      descContent = thirdColInner;
    }
  }

  // Compose the columns row (all three columns)
  const cells = [
    ['Columns (columns3)'],
    [nameContent, imageContent, descContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
