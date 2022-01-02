/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');
module.exports = {
    signIn:function (req, res) {
        var response = {};
        try {
            var authenticateRequest = {};		
            authenticateRequest.email = {};
            authenticateRequest.email.like = req.body.email;
             
            sails.models.users.find(authenticateRequest).exec(function (err, result) {
                var userInfo = result[0];
                if (err) {
                   return res.send(response);
		        }
                else {
                    if (result.length == 0) {
                        response.Success = false;
                        response.Message = sails.config.message.Account.Invalid_Credentials;
                        return res.send(response);
                    }
                    else {
                        var userInfo = result[0];
                        var passwordMatched = bcrypt.compareSync(req.body.hashed_password, userInfo.hashed_password);
                        if (passwordMatched) {
                            //Removing Password Property
                            delete userInfo.hashed_password;
                            response.Success = true;
                            response.Message = sails.config.message.Account.Authentication_Success;
                            response.ViewModel = userInfo;
                            //Generating JWT Token
                            response.JWT = AccountService.issueJwtToken(userInfo);
                        }
                        else {
                            response.Success = false;
                            response.Message = sails.config.message.Account.Invalid_Credentials;
                            
                        }  
                        return res.send(response);
                    }
                }
            })
        } catch (e) {
            response.Success = false;
		    response.Message = e.message;
			return res.send(response); 
        }

    }
};


