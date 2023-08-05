const { ethers } = require('hardhat');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deployed contract address (you need to replace this with your deployed contract address)
  // const contractAddress = '0xC52924A000800A82Cb7068e27495cE0983330a98';
  const contractAddress = '0x63ae8F6b98E8fb9b1B4A378b3F32ca0f2Ba5CB82';

  const myToken = MyToken.attach(contractAddress);

  // The address to receive the minted token (you need to replace this with the desired address)
  const toAddress = '0x32C6a22fC12D8f4036abc0413b0156c1d21D1f98';

  // The id of token to mint
  const tokenId = 1; // For example, minting token with id 1

  // Mint token
  const mintTx = await myToken.safeMint(toAddress, tokenId);
  console.log('mintTx:', mintTx);
  await mintTx.wait();

  console.log(`Minted token with id ${tokenId} to ${toAddress}`);

  // Check ownership
  const owner = await myToken.ownerOf(tokenId);
  console.log(`Owner of token with id ${tokenId} is ${owner}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
