

# Sport Fundraiser
A decentralized fundraising app that helps semi-professional players to get funding. Get started today by registering and raising the money you need to buy your sports equipment. This project allows fans to support aspiring sports stars by donating and raising money.



SoccerDAO is a social dApp built for anyone who loves exercising and soccer.

SoccerDAO is a platform where Soccer organizers or coordinators can register their soccer community, set up a profile, create bounties, and receive tips from the community.

Whenever a viewer goes to the SoccerDAO platform will be able to browse all and every soccer organization, and see details from the specific community and exclusive content.

Overall, users will be able to:

- Register to become Official members
- send or receive donations
- donate money to their favorite Soccer community

## Video

https://youtu.be/9RyMDFCMnbE

# How it's made

We use:

`Covalent API endpoints` to get all NFTs balance and metadata from a wallet address such us images, contracts name, NFTs images, and balances.

- `NFTStorage`for data storage on IPFS that generates a transaction hash used to create an NFT of a photo.

- `textile/eth-storage`: facilitated a fast way to store metadata for communities such: as names, locations, descriptions, images, wallet addresses, and more. It was perfect for the soccer community's problem case to save their needs on the textile storage.

- `NFTPort` smooths the path of minting and donating NFTs for communities. This is a win-win situation for our comunities because they don't have to pay to contribute or mint NFTs.

- `Pocket Portal` smooths the path of deploying and the hustle of paying such big transactions to deploy our communities' contract to a node using the Rinkeby network.

- `Skynet` facilitated the process of deploying our dApp front-end application in a seamless way.

- `Solidity` for the smart contract.

- `OpenZeppelin ERC721` we use the ERC721 template for faster development of the PetGram smart contract.

- `Ganache` for local blockchain development.

- `Rinkeby Network` is the network where we deployed our dApp.

- `React Js, Material-ui, Web3` React Js for the frontend, Material-ui and Web3 to connect to the blockchain.

Communities Using Covalent API to Fetch all NFTs from a wallet Address
![Main Page](https://raw.githubusercontent.com/electrone901/SoccerDAO/main/Home.png)

# Getting Started

### `yarn start`

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


# Note

to run 
yarn hardhat compile

