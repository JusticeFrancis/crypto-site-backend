const { workerData } = require("worker_threads");
const Wallet = require("../models/walletModel");

async function main() {
    console.log(workerData.worker)
    if(workerData.coin === '0'){
        const wallet = await Wallet.findById(ObjectId(workerData.worker.id))
        wallet.balanceUSDT = Number(wallet.balanceUSDT) * 2
        wallet.save()
    }
    if(workerData.coin === '1'){
        const wallet = await Wallet.findById(ObjectId(workerData.worker.id))
        wallet.balanceBTC = Number(wallet.balanceBTC) * 2
        wallet.save()
    }

  
}

main().catch(err => console.log(err))