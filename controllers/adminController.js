const res = require("express/lib/response")
const Credit = require("../models/creditModel")
const Debit = require("../models/debitModel")
const Screenshot = require("../models/screenshotModel")
const User = require("../models/userModel")









//get credit transactions
async function getCreditTransactions(req,res,next){
    const email = req.body.email
    let admin
    let information = []
    const user = await User.findOne().where({email})
    if(!user){
        return res.json({msg: 'this account does not exist', status : 'failed'})
    }else{
    const user = await User.findOne().where({email})
    .then((data)=>{
        if(data.user_type === '0'){
            admin = false
        }
        else{
            admin = true
        }
    })
    if(!admin){
        return res.json({msg: 'this user is not an admin', status : 'failed'})
    }else{
        const transactions = Credit.find()
        .then((data)=>{
            console.log(data.length)
            return res.json(data)
        })
    }
   }
    
}
module.exports.getCreditTransactions = getCreditTransactions


//get credit transactions
async function getScreenshots(req,res,next){
    const email = req.body.email
    let admin
    const user = await User.findOne().where({email})
    if(!user){
        return res.json({msg: 'this account does not exist', status : 'failed'})
    }else{
    const user = await User.findOne().where({email})
    .then((data)=>{
        if(data.user_type === '0'){
            admin = false
        }
        else{
            admin = true
        }
    })
    if(!admin){
        return res.json({msg: 'this user is not an admin', status : 'failed'})
    }else{
        const screenshots = Screenshot.find()
        .then((data)=>{
            console.log(data.length)
            return res.json(data)
        })
    }
   }
    
}
module.exports.getScreenshots = getScreenshots






//get credit transactions
async function getDebitTransactions(req,res,next){
    const email = req.body.email
    let admin
    const user = await User.findOne().where({email})
    if(!user){
        return res.json({msg: 'this account does not exist', status : 'failed'})
    }else{
    const user = await User.findOne().where({email})
    .then((data)=>{
        if(data.user_type === '0'){
            admin = false
        }
        else{
            admin = true
        }
    })
    if(!admin){
        return res.json({msg: 'this user is not an admin', status : 'failed'})
    }else{
        const debits = Debit.find()
        .then((data)=>{
            console.log(data.length)
            return res.json(data)
        })
    }
   }
    
}
module.exports.getDebitTransactions = getDebitTransactions
