const { ethers } = require('hardhat');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deployed contract address (you need to replace this with your deployed contract address)
  const contractAddress = '0x04315b4ce324b762D0E314ef9307f49e25be98FC';

  const myToken = MyToken.attach(contractAddress);

  // The address to receive the minted tokens (you need to replace this with the desired address)
  const toAddress = '0x32C6a22fC12D8f4036abc0413b0156c1d21D1f98';

  // The amount of tokens to mint
  const amount = ethers.utils.parseEther('1000'); // For example, minting 1000 tokens

  // Mint tokens
  const mintTx = await myToken.mint(toAddress, amount);
  await mintTx.wait();

  console.log(
    `Minted ${ethers.utils.formatEther(amount)} tokens to ${toAddress}`
  );

  // Check balance
  const balance = await myToken.balanceOf(toAddress);
  console.log(
    `Balance of ${toAddress} is ${ethers.utils.formatEther(balance)} tokens`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
