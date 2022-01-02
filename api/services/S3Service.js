//AWS S3 Document Service - Starts
var AWS = require('aws-sdk');
require('process');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const awsS3 = new AWS.S3({
  "accessKeyId": sails.config.settings.aws_s3.AWSS3_ID,
  "secretAccessKey": sails.config.settings.aws_s3.AWSS3_SECRET,
  "region": sails.config.settings.aws_s3.AWSS3_REGION,
});



var response = {};

module.exports = {
    //Function to upload any file to s3 bucket
    uploadFile : function (req, res) {
        
        return new Promise(function (resolve, reject) {
            var response = {};
             var bucket = bucketName(req)
             sails.log.info("req.body.bucket = " + bucket)
            try {
                req.file('files').upload({
                     // Required
                    adapter: require('skipper-s3'),
                    key: sails.config.settings.aws_s3.AWSS3_ID,
                    secret: sails.config.settings.aws_s3.AWSS3_SECRET,
                    bucket:  bucket,
                    saveAs: function (__newFileStream, next) { 
                        //sails.log.info(__newFileStream);
                        return next(undefined, __newFileStream.filename); 
                        
                    },
                }, function (err, uploadedFiles) {
                    if (err) return res.serverError(err);
                    response.Success = true;
                    response.Message = sails.config.message.Document.Upload_Success;
                    response.Data={
                        files: uploadedFiles,
                        textParams: req.allParams()
                      };

                    return res.ok(response);
                  });
            } catch (e) {
                sails.log.info(e);
                errorResponseHandler(res, e);
            }
        });
             
    },
    //Function to get file url of any object inside s3 bucket
    downloadFileUrl : function (req, res) {
        return new Promise(function (resolve, reject) {
            var response = {};
             var bucket = bucketName(req)
             sails.log.info("req.body.bucket = " + bucket)
            try {

                //https://www.tipsandtricks-hq.com/forum/topic/strange-problems-with-amazon-s3
                //Step 1: Fetch the object url from bucket
                
                var signedUrlExpireSeconds = sails.config.settings.aws_s3.AWSS3_signedUrlExpireSeconds;  // Expire time for file download
               
                response.Success = false;
               
                var params = {
                    Key: req.body.source_path + req.body.FileName,
                    Bucket: bucket,
                    Expires: signedUrlExpireSeconds,
                };
            
                //Step 2 : Delete the file form s3 bucket as a background process
                awsS3.getSignedUrl('getObject',params, function (err, data) {
                    if (err) {
                        errorResponseHandler(res, err);
                    }
                    else {
                       response.Success = true;
                       response.Message = sails.config.message.Document.Reterived_Success;
                       response.Data={
                        FileUrl: data,
                        textParams: req.allParams()
                       };
                        
                    }       
                    resolve(response);        
                });


            } catch (e) {
                 errorResponseHandler(res, e);
            }
        });
             
    },
    //Function to delete any object from s3 bucket
    deleteFile : function (req, res) {
        return new Promise(function (resolve, reject) {
            var response = {};
            var bucket = bucketName(req)
            sails.log.info("req.body.bucket = " + bucket)
            try {

                //Step 1: Delete record from document table
                //DocumentService().delete(req.params.id, res);  
                
                response.Success = false;
                //var bucket = bucketName(req);
                var params = {
                    Key: req.body.source_path +  req.body.FileName,
                    Bucket: bucket,
                };
            
                //Step 2 : Delete the file form s3 bucket as a background process
                awsS3.deleteObject(params, function (err, data) {
                    if (err) {
                        errorResponseHandler(res, err);
                    }
                    else {
                        //Step 2: Save document reference to document table
                        //DocumentService().save(req.MetaData, res); 
                       response.Success = true;
                       response.Message = sails.config.message.Document.Delete_Success;
                       response.Data={
                        files: data,
                        textParams: req.allParams()
                       };
                        
                    }       
                    resolve(response);        
                });


            } catch (e) {
                 errorResponseHandler(res, e);
            }
        });
             
    },
     //Function to update meta data of any object inside s3 bucket
    updateFile  : function (req, res) {
        return new Promise(function (resolve, reject) {
            var response = {};
            try {

                //Step 1 : Fetch the exixting object  
                response.Success = false;
                
                var bucketFrom = req.body.BucketFrom;
              
                if (bucketFrom == ' ' || bucketFrom == undefined) 
                    bucketFrom = sails.config.settings.aws_s3.AWSS3_BUCKET_NAME
                
                var params = {
                    Key: req.body.source_path + req.body.FileName,
                    Bucket: bucketFrom 
                };
               
                ///Step 1 : Fetch the exixting object meta data
                awsS3.headObject(params, function (err, data) {
                  
                    if (err) {
                        errorResponseHandler(res, err);
                    }
                    else {
                        
                        // //Step 2: Copy the existing file into s3 bucket 
                        var copySource = req.body.source_path + req.body.FileName;
                    
                        var bucketTo = req.body.BucketTo;
                        
                        if ( bucketTo == ' ' || bucketTo == undefined)
                           bucketTo = sails.config.settings.aws_s3.AWSS3_BUCKET_NAME

                        var params1 = {
                            Bucket: bucketTo,
                            CopySource: bucketFrom + '/' + copySource,
                            Key: req.body.destination_path  + req.body.FileName,
                        };

                        //Copying object
                        awsS3.copyObject(params1, function (err, data) {
                            response = {};
                            if (err) {
                                errorResponseHandler(res, err);
                            }
                            else {
                                //Step 3 : Update the document table
                                //DocumentService().update(req.params.id, metaData, res);

                                //Step 4: Delete old file as a background process
                                awsS3.deleteObject({ 
                                    Bucket: bucketFrom, 
                                    Key: copySource 
                                   }, function (err, data) {
                                    if (err) {
                                        errorResponseHandler(res, err);
                                    }
                                    else {
                                        // sails.log.info("Document updated =>" + JSON.stringify(data));
                                        response.Success = true;
                                        response.Message = sails.config.message.Document.Update_Success;
                                    }
                                    resolve(response);   
                                });
                            }
                        });
                       
                    }       
                         
                });


            } catch (e) {
                 errorResponseHandler(res, e);
            }
        });
             
    }
        
};

function errorResponseHandler(res, err) {
    response = {};
    response.Success = false;
    response.Message = err;
    sails.log.error(JSON.stringify(err));
    return res.send(response);
};

function bucketName(req){
  return  (!sails._s.isBlank(req.param("bucket"))) ? req.param("bucket") : sails.config.settings.aws_s3.AWSS3_BUCKET_NAME;
}

//AWS S3 Document Service - Ends