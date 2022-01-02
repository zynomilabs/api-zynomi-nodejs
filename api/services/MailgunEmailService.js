﻿var mailgun = require('mailgun-js')(
    {
        apiKey: sails.config.settings.Mailgun.API_Key,
        domain: sails.config.settings.Mailgun.Domain
    }
);

module.exports = {
    sendEmail : function (request){
        mailgun.messages().send(request, function (error, body) {
            if (error)
                return new Error(error)
            else
            return body
        });
    }
};