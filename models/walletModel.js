const mongoose = require('mongoose')

const WalletSchema = new mongoose.Schema(
	{
        balanceUSDT: { type: String, required: true },
        balanceBTC :  { type: String, required: true },
        email: { type: String, required: true , unique : true},
	},
)


const Wallet = mongoose.model("Wallet", WalletSchema);
module.exports = Wallet;