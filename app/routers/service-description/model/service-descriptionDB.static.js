function getByLng(lng){
    const ServDes = this;
    return ServDes.findOne({language:lng});
}

function cretaeServDes(object){
    const ServDes = this;
    return ServDes.create(object);
}

function updateServDes(id,object){
    const ServDes = this;
    return ServDes.update({_id:id},{$set : object},{runValidators: true})
}

function deleteServDes(lng){
    const ServDes = this;
    return ServDes.remove({language:lng});
}

module.exports = {
    getByLng,
    cretaeServDes,
    updateServDes,
    deleteServDes
}
