const BannerRouter = require("./routers/banner/banner.router");
const {upload} = require("./routers/file.upload");

const {
    checkFileIsImagesMulter
} = require('./middleware/middleware');

class API {
    initApp(app){
        app.use('/',upload.single('file'),checkFileIsImagesMulter)
        app.use("/banner", BannerRouter);
    }
}

module.exports = new API();