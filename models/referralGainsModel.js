const mongoose = require('mongoose')

const ReferralGainsSchema = new mongoose.Schema(
	{
        referee_email: { type: String, required: true},
        referred_email : { type: String, required: true},
        amount : { type: String, required: true},
        gain : { type: String, required: true},
        coin :{ type: String, required: true},
        percentage : { type: String, required: true},
	},
)


const ReferralGains = mongoose.model("ReferralGains", ReferralGainsSchema);
module.exports = ReferralGains;
