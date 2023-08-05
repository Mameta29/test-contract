const { ethers } = require('hardhat');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deployed contract address (you need to replace this with your deployed contract address)
  const contractAddress = '0x04315b4ce324b762D0E314ef9307f49e25be98FC';
  const myToken = MyToken.attach(contractAddress);

  // The private key of the account that will be doing the transfer (you need to replace this with the account's private key)
  const privateKey =
    '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f';

  const provider = new ethers.providers.JsonRpcProvider(
    'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  //   const myToken = MyToken.connect(wallet);

  // The address to send tokens to (you need to replace this with the desired address)
  const toAddress = '0x06d4945f00488087C1A750BffF88104D1e6aC71b';

  // The amount of tokens to transfer
  const amount = ethers.utils.parseEther('111'); // For example, transferring 500 tokens

  // Transfer tokens
  const transferTx = await myToken.transfer(toAddress, amount);
  await transferTx.wait();

  console.log(
    `Transferred ${ethers.utils.formatEther(amount)} tokens to ${toAddress}`
  );

  /// Check sender's balance
  const senderBalance = await myToken.balanceOf(wallet.address);
  console.log(
    `Balance of sender (${wallet.address}) is ${ethers.utils.formatEther(
      senderBalance
    )} tokens`
  );

  // Check recipient's balance
  const recipientBalance = await myToken.balanceOf(toAddress);
  console.log(
    `Balance of recipient (${toAddress}) is ${ethers.utils.formatEther(
      recipientBalance
    )} tokens`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
