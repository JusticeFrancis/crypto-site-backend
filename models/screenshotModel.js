const mongoose = require('mongoose')

const screenshotModel = new mongoose.Schema(
	{
        transaction_id: { type: String, required: true, unique:true }, //reference transaction 
        name : { type: String, required: true }, // name of screenshot
	},
)


const Screenshot = mongoose.model("Screenshot", screenshotModel);
module.exports = Screenshot;
