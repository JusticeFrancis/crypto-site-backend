const Referee = require("../models/refereeModel")
const ReferralGains = require("../models/referralGainsModel")
const Referral = require("../models/referralModel")






//creating a referee acount


async function createAccount (req,res,next){

    //generating random key
    const x = Number(Date.now())
    const y = Math.floor(Math.random() * 100)
    const random_number = x * y
    const r = random_number.toString()
    const s = r.substring(0,6)
    const key = 'ref-'+s

    const body = req.body
    const newRef = await new Referee({email : body.email , number_of_referrals : 0, key : key})
    newRef.save()
    .then((ref)=>{
        return res.json({ref , status : 'success'})
    })
    .catch((err)=>{
        return res.json({err , status : 'failed'})
    })



} 

module.exports.createAccount = createAccount


//verify referee account


async function verifyRefree (req,res,next){
    const body = req.body
    const referee = await Referee.find0ne({email : body.email})
    .then((data)=>{
        return res.json({data , status : 'success'})
    })
    .catch((err)=>{
        return res.json({err , status : 'failed'})
    })
    

} 

module.exports.verifyRefree = verifyRefree





//get referrals


async function getReferrals (req,res,next){
    const referrals = Referral.find({referee_email : req.body.email})
    .then((data)=>{
    return res.json({data, status : 'success'})
    })
    .catch((data)=>{
        return res.json({data, status : 'failed'})
    })
} 

module.exports.getReferrals = getReferrals



//get referral gains


async function getReferralGains (req,res,next){
    const referrals = await ReferralGains.find({referee_email : req.body.email})
    .then((data)=>{
        return res.json({data, status : 'success'})
    })
    .catch((data)=>{
        return res.json({data, status : 'failed'})
    })
} 

module.exports.getReferralGains = getReferralGains