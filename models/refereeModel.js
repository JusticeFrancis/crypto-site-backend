const mongoose = require('mongoose')

const RefreeSchema = new mongoose.Schema(
	{
        key :  { type : String , required : true},
        email: { type: String, required: true , unique:true },
        number_of_referrals : { type: String, required: true},
	},
)


const Referee = mongoose.model("Referee", RefreeSchema);
module.exports = Referee;
