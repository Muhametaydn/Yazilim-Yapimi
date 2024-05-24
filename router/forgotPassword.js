const express = require('express')
const router = express.Router()
const {join} = require('path')
const User = require(join(__dirname, "..", "model", "userModel.js"));


router.get('/' , (req,res)=>{
    res.render('site/forgotPassword')
})


router.post('/' , async (req,res)=>{
    const {email,beforePassword,afterPassword} = req.body
    console.log(req.body)
    
    const user = await User.findOne({ "email":email } );
    
    console.log(user)
    if (!user) {
        return res.status(404).send('Böyle bir kullanıcı bulunamadı.');
    }
    console.log(email)
    
    if(beforePassword == user.password){
        user.password = afterPassword
        await user.save();
        return res.status(201).json({success:true})

    }
    return res.status(401).send('Eski şifre hatalı.');


})






module.exports =  router