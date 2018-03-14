const { Banner } = require("../../models/banner.model");

class BannerService{
    addBanner(banner){
        return Banner.create(banner);
    }

    getBanner(){
        return Banner.find({});
    }

    getBannerByLng(lng){
        return Banner.find({language : lng,isActive : true});
    }

    uploadBanner(id,path){
        return Banner.findByIdAndUpdate({_id : id },{$set :{image : path}});
    }

    updateBanner(id,object){
        return Banner.update({_id:id},{$set : object});
    }

    updateImg(id,path){
        return Banner.findByIdAndUpdate({_id : id },{$set :{image : path}});
    }

    deleteBanner(id){
        return Banner.remove({_id:id});
    }
}

module.exports = new BannerService();