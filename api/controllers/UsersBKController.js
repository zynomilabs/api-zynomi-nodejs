/**
 * Controller
 *
 * @description :: Server-side logic for managing Template
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const S3Service = require("../services/S3Service");

module.exports = {

    Authenticate:function (req, res) {
        var response = {};
        
        
        try {
            
            MenuService.Authenticate( req, res ).then( function ( resp )
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
            
            MenuService.AuthenticateToken( req, res ).then( function ( resp )
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

