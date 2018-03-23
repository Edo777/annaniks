const {BannerRouter} = require("./routers/banner");
const {ServiceRouter} = require("./routers/service");
const {PortfolioRouter} = require("./routers/portfolio");
const {TagsRouter} = require('./routers/tags');
const {PlatformRouter} = require('./routers/platform');
const {EmailRouter} = require("./routers/email");
const {ServDesRouter} = require("./routers/service-description");
const {StaffRouter} = require('./routers/staff')


const path = require('path');
const express = require('express');
const expressOasGenerator = require('express-oas-generator');

class API {
    initApp(app){
        //configs
        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
        
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
        
            // Pass to next layer of middleware
            next();
        });


        app.use("/static",express.static(path.join(__dirname,'routers','static','imgs')));
        app.use("/banner",      BannerRouter);
        app.use("/service",    ServiceRouter);
        app.use("/portfolio",PortfolioRouter);
        app.use("/tags",          TagsRouter);
        app.use("/platform",  PlatformRouter);
        app.use("/email",        EmailRouter);
        app.use("/servicedescription", ServDesRouter);
        app.use("/staff",StaffRouter)
        expressOasGenerator.init(app, {});     
    }
}

module.exports = new API();