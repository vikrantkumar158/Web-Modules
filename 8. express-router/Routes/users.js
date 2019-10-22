const express = require('express');
const path = require('path');
const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));
router.get('/',(req,res)=>{
    console.log('/users::'+req.params);
    res.sendFile(path.join( __dirname, '.././public/index.html'));
})

router.get('/list',(req,res)=>{
    console.log('/users/list::'+req.params);
    res.sendFile(path.join( __dirname, '.././public/index.html'));
})

module.exports = router;