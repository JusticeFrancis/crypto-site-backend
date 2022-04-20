const { workerData } = require("worker_threads");
const Wallet = require("../models/walletModel");

async function main() {
    const wallet = Wallet.findById(workerData.id)
    if(workerData.coin === '0'){
        wallet.balanceUSDT = Number(wallet.balanceUSDT) * 2
        wallet.save()
    }
    if(workerData.coin === '1'){
        wallet.balanceBTC = Number(wallet.balanceBTC) * 2
        wallet.save()
    }

  
}

main().catch(err => console.log(err))