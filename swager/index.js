module.exports = function (app) {
    const express = require('express');
    const swagger = require("swagger-node-express");
    const subpath = express();
    const applicationUrl = 'https://' + 'localhost';

    app.use("/v1", subpath);
    swagger.setAppHandler(subpath);
    app.use(express.static('dist'));

    subpath.get('/', function (req, res) {
        res.sendfile(__dirname + '/dist/index.html');
    });
    swagger.configureSwaggerPaths('', 'api-docs', '');
    swagger.configure(applicationUrl, '1.0.0');
}
