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