function isImage(err, req, res, next) {
    if (err) {
        res.send('Only images are allowed!');
    } else {
        next();
    }
}

module.exports = {
    isImage
}