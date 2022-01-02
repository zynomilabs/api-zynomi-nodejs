//api/models/address.js
var baseModel = require('./BaseModel'),
 _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'address',
    attributes: {
        
          addressline1 : { type: 'STRING' },
        
          addressline2 : { type: 'STRING' },
        
          city : { type: 'STRING' },
        
          state : { type: 'STRING' },
        
          country : { type: 'integer' },
        
          postalcode : { type: 'STRING' },
        
          latitude : { type: 'number' },
        
          longitude : { type: 'number' },
        
          radius : { type: 'number' },
        
          primary_address : { type: 'boolean' },
        
          address_type : { type: 'integer' },
        
          entity_type : { type: 'integer' },
        
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
        return cb();
    }
});

