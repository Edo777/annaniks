const Service = require('./banner.service');
const _ = require("lodash");
module.exports = {
    getBanner,
    getBannerByLng,
    addBanner,
    uploadBanner,
    updateBanner,
    updateImg
}

function getBanner(req, res) {
    Service.getBanner()
        .then(resutt => res.send(resutt))
        .catch(err => res.send(err));
}

function getBannerByLng(req, res){
    Service.getBannerByLng(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function addBanner(req, res){
    var banner = req.body;
    Service.addBanner(banner)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(_.pick(error, ['name', 'message']));
        })
}

function uploadBanner(req, res){
    Service.uploadBanner(req.body.id, req.file.path)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function updateBanner(req,res){
    console.log(req.params.id)
    Service.updateBanner(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function updateImg(req,res){
    Service.updateImg(req.body.id)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}