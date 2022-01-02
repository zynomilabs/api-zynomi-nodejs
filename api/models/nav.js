/**
 * nav.js
 *
 * @description :: [nav] represents a set of structured data, called records. It usually correspond to a table/collection in a database, 
 *                 attributes correspond to columns/fields, and records correspond to rows/documents.
 *
 * @author      :: Zynobot
 * @help        :: See https://sailsjs.com/documentation/concepts/models-and-orm/models
 *
 * Created at   :: Sun May 16 2021 13:33:02 GMT-0400 (Eastern Daylight Time)
 * Modified at  :: Sun May 16 2021 13:33:02 GMT-0400 (Eastern Daylight Time)
 */

var baseModel = require('./BaseModel'),
 _ = require('lodash');

module.exports = _.merge({}, baseModel, {	
    tableName: 'nav',
    attributes: {
        
          parent_code : { type: 'STRING'   ,allowNull: true },
        
          name : { type: 'STRING'   ,allowNull: true },
        
          description : { type: 'STRING'   ,allowNull: true },
        
          icon : { type: 'STRING'   ,allowNull: true },
        
          link : { type: 'STRING'   ,allowNull: true },
        
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

