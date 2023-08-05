const { ethers } = require('hardhat');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');
  console.log('MyToken:', MyToken);
  console.log('-'.repeat(10));
  const myToken = await MyToken.deploy();
  console.log('myToken:', myToken);
  console.log('-'.repeat(10));
  // await myToken.deployed();
  myToken
    .deployed()
    .then((deployedContract) => {
      console.log('Contract deployed address1:', deployedContract.address);
    })
    .catch((error) => {
      console.error('Error deploying contract:', error);
    });

  console.log('Contract deployed to address2:', myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
