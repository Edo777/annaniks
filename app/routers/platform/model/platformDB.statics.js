const findAll = function(){
    const Platform = this;
    return Platform.find({});
}

const createPlatform = function(platform){
    const Platform = this;
    return Platform.create(platform);
}

const updatePlatform = function(id,platform){
    const Platform = this;
    return Platform.update({_id:id},{$set:platform},{runValidators: true});
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