/**
 * payments.js
 *
 * @description :: [payments] represents a set of structured data, called records. It usually correspond to a table/collection in a database, 
 *                 attributes correspond to columns/fields, and records correspond to rows/documents.
 *
 * @author      :: Zynobot
 * @help        :: See https://sailsjs.com/documentation/concepts/models-and-orm/models
 *
 * Created at   :: Sun Feb 27 2022 16:44:20 GMT-0500 (Eastern Standard Time)
 * Modified at  :: Sun Feb 27 2022 16:44:20 GMT-0500 (Eastern Standard Time)
 */

var baseModel = require('./BaseModel'),
    _ = require('lodash');

module.exports = _.merge({}, baseModel, {
    tableName: 'payments',
    attributes: {
        invoice_nuber: { type: 'STRING', allowNull: true },
        payment_to_user: { type: 'STRING', allowNull: true },
        payment_date: { type: 'ref' },
        payment_type: { type: 'STRING', allowNull: true },
        description: { type: 'STRING', allowNull: true },
        credit_debit: { type: 'STRING', allowNull: true },
        payment_amount: { type: 'STRING', allowNull: true },
        payment_currency: { type: 'STRING', allowNull: true },
        currency_exchange_rate: { type: 'STRING', allowNull: true },
        payment_status: { type: 'STRING', allowNull: true },
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

