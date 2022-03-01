/**
 * bots.js
 *
 * @description :: [bots] represents a set of structured data, called records. It usually correspond to a table/collection in a database, 
 *                 attributes correspond to columns/fields, and records correspond to rows/documents.
 *
 * @author      :: Zynobot
 * @help        :: See https://sailsjs.com/documentation/concepts/models-and-orm/models
 *
 * Created at   :: Wed Feb 23 2022 20:48:00 GMT-0500 (Eastern Standard Time)
 * Modified at  :: Wed Feb 23 2022 20:48:00 GMT-0500 (Eastern Standard Time)
 */

var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {
    tableName: 'bots',
    attributes: {




        name: { type: 'STRING', allowNull: true },

        description: { type: 'STRING', allowNull: true },

        bash_command: { type: 'STRING', allowNull: true },

        bot_file: { type: 'STRING', allowNull: true },

        git_repo_url: { type: 'STRING', allowNull: true },

        git_repo_username: { type: 'STRING', allowNull: true },

        git_repo_password: { type: 'STRING', allowNull: true },

        schedule_cron: { type: 'STRING', allowNull: true },

        tenant: { type: 'STRING', allowNull: true },

        published_at: { type: 'ref' },

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

