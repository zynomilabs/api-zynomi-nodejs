//api/models/master.js
var baseModel = require('./BaseModel'),
 _ = require('lodash');
var bCrypt = require('bcrypt');
const saltRounds = sails.config.settings.Security.SaltRounds;
module.exports = _.merge({}, baseModel, {	
    tableName: 'master',
    schema: true,
    attributes: {
        
          parent_code : { type: 'STRING',allowNull: true  },
        
          name : { type: 'STRING' },
        
          description : { type: 'STRING', allowNull: true  },
        
          mark_as_delete : { type: 'boolean' },
        
          published_at : { type: 'ref' },
        
    },
    // Lifecycle Callbacks
    beforeCreate: function (values, cb) {
        sails.log(values.description);
        values.code = sails.uuid();
        values.created_at = sails.moment().format();
        values.updated_at = sails.moment().format();
        values.update_count = 1;
        //var salt = bCrypt.genSaltSync(saltRounds);
        //values.description = bCrypt.hashSync(values.description, salt);
        if (values.hasOwnProperty('code')) {
            /* ignore */
        } else {
            values.code = sails.uuid.uuid();
        }
        return cb();
    },
    beforeUpdate: function (values, cb) {
        sails.log(values.description);
        values.updated_at = sails.moment().format();
        values.update_count = values.update_count + 1;
        values.created_by = 0;
        values.updated_by = 0;
        /*if (!values.hasOwnProperty('created_by')) {
            values.created_by = 0;
        } 
        if (!values.hasOwnProperty('updated_by')) {
            values.updated_by = 0;
        } */
        return cb();
    }
});

