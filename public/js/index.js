const PDFDocument = require("pdfkit");
const blobStream = require("blob-stream")

const doc = new PDFDocument;

const stream = doc.pipe(blobStream());

doc.end();

stream.on("finish"), () => {
    const blob = stream.toBlob()
}