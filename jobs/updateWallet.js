const mongoose = require('mongoose');
const { workerData } = require("worker_threads");
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
                    wallet.balanceUSDT = Number(wallet.balanceUSDT) * 2
                    wallet.save()
                }
                if(workerData.coin === '1'){
                    const wallet = await Wallet.findById(workerData.id)
                    wallet.balanceBTC = Number(wallet.balanceBTC) * 2
                    wallet.save()
                }
            }
            up()
            
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. n${err}`);
        })
    

  
}

main().catch(err => console.log(err))