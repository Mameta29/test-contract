const { ethers } = require('hardhat');
const fs = require('fs');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deployed contract address (you need to replace this with your deployed contract address)
  const contractAddress = '0xC52924A000800A82Cb7068e27495cE0983330a98';

  const myToken = MyToken.attach(contractAddress);

  // The address to receive the minted token (you need to replace this with the desired address)
  const toAddress = '0x32C6a22fC12D8f4036abc0413b0156c1d21D1f98';

  // CSVファイルに書き込むヘッダーを作成
  fs.writeFileSync('mint_test_results.csv', 'token_id,response_time_ms\n');

  // Mint 1000 tokens and record the response time for each
  for (let tokenId = 2101; tokenId <= 2200; tokenId++) {
    const startTime = Date.now();

    // Mint token
    const mintTx = await myToken.safeMint(toAddress, tokenId);
    await mintTx.wait();

    const endTime = Date.now();

    // Record the response time
    const responseTime = endTime - startTime;
    console.log(`Minted token with id ${tokenId} in ${responseTime} ms`);
    fs.appendFileSync('mint_test_results.csv', `${tokenId},${responseTime}\n`);

    // Check ownership
    const owner = await myToken.ownerOf(tokenId);
    console.log(`Owner of token with id ${tokenId} is ${owner}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
