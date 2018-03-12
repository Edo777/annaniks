const { Banner } = require("../../models/banner.model");

class BannerService{
    addBanner(banner){
        return Banner.create(banner);
    }
}

module.exports = new BannerService();