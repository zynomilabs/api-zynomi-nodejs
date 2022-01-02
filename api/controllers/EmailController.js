/**
 * Controller
 *
 * @description :: Server-side logic for managing Template
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var emailprovider = sails.config.settings.App.EmailProvider;
var emailService = require('../services/' + emailprovider + 'EmailService.js');
module.exports = {

    sendEmail:function (req, res) {

       
        var response = {};
        try {
            var request = {};
            
            var emailTemplateViewModel = {};

            //Input validation
            
            var emailViewModel = {
                from: req.body.from,
                to: req.body.to,
                subject: req.body.subject
            };
            if(sails._s.toBoolean(!sails._.isUndefined(req.body.html) && req.body.html))
            {
                emailViewModel.html = req.body.body
            }else{
                emailViewModel.text = req.body.body
            }

            sails.log.debug(JSON.stringify(emailViewModel));
            emailService.sendEmail(emailViewModel);
            response.Success = true;
            response.Message = "Email has been sent successfully";
        } catch (e) {
            response.Success = false;
            response.Exception = e.message;
            response.Message = "Failed to send the email";
            response.Data=[];
        } finally{
            return res.send(response);  
        }
    },
    sendForgotPassword:function (req, res) {

        var response = {};
       
        try {
            var request = {};
            
            var emailTemplateViewModel = {};
            emailTemplateViewModel.fullname = req.body.user.fullname;
            emailTemplateViewModel.email = req.body.user.email;
            emailTemplateViewModel.password = req.body.user.password;
           
            //Rendering email template
            sails.hooks.views.render(sails.config.settings.Email.TemplateUrl_ForgotPassword, emailTemplateViewModel, function (err, view) {
                if (err) {
                    console.log('err = ' + err)
                    return res.send(err);
                } 
                else {
                    sails.log.debug(JSON.stringify(view));
                    //Send Email to the user's registered email id
                    var emailViewModel = {
                        from: req.body.from,
                        to: req.body.to,
                        subject: req.body.subject
                    };
                    if(sails._s.toBoolean(!sails._.isUndefined(req.body.html) && req.body.html))
                    {
                        emailViewModel.html = view
                    }else{
                        emailViewModel.text = view
                    }
                    //Calling Email Service Method to send email
                    emailService.sendEmail(emailViewModel);
                    response.Success = true;
                    response.Message = sails.config.message.Account.Password.SentToEmail;
                    return res.send(response);   
                }
            }); 

        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    },
    sendEmailGeneric:function (req, res) {

        var response = {};
       
        try {
            var template = req.body.template;
            var payload = req.body.payload
           
            
            sails.hooks.views.render(template, payload, function (err, view) {
                if (err) {
                    console.log('err = ' + err)
                    return res.send(err);
                } 
                else {
                    sails.log.debug("Binding data into template");
                    sails.log.debug(JSON.stringify(view));
                    sails.log.debug("Bound data into template");
                
                    var emailMessage = {};
                    emailMessage = req.body.emailMessage
                   
                    if(sails._s.toBoolean(!sails._.isUndefined(req.body.html) && req.body.html))
                    {
                        emailMessage.html = view
                    }else{
                        emailMessage.text = view
                    }
                    sails.log.debug(emailMessage);
                    emailService.sendEmail(emailMessage);
                    response.Success = true;
                    response.Message = "Email has been sent successfully";
                }}); 

        } catch (e) {
            response.Success = false;
            response.Exception = e.message;
            response.Message = "Failed to send the email";
        }
        finally{
            return res.send(response);  
        }

    },
    renderContent:function (req,res) {   
        var response = {};
        try {
            var template = req.body.template;
            var payload = req.body.payload
            //Rendering email template
            sails.hooks.views.render(template, payload, function (err, view) {
                if (err) {
                    console.log('err = ' + err)
                    return res.send(err);
                } 
                else {
                    sails.log.debug("Binding data into template");
                    sails.log.debug(JSON.stringify(view));
                    sails.log.debug("Bound data into template");
                    response.Success = true;
                    response.Data = view;
                }
            }); 

        } catch (e) {
            response.Success = false;
            response.Exception = e.message;
            response.Message = "Unable to bind template with data";
        }finally{
            return res.send(response);  
        }

    }
};

