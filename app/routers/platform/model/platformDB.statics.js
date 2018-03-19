const findAll = function(){
    const Platform = this;
    return Platform.find({});
}

const createPlatform = function(tags){
    const Platform = this;
    return Platform.create(tags);
}

const updatePlatform = function(id,tags){
    const Platform = this;
    return Platform.update({_id:id},{$set:tags},{runValidators: true});
}

const removePlatform = function(id){
    const Platform = this;
    return Platform.remove({_id:id});
}

module.exports = {
    createPlatform,
    updatePlatform,
    removePlatform,
    findAll
}