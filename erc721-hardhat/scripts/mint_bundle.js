// const ethers = require('ethers');
const fs = require('fs');
const { ethers } = require('hardhat');

// const provider = new ethers.providers.JsonRpcProvider(
//   'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
// );

const mintToken = async (contract, to, tokenId, nonce) => {
  const startTime = Date.now();
  const tx = await contract.safeMint(to, tokenId, { nonce: nonce });
  await tx.wait();
  const endTime = Date.now();

  return endTime - startTime; // ミリ秒単位で応答時間を返す
};

const loadTest = async () => {
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deployed contract address (you need to replace this with your deployed contract address)
  // const contractAddress = '0xC52924A000800A82Cb7068e27495cE0983330a98';
  const contractAddress = '0x6586213eAeFDB7a21504CE31BAaFc5fa08D3a2CB';

  const myToken = MyToken.attach(contractAddress);

  // const signer = hre.ethers.provider.getSigner(); // signerを取得

  //   const contract = MyToken.attach(contractAddress);

  const receiver = '0x32C6a22fC12D8f4036abc0413b0156c1d21D1f98';

  const numTokens = 100; // ミントするトークンの数

  // const contractABI =
  //   require('../artifacts/contracts/MyToken.sol/MyToken.json').abi;
  // const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const promises = [];

  console.log(`Minting ${numTokens} tokens to ${receiver}...`);

  fs.writeFileSync('load_test_results.csv', 'token_number,response_time_ms\n');

  let nonce = 32119;
  for (let tokenId = 2001; tokenId <= 2002; tokenId++) {
    promises.push(
      mintToken(myToken, receiver, tokenId, nonce).then((time) => {
        console.log(`Mint transaction ${tokenId} took ${time} ms`);
        fs.appendFileSync('load_test_results.csv', `${tokenId},${time}\n`);
      })
    );
    nonce++;
  }

  await Promise.all(promises);

  console.log(`Minted ${numTokens} tokens!`);
};

loadTest().catch(console.error);
