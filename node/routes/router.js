const express = require('express');
const router = express.Router();
const path = require('path');

//import modules for pdf discovery and validation
const { discoverPDFs } = require('../modules/pdfDiscovery');
const { validatePDF } = require('../modules/pdfValidation');
const metadata = require('../data/metadata.json');

//home
router.get("/", (req, res) => {
    res.render("index");
});

//pdf list
router.get("/pdfs", (req, res) => {
    const pdfList = discoverPDFs().map(pdf => {
        return {
            //file information with metadata
            filename: pdf.filename,
            title: metadata[pdf.filename]?.title || pdf.filename,
            description: metadata[pdf.filename]?.description || "No description available"
        };
    });
    //render pdf list page
    res.render("pdfs", { pdfList });
});

//serve pdf file
router.get("/pdfs/:filename", (req, res) => {
    const { filename } = req.params;
    //validate pdf existence
    if (!validatePDF(filename)) {
        return res.status(404).send("PDF not found");
    }

    //send pdf file
    const filePath = path.join(__dirname, "../pdfs", filename);
    res.sendFile(filePath);
});

//404 handler
router.use((req, res) => {
    res.status(404).send("Page not found");
});

module.exports = router;
