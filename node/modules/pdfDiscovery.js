const fs = require('fs');
const path = require('path');

//where the pdfs are stored
const pdfDirectory = path.join(__dirname, '../pdfs');

//search directory for pdf files to populate list
function discoverPDFs() {
    const files = fs.readdirSync(pdfDirectory);
    const pdfs = files.filter(f => f.endsWith('.pdf'));

    return pdfs.map(filename => ({
        filename,
        fullPath: path.join(pdfDirectory, filename)
    }));
}

module.exports = { discoverPDFs };
