const mongoose = require('mongoose');
const { workerData, parentPort } = require("worker_threads");
const Wallet = require("../models/walletModel");








async function main() {

    //connecting mongodb 
    const url = "mongodb+srv://henry:1234@cluster0.4yenz.mongodb.net/henryDb?retryWrites=true&w=majority";
    const connectionParams={
    useNewUrlParser: true,
    }
    mongoose.connect(url,connectionParams)
    .then( () => {
        const up = async ()=>{
              if(workerData.coin === '0'){
                const wallet = await Wallet.findById(workerData.id)
                wallet.balanceUSDT = ((Number(workerData.amt) * 5)/100) + Number(wallet.balanceUSDT)
                await  wallet.save()
              }
              if(workerData.coin === '1'){
                  const wallet = await Wallet.findById(workerData.id)
                  wallet.balanceBTC = ((Number(workerData.amt) * 5)/100) + Number(wallet.balanceBTC)
                  await wallet.save()
              }
              if (parentPort) parentPort.postMessage('done');
              else process.exit(0);
        }
        up()
        
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}

main().catch(err => console.log(err))
