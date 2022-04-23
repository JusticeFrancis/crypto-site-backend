const multer = require('multer')

const Credit = require("../models/creditModel")
const Debit = require("../models/debitModel")
const Screenshot = require("../models/screenshotModel")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")


//new 
const Bree = require('bree')
const dayjs = require('dayjs')
const moment = require('moment')
const Referral = require('../models/referralModel')
const ReferralGains = require('../models/referralGainsModel')



//multer options 
const upload = multer({
    dest:'images'
})







//credit wallet
async function credit(req, res, next) {
    const body = req.body //amt , wallet_addr, coin, email, status
    body.status = 0

    const newTransaction = new Credit(body)
    newTransaction.save()
    .then((transaction)=>{
        res.json({transaction , status : 'success'})
    })
    .catch((error)=>{
        res.json({error, status : 'failed'})
    })

}
module.exports.credit = credit


//debit wallet
async function debit(req, res, next) {
    const body = req.body //amt , wallet_addr, coin, email, status
    body.status = 0
    let user_wallet

    const wallet = await Wallet.findOne({email : body.email})
    .then((doc)=>{
        user_wallet = doc
    })
    if(body.coin === '0'){
        if(Number(user_wallet.balanceUSDT) < body.amount){
            return res.json({msg : 'your account wallet is insufficient to fund transaction' , status: 'failed'})
        }

    }
    else{
        if( Number(user_wallet.balanceBTC)  < body.amount){
            return res.json({msg : 'your account wallet is insufficient to fund transaction' , status: 'failed'})
        }
    }
    const newTransaction = new Debit(body)
    newTransaction.save()
    .then((transaction)=>{
        res.json({transaction , status : 'success'})
    })
    .catch((error)=>{
        res.json({error, status : 'failed'})
    })

}
module.exports.debit = debit



