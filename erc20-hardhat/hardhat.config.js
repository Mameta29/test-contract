require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    // quorum: {
    //   url: 'http://aa91be3b402064d0a948625ee5688e96-1594862739.ap-northeast-1.elb.amazonaws.com/rpc',
    //   gasPrice: 0,
    //   accounts: [
    //     '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f',
    //   ],
    // },
    quorum: {
      url: 'http://a0f286efb4c824a3f9e6c4faa06c76dc-1857059410.ap-northeast-1.elb.amazonaws.com/rpc',
      // gasPrice: 0,
      accounts: [
        '0x12dc58ffa9dc71c09b090dc74309dd8415e9358df2c7eccdf201c94e8fec087f',
      ],
    },
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
