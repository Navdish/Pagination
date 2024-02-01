const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');
const Users = require('./Schema.js')
// var sessionstore = require('sessionstore');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     secret : "Zenmonk",
//     cookie : {maxAge: 24*60*60*1000},
//     saveUninitialized : false,
//     store: sessionstore.createSessionStore()

// }))


mongoose.connect("mongodb+srv://navdishjaggi:Navdish2001@cluster0.m2bproi.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log("DB connected"))
    .catch((error) => console.log(error));

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// })

// app.get('/login', function(req, res){
//     res.sendFile(__dirname + '/login.html');
// })

app.get('/users', async function(req, res){
    // console.log(req);
    const page = req.query.page_num;
    const count_users = req.query.users_num;
    // console.log(req.query);
    
    // const users_data = await Users.find().sort({name : 1}).where('').slice((page-1)*count_users, count_users);
    const users_data = await Users.find().sort({name : 1}).skip((page-1)*count_users).limit(count_users);
    // console.log(users_data);
    if(users_data)
    {
        return res.status(200).json(users_data);
    }
    else {
        return res.status(403).json({"message" : "cannot find data" });
    }
})


app.get('/user', async function (req, res){
    const id = req.query.id;
    
    // console.log(id);
    const user_data = await Users.findById(id);
    //console.log(user_data);
    if(user_data)
    {
        return res.status(200).json({user_data});
    }
    else {
        return res.status(204).json({"message" : "cannot find data" });
    }
})

app.put('/userUpdate', async function(req, res){
    // console.log(req.body);
    
    const user = await Users.findOneAndUpdate({_id : req.body._id}, {name: req.body.name, email : req.body.email});
    // console.log(user);
    if(user)
    {
        return res.status(200).json({"message" : "successfully updated"})
    }
    else {
        return res.status(400).json({"message" : "update query not processed"})
    }
})

app.delete('/dropUser', async function(req, res){
    console.log(req.body);
    
    await Users.deleteOne({_id : req.body._id});
    
})


app.post('/signup',async function(req, res){
    const {name, email, password} = req.body;
    // console.log(req.body);
    const user = await Users.findOne({email}).exec();

    if(user)
    {
        return res.status(400).json({message :'something went wrong'});
    }
    else 
    {
        const hash = await bcrypt.hash(password, saltRounds);
        // console.log(hash);
        const new_user = await Users.create({name, email, password : hash});
        res.status(200).json({message : "ok"});
    }

})

function authenticateUser(req, res, next) {
    const token = req.headers['jwt-token'];
    
    console.log(token);
    if(token == null) return res.status(401);

    jwt.verify(token, 'Zenmonk', (err, user)=> {
        if(err) return res.status(403).json({message : 'No longer valid'});
        req.user = user;
        next();
    })
}

app.get('/', authenticateUser, function(req, res){
    
    res.json({message : "important info to be shared upon verification of jwt", user : req.user})
})

app.post('/login',async function(req, res){
        const {email, password} = req.body;
        const user = await Users.findOne({email: email}).exec();
        console.log(user);
        if(user )
        {
            if( bcrypt.compare(user.password, password)){
                const token = jwt.sign({id : user._id, email : user.email}, 'Zenmonk', {
                    expiresIn: '4h'
                })
                return res.status(200).json(token);
            }
            
        }
        return res.status(403).json({message :'No user found with such credentials'});
    
    })

// app.post('/login',async function(req, res){
//     const {email, password} = req.body;
    
//     console.log(req.sessionID);
//     const user = await Users.findOne({email: email}).exec();
//     console.log(user);
//     if(user )
//     {
//         if( req.session.authenticated)
//         {
//             return res.status(200);
//         }
//         else if( password === user.password){
//             req.session.authenticated = true;
//             req.session.user = {email};
//             return res.status(200).json(req.session);
//         }
        
//     }
//     return res.status(403).json({message :'No user found with such credentials'});

// })




app.listen(8080, function() {
  console.log("Server is running on 8080");
});



//Username - navdishjaggi, Password - Navdish2001

