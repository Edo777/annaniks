function isImage(err, req, res, next) {
    if (err || (req.file == undefined)) {
        res.sendStatus(400);
    } else {
        next();
    }
}

module.exports = {
    isImage
}