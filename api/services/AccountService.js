var jwt = require('jsonwebtoken');
require('process');
require('dotenv').config();

module.exports = {
    //Function to Generate JWT Token
    issueJwtToken : function (request) {
        var jwtToken = {};
        var token = {};

        //Forming request object to generate jwt token
        jwtToken.user = request
        
        //Generating token
        token.bearer_token = jwt.sign(jwtToken, sails.config.settings.Authentication.ACCESS_TOKEN_SECRET,{ 
                                        algorithm: sails.config.settings.Authentication.ALGORITHM,
                                        expiresIn: sails.config.settings.Authentication.EXPIRESIN
                                        });
        
        return token;
    },

   
    validateJwtToken: function (request) {
        var token = {};
         
        if (request.authHeader == undefined){
               token.Status = sails.config.settings.Authentication.Header_NotFound
               token.Success = false;
               return token;
        }

        if (request.authHeader != '')
        {
           const auth = request.authHeader.split(' ')[1];

           jwt.verify(auth, sails.config.settings.Authentication.ACCESS_TOKEN_SECRET,
             { algorithm: sails.config.settings.Authentication.ALGORITHM
             },
          function (err, decoded) {
            
            if (err) {
                token.Status = sails.config.message.Account.Un_Authorized_Access;
                token.Success = false;
                return token;
            }
             token.Status = sails.config.message.Account.Authentication_Success
             token.Success = true;
             return token;
           
           });
        } else 
        {
            token.Status = sails.config.settings.Authentication.Bearer_NotFound
            token.Success = true;
            return token
        
        }
        return token;

    },

    // refreshJwtToken: function (request) {

    // }
};