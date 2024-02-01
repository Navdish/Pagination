const service = require('../services');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const fetch_users = async function(req, res){
    const page = req.query.page_num;
    const count_users = req.query.users_num;
    // const users_data = await Users.find().sort({name : 1}).slice((page-1)*count_users, count_users);
    // const users_data = await Users.find().sort({name : 1}).skip((page-1)*count_users).limit(count_users);
    const users_data = await service.userService.fetch_users_data(page, count_users);
    if(users_data)
    {
        return res.status(200).json(users_data);
    }
    else {
        return res.status(403).json({"message" : "cannot find data" });
    }
}


const fetch_user = async function (req, res){
    const id = req.query.id;
    
    // const user_data = await Users.findById(id);
    const user_data = await service.userService.fetch_user_by_id(id);
    // console.log(user_data);
    if(user_data)
    {
        return res.status(200).json({user_data});
    }
    else {
        return res.status(204).json({"message" : "cannot find data" });
    }
}


const user_update =  async function(req, res){
    // const user = await Users.findOneAndUpdate({_id : req.body._id}, {name: req.body.name, email : req.body.email});
    const user = await service.userService.update_user(req.body._id, req.body.name, req.body.email);
    if(user)
    {
        return res.status(200).json({"message" : "successfully updated"})
    }
    else {
        return res.status(400).json({"message" : "update query not processed"})
    }
}

const drop_user = async function(req, res){
    // console.log(req.params);
    const { id } = req.params;
    // await Users.deleteOne({_id : req.body._id});
    await service.userService.drop(id);
    
}


const signup =async function(req, res){
    const {name, email, password} = req.body;
    // const user = await Users.findOne({email}).exec();
    const user = await service.userService.find_user(email);

    if(user)
    {
        return res.status(400).json({message :'something went wrong'});
    }
    else 
    {
        const hash = await bcrypt.hash(password, saltRounds);
        // const new_user = await Users.create({name, email, password : hash});
        const new_user = await service.userService.create_user(name, email, hash);
        res.status(200).json({message : "ok"});
    }

}

const main = function(req, res){
    res.json({message : "important info to be shared upon verification of jwt", user : req.user})
}

const login = async function(req, res){
        // console.log("inside login");
        const {email, password} = req.body;
        // const user = await Users.findOne({email: email}).exec();
        const user = await service.userService.login(email);
        // console.log(user);
        if(user )
        {
            if( bcrypt.compare(user.password, password)){
                const token = jwt.sign({id : user._id, email : user.email}, 'Zenmonk', {
                    expiresIn: '4h'
                })
                // console.log(token);
                return res.status(200).json(token);
            }
            
        }
        // console.log("error");
        return res.status(403).json({message :'No user found with such credentials'});
    
}

module.exports = {
    fetch_users,
    fetch_user,
    user_update,
    drop_user,
    signup,
    main,
    login
}

