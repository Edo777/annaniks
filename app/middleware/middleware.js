function isImage(err, req, res, next) {
    if (err || (req.file == undefined)) {
        res.send('Only images are allowed!');
    } else {
        next();
    }
}

module.exports = {
    isImage
}