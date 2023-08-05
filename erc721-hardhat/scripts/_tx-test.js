const ethers = require('ethers');
const csvWriter = require('fast-csv').write;
const fs = require('fs');

const NUM_TRANSACTIONS = 100; // The number of transactions to send
const CSV_FILE_PATH = './transaction_times.csv'; // The path to the CSV file to write the results

// Fill in the appropriate values for these
const RPC_PROVIDER_URL =
  'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'; // URL to the Ethereum RPC provider
const PRIVATE_KEY =
  '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f'; // Your Ethereum private key
const RECEIVER_ADDRESS = '0x06d4945f00488087C1A750BffF88104D1e6aC71b'; // Address of the recipient
const TRANSACTION_AMOUNT = ethers.utils.parseEther('0.01'); // The amount of Ether to send in each transaction

const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// This function sends a single transaction and measures the time it takes to get a response
async function sendTransaction() {
  const tx = {
    to: RECEIVER_ADDRESS,
    value: TRANSACTION_AMOUNT,
  };

  const startTime = Date.now();

  const transactionResponse = await wallet.sendTransaction(tx);

  const transactionReceipt = await provider.waitForTransaction(
    transactionResponse.hash
  );

  const endTime = Date.now();

  return endTime - startTime;
}

// This function sends NUM_TRANSACTIONS transactions in parallel and writes the response times to a CSV file
async function testTransactionTimes() {
  const csvStream = csvWriter();
  const writableStream = fs.createWriteStream(CSV_FILE_PATH);

  csvStream.pipe(writableStream);
  csvStream.write({ title: 'Transaction Time (ms)' });

  const promises = [];

  for (let i = 0; i < NUM_TRANSACTIONS; i++) {
    promises.push(sendTransaction());
  }

  const transactionTimes = await Promise.all(promises);

  for (const time of transactionTimes) {
    csvStream.write({ title: time });
  }

  csvStream.end();
}

testTransactionTimes()
  .then(() => console.log('Done'))
  .catch((err) => console.error(err));
