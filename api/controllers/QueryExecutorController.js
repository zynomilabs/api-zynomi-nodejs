module.exports = {
    //-----------------------------------------------
    //
    // POST http://localhost:1337/codegen/columndef?id=master&generatecode=true&inheritbase=true
    //------------------------------------------------
    execute: function (req, res) {
        var qn = req.param('qn') //Query template name which has the raw or parameterized query in it.
        var sql = !sails._.isUndefined(req.param('sql')) ? req.param('sql') : '' //Query template name which has the raw or parameterized query in it.
        if (sql != '') {
            sails.log.debug(sql);
            sails.getDatastore().sendNativeQuery(sql, function (err, results) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(results.rows);
                }
            })

        } else {
            sails.hooks.views.render(sails.config.queries[qn], {}, function (err, view) {
                if (err) {
                    res.send(err);
                } else {
                    sails.log.debug(sails.config.queries[qn]);
                    sails.log.debug(view);
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

    }
};

