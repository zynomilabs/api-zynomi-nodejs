// api/services/ViewRenderingService.js
var fs = require("fs");
var fsextra = require('fs-extra');
module.exports = {
  /**
   * Send a customized welcome email to the specified email address.
   *
   * @required {String} emailAddress
   *   The email address of the recipient.
   * @required {String} firstName
   *   The first name of the recipient.
   */
  //-----------------------------------------------
  // NOTES
  // Inorder to make this work we need to disable layout in config/view.js
  // otherwise it expects layout.ejs in the respective folder
  // REFERENCES
  //http://stackoverflow.com/questions/24187206/how-to-render-a-view-into-a-string-in-sailsjs
  //https://github.com/balderdashy/sails/issues/2459
  render: function (options) {
    sails.hooks.views.render(
      options.template,
      options.data,
      function (err, view) {
        if (err) {
          throw err;
        } else {
          //sails.log.debug("view =>" + view);
          fsextra.outputFile(options.savetofolder, view, function (err) {
            if (err) throw err;
          });
          return view;
        }
      }
    );
  },
  scaffold: function (options) {
    try {
      sails.log.info("Inside code generation");
      for (i = 0; i < options.template.length; i++) {
        //sails.log("options.template[i]=" + options.template[i])
        sails.hooks.views.render(
          options.template[i],
          options.data,
          function (err, view) {
            if (err) {
              throw err;
            } else {
              var EntityName = sails._s.capitalize(options.data.table);
              var fileName = (options.template[i].split("/").pop() + '.vue').replace("Entity",EntityName)
              fsextra.outputFile(options.savetofolder  + EntityName.toLowerCase() + "/" + fileName, view, function (err) {
                if (err) throw err;
              });
              return view;
            }
          }
        );
      }
    } catch (e) {
      sails.log.error(e);
    }
  },
};
