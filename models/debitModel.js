const mongoose = require('mongoose')

const debitSchema = new mongoose.Schema(
	{
        amount: { type: String, required: true }, //amount of coin is transaction
        wallet_address : { type: String, required: true }, //user real life wallet to recieve debit
        coin :  { type: String, required: true }, // whether 0 usdt or 1 btc
        email: { type: String, required: true}, //user performing transaction email
        status :  { type: String, required: true },// if transaction is 0 pending, 1 approved
	},
)


const Debit = mongoose.model("Debit", debitSchema);
module.exports = Debit;

//0/pending debit status means the user has created a transaction and asked for debit
//1/approved means the admin has sent the debit user 