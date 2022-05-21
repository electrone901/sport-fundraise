require('@matterlabs/hardhat-zksync-deploy')
require('@matterlabs/hardhat-zksync-solc')

module.exports = {
  zksolc: {
    version: '0.1.0',
    compilerSource: 'docker',
    settings: {
      optimizer: {
        enabled: true,
      },
      experimental: {
        dockerImage: 'matterlabs/zksolc',
      },
    },
  },
  zkSyncDeploy: {
    zkSyncNetwork: 'https://zksync2-testnet.zksync.dev',
    ethNetwork:
      'https://eth-goerli.alchemyapi.io/v2/s1b_xfH_dzDOOvbpqtGNEDaMFgvYAu18', // replace Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
  },
  networks: {
    hardhat: {
      zksync: true,
    },
  },
  solidity: {
    version: '0.8.10',
  },
  paths: {
    artifacts: './sports-fundraiser/src/artifacts',
    cache: './sports-fundraiser/src/cache',
  },
}
