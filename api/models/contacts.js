/**
 * contacts.js
 *
 * @description :: [contacts] represents a set of structured data, called records. It usually correspond to a table/collection in a database, 
 *                 attributes correspond to columns/fields, and records correspond to rows/documents.
 *
 * @author      :: Zynobot
 * @help        :: See https://sailsjs.com/documentation/concepts/models-and-orm/models
 *
 * Created at   :: Sat May 29 2021 09:46:26 GMT-0400 (Eastern Daylight Time)
 * Modified at  :: Sat May 29 2021 09:46:26 GMT-0400 (Eastern Daylight Time)
 */

var baseModel = require('./BaseModel'),
 _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'contacts',
    attributes: {
        
          first_name : { type: 'STRING'   ,allowNull: true },
        
          last_name : { type: 'STRING'   ,allowNull: true },
        
          primary_email : { type: 'STRING'   ,allowNull: true },
        
          mobile_numer : { type: 'STRING'   ,allowNull: true },
        
          location : { type: 'STRING'   ,allowNull: true },
        
          social_id : { type: 'STRING'   ,allowNull: true },
        
          social_type : { type: 'STRING'   ,allowNull: true },
        
          role_type : { type: 'STRING'   ,allowNull: true },
        
          published_at : { type: 'ref'  },
        
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

