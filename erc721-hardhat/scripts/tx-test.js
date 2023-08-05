const ethers = require('ethers');
const fs = require('fs');

const provider = new ethers.providers.JsonRpcProvider(
  'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
);
// トークンを送信する関数
const sendToken = async (contract, from, to, tokenId, nonce) => {
  const startTime = Date.now();
  await contract.transferFrom(from, to, tokenId, { nonce: nonce });
  const endTime = Date.now();

  return endTime - startTime; // トランザクションの応答時間をミリ秒単位で返す
};

const loadTest = async () => {
  //   test A
  const privateKey =
    '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f';
  // test B
  // const privateKey =
  //   '0x2095bbba78b1e0261416d2e93543ecccd2ca7b6d68e4abdb35a2c6b20403f5c9';

  const signer = new ethers.Wallet(privateKey, provider);
  const sender = await signer.getAddress();
  //   test A
  const receiver = '0x06d4945f00488087C1A750BffF88104D1e6aC71b';
  //   test B
  // const receiver = '0x32C6a22fC12D8f4036abc0413b0156c1d21D1f98';

  const numTokens = 100; // 送信するトークンの数

  // ERC721スマートコントラクトのアドレス（適宜置き換えてください）
  const contractAddress = '0xC52924A000800A82Cb7068e27495cE0983330a98';
  const contractABI =
    require('../artifacts/contracts/MyToken.sol/MyToken.json').abi;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const promises = [];

  console.log(`Sending ${numTokens} tokens from ${sender} to ${receiver}...`);

  // CSVファイルに書き込むヘッダーを作成
  fs.writeFileSync('load_test_results.csv', 'token_number,response_time_ms\n');

  let nonce = 41000;
  for (let tokenId = 2101; tokenId <= 2200; tokenId++) {
    // Promiseを配列に追加
    promises.push(
      sendToken(contract, sender, receiver, tokenId, nonce).then((time) => {
        console.log(`Transaction ${tokenId} took ${time} ms`);
        fs.appendFileSync('load_test_results.csv', `${tokenId},${time}\n`);
      })
    );
    nonce++; // nonceをインクリメント
  }
  //   for (let tokenId = 1021; tokenId <= 1040; tokenId++) {
  //     const time = await sendToken(contract, sender, receiver, tokenId);
  //     console.log(`Transaction ${tokenId} took ${time} ms`);
  //     fs.appendFileSync('load_test_results.csv', `${tokenId},${time}\n`);
  //   }

  await Promise.all(promises);

  console.log(`Sent ${numTokens} transactions!`);
};

loadTest().catch(console.error);
