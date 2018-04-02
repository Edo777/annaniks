function getByIndexAndCount(index,count){
    const Message = this;
    count = parseInt(count);
    index = parseInt(index);
    index = index * count;
    return Message.find().skip(index).limit(count);
}

function getCount(){
    const Message = this;
    return new Promise((resolve,reject)=>{
        Message.find({isRead :false}).count((err,countFalse)=>{
            if(err){
                reject(err)
            }
            Message.find({isRead : true}).count((e,countTrue)=>{
                if(err){
                    reject(err)
                }
                resolve({
                    countFalse : countFalse,
                    countTrue : countTrue
                })
            })
        });
    })
}

function getMessage(id){
    const Message = this;
    return Message.find({_id:id});
}

function editIsReade(id,bool){
    const Message = this;
    return Message.update({_id:id},{
        $set : {isRead : bool}
    })
}

function deleted(id){
    const Message = this;
    return Message.deleted({_id:id});
}


function createMessage(object){
    const Message = this;
    return Message.create(object);    
}
module.exports = {
    getByIndexAndCount,
    getCount,
    getMessage,
    editIsReade,
    deleted,
    createMessage
}