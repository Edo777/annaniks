const BannerRouter = require("./routers/banner/banner.router");

class API {
    initApp(app){
        app.use("/banner", BannerRouter);
    }
}

module.exports = new API();