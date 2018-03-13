function isImage(err, req, res, next) {
    if (err) {
        res.status(500).send('Only images are allowed!');
    } else {
        next();
    }
}

module.exports = {
    isImage
}