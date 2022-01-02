/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

//module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

//};
var rc;
const { v4: uuidv4 } = require('uuid');
rc = require('rc');
module.exports.bootstrap = function(cb) {
    sails.dotenv = require('dotenv').config();
    sails.uuid = uuidv4;
    sails.moment = require('moment');
    sails._ = require("underscore");
    sails._s = require("underscore.string");
    console.log("Parsing dotenv inside bootstrap")
    console.log(sails.dotenv.parsed)
    console.log("Parsed dotenv inside bootstrap")
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  // Try to get `rc` dependency
  try {
    rc = require('sails/node_modules/rc');
  } catch (e1) {
    
    rc = function () { return {}; };
  }
  cb();
};
