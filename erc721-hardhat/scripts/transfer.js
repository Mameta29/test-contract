const { ethers } = require('hardhat');

async function main() {
  const MyToken = await ethers.getContractFactory('MyToken');

  // Deployed contract address (you need to replace this with your deployed contract address)
  const contractAddress = '0xC52924A000800A82Cb7068e27495cE0983330a98';
  // const myToken = MyToken.attach(contractAddress);
  const contractABI =
    require('../artifacts/contracts/MyToken.sol/MyToken.json').abi;
  const provider = new ethers.providers.JsonRpcProvider(
    'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc'
  );
  const myToken = new ethers.Contract(contractAddress, contractABI, provider);

  // The private key of the account that will be doing the transfer (you need to replace this with the account's private key)
  const privateKey =
    '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f';

  const wallet = new ethers.Wallet(privateKey, provider);
  const myTokenWithSigner = myToken.connect(wallet);

  // The address to send tokens to (you need to replace this with the desired address)
  const toAddress = '0x06d4945f00488087C1A750BffF88104D1e6aC71b';

  // The id of the token to transfer
  const tokenId = 1999; // For example, transferring token with id 1

  // Transfer token
  // const transferTx = await myTokenWithSigner.safeTransferFrom(
  //   wallet.address,
  //   toAddress,
  //   tokenId
  // );
  const transferTx = await myTokenWithSigner[
    'transferFrom(address,address,uint256)'
  ](wallet.address, toAddress, tokenId);
  await transferTx.wait();

  console.log(`Transferred token with id ${tokenId} to ${toAddress}`);

  // Check sender's token count
  const senderTokenCount = await myToken.balanceOf(wallet.address);
  console.log(
    `Token count of sender (${wallet.address}) is ${senderTokenCount}`
  );

  // Check recipient's token count
  const recipientTokenCount = await myToken.balanceOf(toAddress);
  console.log(
    `Token count of recipient (${toAddress}) is ${recipientTokenCount}`
  );

  // Check token's owner
  const owner = await myToken.ownerOf(tokenId);
  console.log(`Owner of token with id ${tokenId} is ${owner}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
