module.exports = {
    //-----------------------------------------------
    //
    // POST http://localhost:1337/generate/nuxt3/code?entity=applications
    //------------------------------------------------
    generate: function (req, res) {

        //Build configuration parameter object (Start)
        var params = {};
        params.table = !sails._.isUndefined(req.param('entity')) ? req.param('entity') : '';
        params.m_folder = !sails._.isUndefined(req.param('m_folder')) ? req.param('m_folder') : '.code';
        params.c_folder = !sails._.isUndefined(req.param('c_folder')) ? req.param('c_folder') : '.code';
        params.v_folder = !sails._.isUndefined(req.param('v_folder')) ? req.param('v_folder') : '.code';
        params.code_author = !sails._.isUndefined(req.param('code_author')) ? req.param('code_author') : 'Zynobot';
        //Build configuration parameter object (End)

        sails.hooks.views.render(sails.config.codegen.queryColumndefTemplate, params, function (err, view) {
            //sails.log.info(view);
            if (err) {
                sails.log(err)
                res.send(err);
            } else {
                sails.log(view)
                sails.getDatastore().sendNativeQuery(view, function (err, results) {
                    if (err) {
                        sails.log(err)
                        res.send(err);
                    } else {
                        //Bring this from custom config.
                        var excludes = [];
                        excludes = sails.config.codegen.baseFields;
                        var newmap = [];
                        sails._.each(results.rows, function (o) {
                            sails.log("sails._.contains(excludes, o.column_name) = " + sails._.contains(excludes, o.column_name))
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
                                sails.log(" o.column_name = " + o.column_name)
                            }

                        });
                        params.column_names = newmap;

                        var crudOptions = {};

                        //1) Generate nuxt3 frontend code
                        crudOptions.template = sails.config.codegen.nuxt_frontend_code_templates;
                        crudOptions.code_layer = 'frontend'
                        sails.log.info(JSON.stringify(sails.config.codegen.nuxt_frontend_code_templates))
                        crudOptions.savetofolder = params.v_folder + "/pages/";
                        crudOptions.data = params;
                        crudOptions.data.table = sails._s.capitalize(crudOptions.data.table)
                        sails.log.info(JSON.stringify(crudOptions))
                        try {
                            ViewRenderingService.scaffold(crudOptions);
                        } catch (err) {
                            sails.log(err)
                            res.send(err);
                        }

                        //2) Generate nuxt3 server code

                        crudOptions.template = sails.config.codegen.nuxt_server_code_templates;
                        crudOptions.code_layer = 'server'
                        crudOptions.savetofolder = params.v_folder + "/server/api";
                        crudOptions.data = params;
                        crudOptions.data.table = sails._s.capitalize(crudOptions.data.table)
                        try {
                            ViewRenderingService.scaffold(crudOptions);
                        } catch (err) {
                            sails.log(err)
                            res.send(err);
                        }

                        //3) Generate nuxt3 composable code

                        crudOptions.template = sails.config.codegen.nuxt_composable_code_templates;
                        crudOptions.code_layer = 'composable'
                        crudOptions.savetofolder = params.v_folder + "/composables";
                        crudOptions.data = params;
                        crudOptions.data.table = sails._s.capitalize(crudOptions.data.table)
                        try {
                            ViewRenderingService.scaffold(crudOptions);
                        } catch (err) {
                            sails.log(err)
                            res.send(err);
                        }


                        //4) Generate nuxt3 store code

                        crudOptions.template = sails.config.codegen.nuxt_store_code_templates;
                        crudOptions.code_layer = 'store'
                        crudOptions.savetofolder = params.v_folder + "/stores/";
                        crudOptions.data = params;
                        crudOptions.data.table = sails._s.capitalize(crudOptions.data.table)
                        try {
                            ViewRenderingService.scaffold(crudOptions);
                        } catch (err) {
                            sails.log(err)
                            res.send(err);
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

