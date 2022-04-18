const Wallet = require("../models/walletModel")









//get credit transactions for a user
async function getWallet(req,res,next){
    const wallet = await  Wallet.findOne().where({email : req.params.email})
    .then((wallet)=>{
        return res.json({wallet, status:'success'})
    })
}
module.exports.getWallet = getWallet