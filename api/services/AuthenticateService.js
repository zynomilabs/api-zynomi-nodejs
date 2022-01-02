//NPI service for calling NPI apis

var moment = require('moment');


const winston = require('winston');
var serialize = require('node-serialize');
/*see the documentation for Winston:  https://github.com/flatiron/winston */
var logger = winston.createLogger({
  transports: [
    new (winston.transports.File)({
      filename: 'logfile.log',
      level: 'info',
      json: true,
      colorize: false
    })
  ]
});

module.exports = {

    //Added to handle the signin functionality in the sails API for menu app
    Authenticate: function (req, res) {
        //return promise
        logger.log({level: 'info', message: "Start time: "+moment().format('YYYY-MM-DD HH:mm:ss')}); 
        let allreqobj={};
        
        allreqobj.username = req.body.username;
        allreqobj.params = serialize.serialize(req.params);  
        allreqobj.query = serialize.serialize(req.query);
        allreqobj.body = serialize.serialize(req.body);
        logger.log({level: 'info', message: allreqobj}); 
       
        return new Promise(function (resolve, reject) {
            var response = {

            };
            try {

                response.Success = false;
                
                if(req.body.username != undefined && req.body.password != undefined)
                {
                     response.JWT = AccountService.issueJwtToken(allreqobj);
                     response.Success = true;
                }
                resolve(response);


            } catch (e) {
                // return exception
                let allerrmsg={};
                allerrmsg.Errmessage=e.message;
                allerrmsg.stack=e.stack;
                logger.log({level: 'info', message: allerrmsg}); 
                logger.log({level: 'info', message: "End time: "+moment().format('YYYY-MM-DD HH:mm:ss')});
            }
        });
        
    },
    AuthenticateToken: function (req, res) {
        //return promise
        logger.log({level: 'info', message: "Start time: "+moment().format('YYYY-MM-DD HH:mm:ss')}); 
        let allreqobj={};
       
        allreqobj.authHeader =req.headers.authorization;
        allreqobj.username = req.body.username;
        
        logger.log({level: 'info', message: allreqobj}); 
       
        return new Promise(function (resolve, reject) {
            var response = {

            };
            try {

                response.Success = false;
                
                if(req.body.username != undefined && req.body.password != undefined)
                {
                     response = AccountService.validateJwtToken(allreqobj);
                     
                }
                resolve(response);


            } catch (e) {
                // return exception
                let allerrmsg={};
                allerrmsg.Errmessage=e.message;
                allerrmsg.stack=e.stack;
                logger.log({level: 'info', message: allerrmsg}); 
                logger.log({level: 'info', message: "End time: "+moment().format('YYYY-MM-DD HH:mm:ss')});
            }
        });
        
    },
    
    };




    