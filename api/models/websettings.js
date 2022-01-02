//api/models/websettings.js
var baseModel = require('./BaseModel'),
 _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'websettings',
    attributes: {
        
          parent_code : { type: 'STRING' },
        
          name : { type: 'STRING' },
        
          description : { type: 'STRING' },
        
          mark_as_delete : { type: 'boolean' },
        
          published_at : { type: 'ref' },
        
    },
    // Lifecycle Callbacks
    beforeCreate: function (values, cb) {
        values.code = sails.uuid();
        values.created_at = sails.moment().format();
        values.updated_at = sails.moment().format();
        values.update_count = 1;
        if (!values.hasOwnProperty('code')) {
            values.code = sails.uuid.uuid();
        }
        return cb();
    },
    beforeUpdate: function (values, cb) {
        values.updated_at = sails.moment().format();
        values.update_count = values.update_count + 1;
        return cb();
    }
});

