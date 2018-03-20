const {BannerRouter} = require("./routers/banner");
const {ServiceRouter} = require("./routers/service");
const {PortfolioRouter} = require("./routers/portfolio");
const {TagsRouter} = require('./routers/tags');
const {PlatformRouter} = require('./routers/platform');
const {EmailRouter} = require("./routers/email");

const path = require('path');
const express = require('express');

class API {
    initApp(app){
        
        app.use("/static",express.static(path.join(__dirname,'routers','static','imgs')));
        app.use("/banner",      BannerRouter);
        app.use("/service",    ServiceRouter);
        app.use("/portfolio",PortfolioRouter);
        app.use("/tags",          TagsRouter);
        app.use("/platform",  PlatformRouter);
        app.use("/email",        EmailRouter);
        
    }
}

module.exports = new API();