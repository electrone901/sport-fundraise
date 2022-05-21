import ABI from './artifacts-zk/contracts/Sport.sol/Sport.json'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import PetDetails from './components/home-container/pet-details/PetDetails'
import CreatePet from './components/create-post/CreatePlant'
import PlantswapContainer from './components/plantswap/plantswap-container/PlantswapContainer'
import CommunityContainer from './components/community/community-container/CommunityContainer'
import PageCommunity from './components/community/page-community/PageCommunity'
import SendTip from './components/become-player/SendTip'

import DonateNFT from './components/donate-nft/DonateNFT'
import RegisterCommunity from './components/community/register-community/RegisterCommunity'
import CommunityList from './components/community/community-list/CommunityList'
import Web3 from 'web3'
import community from './abis/Community.json'
import { useState } from 'react'
import { Contract, Web3Provider, Provider, Wallet } from 'zksync-web3'
import { ethers } from 'ethers'
// eslint-disable-next-line
const GREETER_CONTRACT_ADDRESS = '0xeA025bDd4Be308F46544D4af8E97cA1341A4491f' // change it
// eslint-disable-next-line
const GREETER_CONTRACT_ABI = ABI.abi

function App() {
  const [account, setAccount] = useState('')
  const [contractData, setContractData] = useState('')
  const [contractZkSync, setContractZkSync] = useState('')
  const [signer, setSigner] = useState('')
  const [balance, setBalance] = useState('')

  const initializeProviderAndSigner = async () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(async () => {
        if (+window.ethereum.networkVersion === 280) {
          const provider = new Provider('https://zksync2-testnet.zksync.dev')

          setAccount('0xE9dd2B835b2AC84B94c241D580B1E673aD0F4017')

          // Note that we still need to get the Metamask signer
          const signer = new Web3Provider(window.ethereum).getSigner()
          setSigner(signer)
          const contract = new Contract(
            GREETER_CONTRACT_ADDRESS,
            GREETER_CONTRACT_ABI,
            signer,
          )
          console.log('🚀 contract', contract)
          if (contract) {
            const flag = await setContractZkSync(contract)
            if (flag) getBalance()
          }
        } else {
          alert('Please switch network to zkSync!')
        }
      })
      .catch((e) => console.log(e))
  }

  console.log('account', account)

  const getBalance = async () => {
    // Getting the balance for the signer in the selected token
    const balanceInUnits = await signer.getBalance(
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    )
    // To display the number of tokens in the human-readable format, we need to format them,
    // e.g. if balanceInUnits returns 500000000000000000 wei of ETH, we want to display 0.5 ETH the user
    const balance = ethers.utils.formatUnits(balanceInUnits, '18')
    console.log('balance', balance)
    // await getGreeting()
  }

  const getGreeting = async () => {
    // Smart contract calls work the same way as in `ethers`
    const returnGreeting = await contractZkSync.greet()
    console.log('🚀 returnGreeting', returnGreeting)
  }

  const setGreeting = async () => {
    const txHandle = await contractZkSync.setGreeting('NEW GREETING HERE', {
      customData: {
        // Passing the token to pay fee with
        feeToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      },
    })
    await txHandle.wait()
  }

  //  u can donate tokens to ur players with  dai, usdc and eth
  const sendTip = async () => {
    const transferHandle = signer.transfer({
      to: '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C',
      token: '0x5C221E77624690fff6dd741493D735a17716c26B',
      amount: ethers.utils.parseEther('1'),
      feeToken: '0x5C221E77624690fff6dd741493D735a17716c26B',
    })
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying Metamask!',
      )
    }
  }

  const getContract = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = community.networks[networkId]

    if (networkData) {
      const abi = community.abi
      const address = community.networks[networkId].address
      const myContract = new web3.eth.Contract(abi, address)

      setContractData(myContract)
    } else {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }

  const connectWallet = async () => {
    console.log(' connectWallet')
    await initializeProviderAndSigner()
    // await loadWeb3()
    // await getContract()
  }

  return (
    <Router>
      <div className="cl">
        <Navbar
          account={account}
          connectWallet={connectWallet}
          getBalance={getBalance}
          setGreeting={setGreeting}
          sendTip={sendTip}
          balance={balance}
        />
        <Route exact path="/">
          <CommunityList account={account} contractData={contractData} />
        </Route>

        <Switch>
          <Route path="/register-community">
            <RegisterCommunity account={account} contractData={contractData} />
          </Route>

          <Route path="/send-tip">
            <SendTip sendTip={sendTip} />
          </Route>

          <Route exact path="/create-pet" component={CreatePet} />

          <Route path="/plant-swap">
            <PlantswapContainer account={account} contractData={contractData} />
          </Route>
          <Route path="/community">
            <CommunityContainer account={account} contractData={contractData} />
          </Route>

          <Route
            exact
            path="/page-community/:fundId"
            component={PageCommunity}
          />
          <Route exact path="/create-pet" component={CreatePet} />
          <Route exact path="/donate" component={DonateNFT} />

          <Route path="/pet-details/:petId">
            <PetDetails account={account} contractData={contractData} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
