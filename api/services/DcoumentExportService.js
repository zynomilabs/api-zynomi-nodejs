//var libre = require('libreoffice-convert');
var libre = {}; //dummy
const fs = require('fs');
const path = require('path');
const { setMaxListeners } = require('process');

module.exports = {
    ConvertDocToPdf : async function(fileDoc,filePdf) {
        try {
            const root = path.dirname(path.resolve(process.cwd(), 'app.js'));
            sails.log("root = " + root);
            const inputPath =root + '/' + fileDoc;
            const outputPath = root + '/' + filePdf;
            //let docData = fs.readFileSync(inputPath);
            sails.log(inputPath);
            const file = fs.readFileSync(inputPath);
            libre.convert(file, '.pdf', undefined, (err, done) => {
                if (err) {
                  console.log(`Error converting file: ${err}`);
                }
                
                // Here in done you have pdf file which you can save or transfer in another stream
                fs.writeFileSync(outputPath, done);
            });
        } catch (err) {
            console.log("Error in input reading", err);
        }
    }
};