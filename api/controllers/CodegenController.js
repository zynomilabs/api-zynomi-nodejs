module.exports = {
    //-----------------------------------------------
    //
    // POST http://localhost:1337/codegen/columndef?id=master&generatecode=true&inheritbase=true
    //------------------------------------------------
    columndef: function (req, res) {
        //console.log("hello")   

        //Build configuration parameter object (Start)
        var params = {};
        params.table = !sails._.isUndefined(req.param('table_name')) ? req.param('table_name') : '';
        params.inheritbase = sails._s.toBoolean(!sails._.isUndefined(req.query.inheritbase) && req.query.inheritbase);
        params.crud = sails._s.toBoolean(!sails._.isUndefined(req.query.crud) && req.query.crud);
        params.generatecode = sails._s.toBoolean(!sails._.isUndefined(req.query.generatecode) && req.query.generatecode);
        params.m_folder = !sails._.isUndefined(req.param('m_folder')) ? req.param('m_folder') : '.code';
        params.c_folder = !sails._.isUndefined(req.param('c_folder')) ? req.param('c_folder') : '.code';
        params.v_folder = !sails._.isUndefined(req.param('v_folder')) ? req.param('v_folder') : '.code';
        params.code_author = !sails._.isUndefined(req.param('code_author')) ? req.param('code_author') : 'Zynobot';
         //Build configuration parameter object (End)

        sails.hooks.views.render(sails.config.codegen.queryColumndefTemplate, params, function (err, view) {
            //sails.log.info(view);
            if (err) {
                res.send(err);
            } else {
                //sails.log(view)   
                sails.getDatastore().sendNativeQuery(view, function (err, results) {
                    if (err) {
                        res.send(err);
                    } else {
                        //Bring this from custom config.
                        var excludes = [];
                        if (params.inheritbase) {
                            excludes = sails.config.codegen.baseFields;
                        }

                        var newmap = [];
                        sails._.each(results.rows, function (o) {
                            //sails.log("sails._.contains(excludes, o.column_name) = " + sails._.contains(excludes, o.column_name))
                            if (!sails._.contains(excludes, o.column_name)) {
                                o.original_data_type = o.data_type;
                                sails.log(o.column_name + " to be entered into the newmap")
                                if (sails._s.include(sails.config.codegen.stringTypesInPostgreSql, o.data_type)) {
                                    o.data_type = sails.config.codegen.stringTypesInSails;
                                }
                                if (sails._s.include(sails.config.codegen.numericTypesInPostgreSql, o.data_type)) {
                                    o.data_type = sails.config.codegen.numericTypesInSails;
                                }
                                if (sails._s.include(sails.config.codegen.jsonTypesInPostgreSql, o.data_type)) {
                                    o.data_type = sails.config.codegen.jsonTypesInSails;
                                }
                                if (sails._s.include(sails.config.codegen.dateTypesInPostgreSql, o.data_type)) {
                                    o.data_type = sails.config.codegen.dateTypesInSails;
                                    //o.data_type = sails.config.codegen.dateTypesInSails + ', defaultsTo: function () { return sails.moment().format(); }';
                                }
                                if (sails._s.include(sails.config.codegen.uuidTypesInPostgreSql, o.data_type)) {
                                    o.data_type = sails.config.codegen.uuidTypesInSails;
                                }
                                newmap.push(o);
                                //sails.log(" o.column_name = " +  o.column_name)
                            }
                           
                        });
                        params.column_names = newmap;

                        //Generate Model & controller code                    
                        if (params.generatecode) {
                            var modelOptions = {};
                            var controllerOptions = {};
                            modelOptions.template = sails.config.codegen.modelCodeTemplate;
                            modelOptions.savetofolder = params.m_folder + "/api/models/" + params.table + ".js";
                            modelOptions.data = params;
                            controllerOptions.template = sails.config.codegen.controllerCodeTemplate;
                            controllerOptions.data = params;
                            controllerOptions.savetofolder = params.c_folder + "/api/controllers/" + sails._s.capitalize(params.table) + "Controller.js";
                            try {
                                ViewRenderingService.render(modelOptions);
                                ViewRenderingService.render(controllerOptions);
                            } catch (err) {
                                res.send(err);
                            }

                            //Generate vue.js crud page codes
                            if (params.crud) {
                                var crudOptions = {};
                                crudOptions.template = sails.config.codegen.crudCodeTemplates;
                                //sails.log.info(JSON.stringify(sails.config.codegen.crudCodeTemplates))
                                crudOptions.savetofolder = params.v_folder + "/views/";
                                crudOptions.data = params;
                                crudOptions.data.table = sails._s.capitalize(crudOptions.data.table)
                                //sails.log.info(JSON.stringify(crudOptions))
                                try {
                                    ViewRenderingService.scaffold(crudOptions);
                                } catch (err) {
                                    res.send(err);
                                }
                            }
                        }
                        res.send(params);
                    }
                })
            }
        });
    },
    //-----------------------------------------------
    //
    //------------------------------------------------
    tabledef: function (req, res) {
        sails.hooks.views.render(sails.config.codegen.queryTabledefTemplate, {}, function (err, view) {
            if (err) {
                res.send(err);
            } else {
                sails.log.debug(sails.config.codegen.queryTabledefTemplate);
                sails.getDatastore().sendNativeQuery(view, function (err, results) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(results.rows);
                    }
                })
            }
        });
    },
    //-----------------------------------------------
    //
    //------------------------------------------------
    viewdef: function (req, res) {
        sails.hooks.views.render(sails.config.codegen.queryViewdefTemplate, {}, function (err, view) {
            if (err) {
                res.send(err);
            } else {
                sails.log.debug(sails.config.codegen.queryViewdefTemplate);
                sails.getDatastore().sendNativeQuery(view, function (err, results) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(results.rows);
                    }
                })
            }
        });
    }
};

