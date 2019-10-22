const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/',(req,res)=>{
    console.log('/community::'+req.params);
    res.sendFile(path.join( __dirname, '.././public/index.html'));
})

router.get('/list',(req,res)=>{
    console.log('/community/list::'+req.params);
    res.sendFile(path.join( __dirname, '.././public/index.html'));
})

module.exports = router;