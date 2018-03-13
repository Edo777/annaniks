const BannerRouter = require("./routers/banner/banner.router");
const {upload} = require("./routers/file.upload");

const {
    isImage
} = require('./middleware/middleware');

class API {
    initApp(app){
        app.use('/', upload.single('file'), isImage)
        app.use("/banner", BannerRouter);
    }
}

module.exports = new API();