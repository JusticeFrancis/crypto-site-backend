const mongoose = require('mongoose')

const ReferralSchema = new mongoose.Schema(
	{
        referee_email: { type: String, required: true },
        email : { type: String, required: true},
	},
)


const Referral = mongoose.model("Referral", ReferralSchema);
module.exports = Referral;
