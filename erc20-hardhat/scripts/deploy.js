const { ethers } = require('hardhat');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');
  const myToken = await MyToken.deploy();
  await myToken.deployed();

  console.log('Contract deployed to address:', myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
