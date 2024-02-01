const router = require('express').Router();
const { userController } = require('../controllers');
const jwt = require('jsonwebtoken');

// router.get('/', subscriberController.get_subscribers);
// router.get('/:id', subscriberController.get_subscriber_by_id);

function authenticateUser(req, res, next) {
    const token = req.headers['jwt-token'];
    
    // console.log(token);
    if(token == null) return res.status(401);

    jwt.verify(token, 'Zenmonk', (err, user)=> {
        if(err) return res.status(403).json({message : 'No longer valid'});
        req.user = user;
        next();
    })
}

router.get('/users', userController.fetch_users)
router.get('/user', userController.fetch_user)
router.put('/userUpdate', userController.user_update) 
router.delete('/dropUser/:id',userController.drop_user)
router.post('/signup', userController.signup)
router.get('/', authenticateUser, userController.main)
router.post('/login',userController.login)

module.exports = router;