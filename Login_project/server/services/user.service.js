const model = require('../models');

// const add_subscriber = function(subscriberObj) {
//     return new model.Subscriber(subscriberObj).save();
// }

// const get_subscribers = function(criteria, projection, options = {}) {
//     options.lean = true;
//     return model.Subscriber.find(criteria, projection, options)
// }

// const get_subscriber_by_id = function(criteria, projection, options = {}) {
//     options.lean = true;
//     return model.Subscriber.findOne(criteria, projection, options)
// }


const fetch_users_data = function(page, count_users){
    return model.User.find().sort({name : 1}).skip((page-1)*count_users).limit(count_users);
}

const fetch_user_by_id = function(id){
    return model.User.findById(id);
}

const update_user = function(id, name, email){
    return model.User.findOneAndUpdate({_id : id}, {name: name, email : email});
}

const drop = function(id) {
    // console.log(id)
    return model.User.deleteOne({_id : id});
}

const create_user = function(name, email, hash, role, description, address) {
    return model.User.create({name, email, password : hash, role, description, address});
} 

const login = function(email){
    return model.User.findOne({email: email}).exec();
}

const find_user = function(email){
    return model.User.findOne({email: email}).exec();
}

module.exports = {
    fetch_users_data,
    fetch_user_by_id,
    update_user,
    drop,
    create_user,
    login,
    find_user
}



// module.exports = {
//     add_subscriber,
//     get_subscribers,
//     get_subscriber_by_id,
// }