// In Node.js
const Web3 = require('web3');
const web3 = new Web3('ws://localhost:8545');

web3.setProvider('http://127.0.0.1:7545');
web3.eth.personal.getAccounts().then(console.log);

module.exports = Web3

console.log(web3);