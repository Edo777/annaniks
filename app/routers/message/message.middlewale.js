const {Message} = require('./model');

function checkId(req,res,next){
    Message.findOne({_id:req.params.id})
        .then((result)=>{
            if(result){
                next()
            }else{
                res.status(400).send('id is note');
            }
        }).catch((err)=>{
            res.status(400).send('id is note valid');
        })
}

module.exports = {
    checkId
}