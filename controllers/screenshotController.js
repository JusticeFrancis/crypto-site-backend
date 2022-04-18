const Credit = require("../models/creditModel")
const Screenshot = require("../models/screenshotModel")






//send a screenshot and update credit transaction to 1 ie sent 
async function screenshot(req, res, next) {
    let confirmed
   
    const body = req.body 
    const file = req.file


    const confirmTransaction = await Credit.findById(body.transaction_id)
    confirmTransaction.status = 1
    await confirmTransaction.save()
    .then((data)=>{
        confirmed = data
    })
    .catch((error)=>{
        confirmed = null
    })
    if(!confirmed){
        return res.json({msg: 'transaction does not exist', status : 'failed'})
    }

    const newScreenshot = await new Screenshot({ transaction_id : body.transaction_id, name :file.filename })
    newScreenshot.save()
    .then((data)=>{
        return res.json({data, status : 'success'})
    })
    .catch((error)=>{
        return res.json({error, msg : 'youve already sent a screenshot for this transaction', status : 'failed'})
    })


}
module.exports.screenshot = screenshot