const express = require("express");
const serveIndex = require('serve-index')
const debug = require('debug')('myapp:server')
const user_controller = require('./controllers/UserController')
const transaction_controller = require('./controllers/transactionController')
const screenshot_controller = require('./controllers/screenshotController')
const wallet_controller = require('./controllers/walletController')
const bodyParser = require('body-parser');

const router = express.Router()

const multer = require("multer");
const path = require('path')


//storing files
const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/screenshots')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//will be using this for uplading
const upload = multer({ storage: storage });


//app.use(express.static('public'));
router.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));


//parsing form data successfully
router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req,res){
    res.send('hi')
})

//register user 
router.post('/register', user_controller.register)


//login user
router.post('/login', user_controller.login)


//credit wallet
router.post('/credit', transaction_controller.credit)

//debit wallet
router.post('/debit', transaction_controller.debit)

//approve transaction
router.post('/approve_transaction', transaction_controller.approveTransaction)

//send screenshot
router.post('/send_screenshot', upload.single('screenshot'), screenshot_controller.screenshot)

//get all credit transaction
router.get('/transactions/credit', transaction_controller.getCreditTransactions)


//get all credit transaction where status is sent
router.get('/transactions/credit/:status', transaction_controller.getCreditTransactionsStatus)

//get all credit transaction for a user
router.get('/transactions/credit/user/:email', transaction_controller.getCreditTransactionsUser)


//get all debit transaction
router.get('/transactions/debit', transaction_controller.getDebitTransactions)

//get all debit transaction for a user
router.get('/transactions/debit/:email', transaction_controller.getDebitTransactionsUser)

//get user wallet
router.get('/wallet/:email', wallet_controller.getWallet)

module.exports = router;



