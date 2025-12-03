const fs = require('fs');
const path = require('path');
//where the pdfs are stored
const pdfDir = path.join(__dirname, '../pdfs');

//validate that a given pdf exists in the pdf directory
function validatePDF(filename) {
    const fullPath = path.join(pdfDir, filename);
    return fs.existsSync(fullPath);
}

module.exports = { validatePDF };
