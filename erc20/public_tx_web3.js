const path = require('path');
const fs = require('fs-extra');
const Web3 = require('web3'); // make sure to import Web3

// modify these values
const host =
  'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'; // replace with your node URL
const contractJsonPath = path.resolve(__dirname, 'Erc20.json'); // path to your contract JSON file
const address = '0x32C6a22fC12D8f4036abc0413b0156c1d21D1f98'; // replace with your address

const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
const contractAbi = contractJson.abi;
const contractByteCode = contractJson.bytecode;

async function createContract(
  host,
  contractAbi,
  contractByteCode,
  contractInit,
  fromAddress
) {
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(contractAbi);
  const ci = await contractInstance
    .deploy({ data: '0x' + contractByteCode, arguments: [contractInit] })
    .send({ from: fromAddress, gasLimit: '0x24A22' })
    .on('transactionHash', function (hash) {
      console.log('The transaction hash is: ' + hash);
    });
  return ci;
}

async function main() {
  createContract(
    host,
    contractAbi,
    contractByteCode,
    [], // change if needed
    address
  )
    .then(async function (ci) {
      console.log('Address of transaction: ', ci.options.address);
    })
    .catch(console.error);
}

main();
