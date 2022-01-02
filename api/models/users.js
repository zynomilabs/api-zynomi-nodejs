//api/models/users.js
var baseModel = require('./BaseModel'),
 _ = require('lodash');

var bCrypt = require('bcrypt');
const saltRounds = sails.config.settings.Security.SaltRounds;

module.exports = _.merge({}, baseModel, {	
    tableName: 'users',
    attributes: {
        
          login : { type: 'STRING' },
        
          hashed_password : { type: 'STRING' },
        
          firstname : { type: 'STRING' },
        
          lastname : { type: 'STRING' },
        
          email : { type: 'STRING' },
        
          admin : { type: 'boolean' },
        
          last_login_on : { type: 'ref' },
        
          language : { type: 'STRING' },
        
          auth_source_id : { type: 'integer' },
        
          salt : { type: 'STRING' },
        
          must_change_password : { type: 'boolean' },
        
          passwd_changed_on : { type: 'ref' },
        
          mark_as_delete : { type: 'boolean' },
        
          published_at : { type: 'ref' },
        
    },
    // Lifecycle Callbacks
    beforeCreate: function (values, cb) {
        values.code = sails.uuid();
        values.created_at = sails.moment().format();
        values.updated_at = sails.moment().format();
        values.update_count = 1;
        if (values.hasOwnProperty('code')) {
            /* ignore */
        } else {
            values.code = sails.uuid.uuid();
        }
        var salt = bCrypt.genSaltSync(saltRounds);
        values.salt =  salt;
        values.hashed_password = bCrypt.hashSync(values.hashed_password, salt);
        return cb();
    }
});

