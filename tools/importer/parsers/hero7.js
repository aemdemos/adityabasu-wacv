/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the background image (if any)
  let bgImg = null;
  const bannerBgImg = element.querySelector('.banner-bg img');
  if (bannerBgImg) {
    bgImg = bannerBgImg;
  }

  // 2. Gather all hero text content (heading, subheading, paragraph, logos)
  const textElements = [];
  const textCol = element.querySelector('#col-679976754 .col-inner');
  if (textCol) {
    // Heading & subheading
    const textDiv = textCol.querySelector('.text');
    if (textDiv) textElements.push(textDiv);
    // Main paragraph
    const mainPara = textCol.querySelector('p');
    if (mainPara) textElements.push(mainPara);
    // Logos row, if present
    const logosRow = textCol.querySelector('#row-1608777108');
    if (logosRow) textElements.push(logosRow);
  }

  // Ensure every row is present as in the example (header, image, text)
  const cells = [
    ['Hero'],
    [bgImg ? bgImg : ''],
    [textElements.length > 0 ? textElements : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
