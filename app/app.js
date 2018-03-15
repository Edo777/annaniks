const {BannerRouter} = require("./routers/banner");
const {ServiceRouter} = require("./routers/service");
const path = require('path');
const express = require('express');
class API {
    initApp(app){
        app.use("/static",express.static(__dirname + '/routers/static'));
        app.use("/banner", BannerRouter);
        app.use("/service",ServiceRouter);
    }
}

module.exports = new API();