/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  'post /authenticate': "UsersController.Authenticate",
  'post /authenticateToken': "UsersController.AuthenticateToken",
  'post /file/upload': "UploadController.FileUpload",
  //'get /file/upload':"UploadController.FileUpload",
  'post /file/delete': "UploadController.DeleteFile",
  'post /file/downloadlink/fileid': "UploadController.DownloadFileUrl",
  'post /file/move': "UploadController.MoveFile",
  'post /codegen/columndef': "CodegenController.columndef",
  'post /query/execute': "QueryExecutorController.execute",
  'get /site/navigation/menuitems': "NavigationController.menuitems",
  'post /email/send': "EmailController.sendEmail",
  'post /email/forgotpassword': "EmailController.sendForgotPassword",
  'post /email/send/generic': "EmailController.sendEmailGeneric",
  'post /template/bind': "EmailController.renderContent",
  'post /user/signin': "AccountController.signIn",
  'post /export/word': { controller: 'export', action: 'word' },
};
