const findAll = function(){
    const Tags = this;
    return Tags.find({});
}

const createTags = function(tags){
    const Tags = this;
    return Tags.create(tags);
}

const updateTags = function(id,tags){
    const Tags = this;
    return Tags.update({_id:id},{$set:tags},{runValidators: true});
}

const removeTags = function(id){
    const Tags = this;
    return Tags.remove({_id:id});
}

module.exports = {
    createTags,
    updateTags,
    removeTags,
    findAll
}