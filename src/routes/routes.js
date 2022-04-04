const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/AuthController');
const usercontroller = require('../controllers/UserController');
const adscontroller = require('../controllers/AdsController');

router.get('/ping',(req,res)=>{
    res.json({pong:'true'});
});

router.get('/states',usercontroller.getStates);

router.post('/user/signin',usercontroller.signin);
router.post('/user/signup',usercontroller.signup);
router.get('/user/me',usercontroller.me);
router.put('/user/me',usercontroller.editAction);

router.get('/categories',adscontroller.categories);

router.post('/ad/add',adscontroller.ad);
router.get('/ad/list',adscontroller.getList);
router.get('/ad/item',adscontroller.getItem);
router.post('/ad/:id',adscontroller.editAction);




module.exports = router;