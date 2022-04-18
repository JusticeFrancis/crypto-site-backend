const mongoose = require('mongoose')

const creditSchema = new mongoose.Schema(
	{
        amount: { type: String, required: true }, //amount of coin is transaction
        wallet_address : { type: String, required: true }, //real life wallet of admin
        coin :  { type: String, required: true }, // whether btc or usdt
        email: { type: String, required: true }, //user performing transaction email
        status :  { type: String, required: true },// if transaction is 0 pending, 1 sent or 2 approved
	},
)


const Credit = mongoose.model("Credit", creditSchema);
module.exports = Credit;

//0/pending credit status means the user has created a transaction
//1/sent screenshot credit means the screenshot of pay was sent
//2/approved means the admin has confirmed the pay