//approve transaction
async function approveTransaction(req, res, next) {
    //ne
    const body = req.body //transaction_id , type(credit debit),email,admin[email of the admin]
    let admin

    const user_admin = await User.findOne({email : body.admin})
    .then((doc)=>{
         admin = doc
    })
    if(!admin){
        return res.json({msg: 'approval of transaction must be done from an admin account', status : 'failed'})
    }else{
        if (admin.user_type !== '1') {
            return res.json({msg: 'approval of transaction must be done from an admin account', status : 'failed'})
        } 
    }
   
    
    if (body.type === 'credit'){
        const transaction =  await Credit.findById(body.transaction_id) 
        transaction.status = 2
        transaction.save()
        const wallet = await Wallet.findOne({email : body.email})
        if(transaction.coin === '0'){
            wallet.balanceUSDT = Number(wallet.balanceUSDT) + Number(transaction.amount)
            let id = wallet.id 
            let email = wallet.email
            let gain = (Number(transaction.amount) * 5)/100
             //send referrer 5% of the approved usdt for transaction
             const referral = await  Referral.findOne({email : email})
              if(referral){
                let referee_email = referral.referee_email
                //updating referee wallet
                const refree_wallet = await Wallet.findOne({email :referee_email})
                refree_wallet.balanceUSDT = Number(refree_wallet.balanceUSDT) + gain
                refree_wallet.save()
  
               //add to referral gain
               const referralG = await new ReferralGains({referee_email : refree_wallet.email,coin: '0',referred_email :email,amount : transaction.amount,gain : gain,percentage : '5%'})
               referralG.save()
              }
             wallet.save()
            .then((wallet)=>{
                const bree = new Bree({
                    jobs : [{
                    name : 'updateWallet',
                    date : dayjs().add(15,'days').toDate(),
                    worker : {
                        workerData : {
                        description : "This job will double wallet by initial deposit",
                        id : id,
                        coin : '0',
                        }
                    }
                    }]
                })
        
                bree.start()


                const bree2 = new Bree({
                    jobs : ['test',{
                    name : 'dailyWallet',
                    interval : '5s',
                    worker : {
                        workerData : {
                        description : "This job will update wallet by 5% initial deposit daily.",
                        id : id,
                        coin : '0',
                        }
                    }
                    }]
                })

                bree2.start()



                res.json({wallet , status : 'success'})
            })
            .catch((error)=>{
                res.json({error, status : 'failed'})
            })
        }else{
            wallet.balanceBTC = Number(wallet.balanceBTC) + Number(transaction.amount)
            let id = wallet.id 
            let email = wallet.email
            let gain = (Number(transaction.amount) * 5)/100
             //send referrer 5% of the approved usdt for transaction
             const referral = await  Referral.findOne({email : email})
             if(referral){
                let referee_email = referral.referee_email
                //updating referee wallet
                const refree_wallet = await Wallet.findOne({email :referee_email})
                refree_wallet.balanceBTC = Number(refree_wallet.balanceBTC) + gain
                refree_wallet.save()
  
               //add to referral gain
               const referralG = await new ReferralGains({referee_email : refree_wallet.email,coin: '1',referred_email :email,amount : transaction.amount,gain : gain,percentage : '5%'})
               referralG.save()
             }
            wallet.save()
            .then((wallet)=>{
                const bree = new Bree({
                    jobs : [{
                    name : 'updateWallet',
                    date : dayjs().add(15,'days').toDate(),
                    worker : {
                        workerData : {
                        description : "This job will send emails.",
                        id : id,
                        coin : '1',
                        }
                    }
                    }]
                })
                bree.start()

                const bree2 = new Bree({
                    jobs : ['test',{
                    name : 'dailyWallet',
                    interval : '30s',
                    worker : {
                        workerData : {
                        description : "This job will update wallet by 5% initial deposit daily.",
                        id : id,
                        coin : '1',
                        }
                    }
                    }]
                })

                bree2.start()

                res.json({wallet , status : 'success'})
            })
            .catch((error)=>{
                res.json({error, status : 'failed'})
            })
        }
    }else{
        const transaction =  await Debit.findById( body.transaction_id)
        transaction.status = 1
        transaction.save()
        const wallet = await Wallet.findOne({email : body.email})
        if(transaction.coin === '0'){
            wallet.balanceUSDT = Number(wallet.balanceUSDT) - Number(transaction.amount)
            if(Number(wallet.balanceUSDT) < 0){
                return res.json({msg : 'this wallet has insufficient funds', status : 'failed'})
            }
            wallet.save()
            .then((wallet)=>{
                res.json({wallet , status : 'success'})
            })
            .catch((error)=>{
                res.json({error, status : 'failed'})
            })
        }else{
            wallet.balanceBTC = Number(wallet.balanceBTC) - Number(transaction.amount)
            if(Number(wallet.balanceBTC) < 0){
                return res.json({msg : 'this wallet has insufficient funds', status : 'failed'})
            }
            wallet.save()
            .then((wallet)=>{
                res.json({wallet , status : 'success'})
            })
            .catch((error)=>{
                res.json({error, status : 'failed'})
            })
        }
    }

}
module.exports.approveTransaction = approveTransaction








//get credit transactions for a user
async function getCreditTransactionsUser(req,res,next){
    const transactions = Credit.find().where({email : req.params.email})
    .then((data)=>{
        if(data){
            return res.json({data,status:'success'})
        }
        else{
            return res.json({data, status:'failed'})
        }
    })

}
module.exports.getCreditTransactionsUser = getCreditTransactionsUser


//get credit transactions where the status is status
async function getCreditTransactionsStatus(req,res,next){
    const transactions = Credit.find().where({status : req.params.status})
    .then((data)=>{
        return res.json(data)
    })

}
module.exports.getCreditTransactionsStatus = getCreditTransactionsStatus




//get debit transactions
async function getDebitTransactions(req,res,next){
    const transactions = Debit.find()
    .then((data)=>{
        return res.json(data)
    })

}
module.exports.getDebitTransactions = getDebitTransactions


//get debit transactions for a user
async function getDebitTransactionsUser(req,res,next){
    const transactions = Debit.find().where({email : req.params.email})
    .then((data)=>{
        if(data){
            return res.json({data,status:'success'})
        }
        else{
            return res.json({data, status:'failed'})
        }
    })

}
module.exports.getDebitTransactionsUser = getDebitTransactionsUser