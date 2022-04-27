const Wallet = require("../models/walletModel")









//get credit transactions for a user
async function getWallet(req,res,next){
    const wallet = await  Wallet.findOne().where({email : req.params.email})
    .then((wallet)=>{
        return res.json({wallet, status:'success'})
    })
}
module.exports.getWallet = getWallet


//update all user wallets by 5% DAILY
async function updateWalletDaily(req,res,next){
    const wallet = await  Wallet.find()
    wallet.forEach(element => {
        const up = async()=>{
            const unit = await Wallet.findById(element._id)
            unit.balanceUSDT = ((Number(unit.balanceUSDT) * 5)/100 ) + Number(unit.balanceUSDT)
            unit.balanceBTC = ((Number(unit.balanceBTC) * 5)/100 ) + Number(unit.balanceBTC)
            unit.save()
        }
        up()
     });
     return res.json({wallet, status:'success'})
}
module.exports.updateWalletDaily = updateWalletDaily