const {Platform} = require("./model")
function checkId(req,res,next){
    Platform.findById(req.params.id)
        .then((result)=>{
            if(result){
                next()
            }else{
                res.status(404).send({
                    message :"id is not platform idi"
                })
            }
        })
        .catch((err)=>{
            res.status(404).send({
                message : "id is not valid"
            })
        })
}

module.exports = {
    checkId
}