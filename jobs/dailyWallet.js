const mongoose = require('mongoose');
const { workerData } = require("worker_threads");
const Wallet = require("../models/walletModel");








async function main() {
    //connecting mongodb 
        const url = "mongodb+srv://henry:1234@cluster0.4yenz.mongodb.net/henryDb?retryWrites=true&w=majority";
        const connectionParams={
        useNewUrlParser: true,
        }
        await mongoose.connect(url,connectionParams)
        .then( () => {
          console.log('db connected')
            
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. n${err}`);
        })

        if(workerData.coin === '0'){
            const wallet = await Wallet.findById(workerData.id)
            wallet.balanceUSDT = ((Number(wallet.balanceUSDT) * 5)/100) + Number(wallet.balanceUSDT)
            wallet.save()
        }
        if(workerData.coin === '1'){
            const wallet = await Wallet.findById(workerData.id)
            wallet.balanceBTC = ((Number(wallet.balanceBTC) * 5)/100) + Number(wallet.balanceBTC)
            wallet.save()
        }
        
    

  
}

main().catch(err => console.log(err))