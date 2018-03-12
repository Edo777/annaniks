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
//////////////////////////////
function getBanner(req, res) {
    res.send('banner get')
}
//////////////////////////////
function getBannerByLng(req, res){
    res.send(req.params)
}
//////////////////////////////
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
/////////////////////////////
function uploadBanner(req, res){
    console.log(req.file)
}
////////////////////////////
function updateBanner(req,res){
    res.send('update banner');
}
////////////////////////////
function updateImg(req,res){
    res.send('update img banner');
}