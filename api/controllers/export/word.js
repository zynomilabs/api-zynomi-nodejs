
//var pdfDocService = require('../../services/DcoumentExportService');
var fsextra = require('fs-extra');
module.exports = {
  
  friendlyName: 'Word',

  description: 'For a given docx template and data, generates word files and sends it back as byte stream ',


  inputs: {
    template:{
      type: 'string',
      required: true
    },
    data:{
      type: 'json'
    },
    filename:{
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'Word file has been generated successfully',
      responseType: 'ok'
    }
  },

  fn: async function (inputs,exits) {
    sails.log(inputs)
    const createReport = require('docx-templates').default;
    const fs = require('fs')
    sails.log(sails.config.settings.templates.word.path + inputs.template)
    const template = fs.readFileSync(sails.config.settings.templates.word.path + inputs.template);
    const buffer = await createReport({
    template,
    data: inputs.data,
    });
    //create report & store it in temp folder
    //fs.writeFileSync('.code/senthil_invoice.docx', buffer)
    sails.log(sails.config.settings.data.temp.path + inputs.filename)
    //fs.writeFileSync(sails.config.settings.data.temp.path + inputs.filename, buffer)
    fsextra.outputFile(sails.config.settings.data.temp.path + inputs.filename, buffer, function (err) {
      if (err) throw err;
    });

    //Convert to pdf
    //pdfDocService.ConvertDocToPdf('.code/2.docx','.code/senthil_invoice.pdf');

    //Send the reponse to client
    this.res.attachment(inputs.filename);
    const { Readable } = require('stream');
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream.pipe(this.res);
  }

};
