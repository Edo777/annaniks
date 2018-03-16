function isImage(err, req, res, next) {
    console.log(err)
    if (err) {
        res.status(500).send('Only images are allowed!');
    } else {
        next();
    }
}

module.exports = {
    isImage
}