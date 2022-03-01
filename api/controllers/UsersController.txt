/**
 * usersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const AuthenticateService = require("../services/AuthenticateService");
var bcrypt = require('bcrypt');
module.exports = {

    Authenticate:function (req, res) {
        var response = {};
        
        
        try {
            
            AuthenticateService.Authenticate( req, res ).then( function ( resp )
            {
                response.Data=resp;
                return res.send(response);
            });


        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    },
    AuthenticateToken:function (req, res) {
        var response = {};
        
        
        try {
            
            AuthenticateService.AuthenticateToken( req, res ).then( function ( resp )
            {
                response.Data=resp;
                return res.send(response);
            });


        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    }
};


