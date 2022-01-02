/**
 * Controller
 *
 * @description :: Server-side logic for managing Template
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const S3Service = require("../services/S3Service");

module.exports = {

    FileUpload:function (req, res) {
        var response = {};
        sails.log.info("Environment value" + sails.config.settings.aws_s3.AWSS3_ID)
        try {
           
            S3Service.uploadFile(req, res ).then( function ( resp )
            {
                response.Success = true;
                response.Message = sails.config.message.Document.Upload_Success;
                    
                sails.log.info(response);
                return res.send(response);
            });


        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    },
    DownloadFileUrl: function (req, res) {
        var response = {};
        
        try {
            //FileUploadService.FileUpload( req, res ).then( function ( resp )
            S3Service.downloadFileUrl(req, res ).then( function ( resp )
            {
                return res.send(resp);
            });

        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    },
    DeleteFile: function (req, res) {
        var response = {};
        
        try {
           
            //FileUploadService.FileUpload( req, res ).then( function ( resp )
            S3Service.deleteFile(req, res ).then( function ( resp )
            {
                return res.send(resp);
            });

        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    },
    MoveFile: function (req, res) {
        var response = {};
        
        
        try {
           
            //FileUploadService.FileUpload( req, res ).then( function ( resp )
            S3Service.updateFile(req, res ).then( function ( resp )
            {
                //response.Data=resp;
                return res.send(resp);
            });


        } catch (e) {
            response.Success = false;
            response.Message = e.message;
            response.Data=[];
            return res.send(response);
        }

    }
};

