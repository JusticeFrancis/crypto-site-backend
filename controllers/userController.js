const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const express = require('express')
const Wallet = require('../models/walletModel')





//register user to database using email,name, password and user_type
async function register(req, res, next) {
    let p
    const body = req.body
    try {
        const newUser =  new User(body)
        const salt = await  bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password , salt)
        await newUser.save()
        const newWallet =  new Wallet({balanceUSDT: 0, balanceBTC : 0 , email : newUser.email})
        newWallet.save()
        return res.json({newUser , status : 'success'})
        
    } catch (error) {
        return res.json({error , status : 'failed', msg : 'user account already exist'})
    }

    

}
module.exports.register = register



//login user using email and password
async function login(req,res,next){
    const body = req.body 
    const user = await User.findOne({email : body.email})
    let msg
    if(user){
        const validPassword = await bcrypt.compare(body.password,user.password)
        if(validPassword){
            return res.json({ user , status: 'success' })

        }else{
            msg = 'password is invalid'
            return res.json({msg , status: 'failed'})
        }

    }else{
        msg = 'user does not exist'
        return res.json({msg , status: 'failed'})
    }
    
}

module.exports.login = login