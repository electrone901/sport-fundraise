import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './PageCommunity.css'
import {
  Container,
  StylesProvider,
  Typography,
  Button,
  Card,
  ImageListItem,
} from '@material-ui/core'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import community1 from '../../../images/preview-community.jpg'

import CircularStatic from '../../commons/CircularProgressWithLabel'
import BasicTabs from '../../community/community-container/BasicTabs'
import SendTip from '../../become-player/SendTip'

function PageCommunity() {
  const { fundId } = useParams()
  const [fund, setFund] = useState('')
  const [loading, setLoading] = useState(false)
  const [unlock, setUnlock] = useState(false)
  const [nfts, setNfts] = useState([])
  const [projectWallet, setProjectWallet] = useState('')
  const [userHistory, setUserHistory] = useState([])
  const [data, setData] = useState('')
  const userWallet = '0x463Eeb088b094D2CeEec50d186A36DdC80c05870' //need to change

  const getMetaData = async () => {
    let data = await fetch(`https://ipfs.io/ipfs/${fundId}/metadata.json`)
    data = await data.json()
    data.image = getImage(data.image)
    const descriptionArray = data?.description.split(',$,')
    data.description = descriptionArray[0]
    data.type = descriptionArray[1]
    data.walletAddress = descriptionArray[2]
    setFund(data)
  }
  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL[1]
  }

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
    window.addEventListener('unlockProtocol.status', function (event) {
      if (event.detail.state === 'unlocked') {
        alert('Worked!')
        setUnlock(true)
      }
    })
  }

  const loadMyCollection = async () => {
    const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'
    try {
      const historyResult = await fetch(
        `https://api.covalenthq.com/v1/137/address/${userWallet}/balances_v2/?nft=true&key=${covalentAPI}`,
      )
      const { data } = await historyResult.json()
      if (data) {
        setData(data)
        setUserHistory(data.items[0].nft_data)
        setLoading(false)
      }
    } catch (error) {
      setLoading(true)
      console.error(error)
    }
  }

  useEffect(() => {
    getMetaData()
    setLoading(true)
    loadMyCollection()
  }, [])

  console.log(' data', data)
  const sendTip = (e) => {
    e.preventDefault()
  }
  return (
    <StylesProvider injectFirst>
      <Container
        className="page-community"
        style={{ minHeight: '70vh', paddingBottom: '1rem' }}
      >
        <div>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography className="title" color="textPrimary" gutterBottom>
                  {fund.name}
                </Typography>
                <ImageListItem
                  style={{ height: '300px', width: '450px', listStyle: 'none' }}
                >
                  <img src={fund.image} alt="community" />
                </ImageListItem>
              </Grid>

              <Grid p xs={6} className="grid-rigth-side">
                <div className="page-wallet-address">
                  <Typography color="textPrimary" gutterBottom>
                    <b> WalletAddress:</b>
                    {fund.walletAddress}
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/send-tip"
                  >
                    Send tokens
                  </Button>
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/donate"
                  >
                    Donate NFT
                  </Button>

                  <div className="page-metadata">
                    <Typography variant="body2" color="text.secondary">
                      <b> Description:</b>
                      {fund.description}
                    </Typography>
                    <br />

                    <Typography variant="body2" color="text.secondary">
                      <b> Sport Type:</b> {fund.type}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>

        <br />
        <br />
        <BasicTabs />
        <br />
        <br />
        <Typography className="subtitle" color="textPrimary" gutterBottom>
          The West Side Community Garden NFTs via Covalent
        </Typography>
        <p>
          The Covalent Unified API can be used to pull balances, positions and
          historical granular transaction data from dozens of blockchain
          networks. This data enables hundreds of end-user use-cases like
          wallets, investor dashboards, taxation tools and as-of-yet unknown
          use-cases.
        </p>
        <br />
        <br />

        {data ? (
          <Container>
            <div className="data">
              <p className="info">
                <strong>Contract Address: </strong>
                {data.address}
              </p>
              <p className="info">
                <strong>Last update: </strong> {data.updated_at}
              </p>
              <p>
                <strong className="info">Total Count: </strong>
                {data.items.length}
              </p>
            </div>
          </Container>
        ) : (
          ''
        )}

        {loading ? (
          <CircularStatic />
        ) : (
          <div>
            {userHistory && userHistory.length ? (
              userHistory.map((project, index) => (
                <Card className="card-padding" key={index}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}>
                      <img
                        className="nft-img"
                        src={project.external_data.image}
                        style={{ width: '100%' }}
                        alt=""
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <div className="container-flex">
                        <h2 className="inner2">{project.external_data.name}</h2>
                        <p className="info">
                          TokenId: <strong>{project.token_id}</strong>
                        </p>
                        <p className="info">
                          <strong>Token Balance: </strong>
                          {project.token_balance}
                        </p>
                        <p className="info">
                          <strong>Tokens supported: </strong>
                          {project.supports_erc.length > 0 ? (
                            project.supports_erc.map((index) => (
                              <span key={index}>{index}, </span>
                            ))
                          ) : (
                            <p>ERC20</p>
                          )}
                        </p>
                        <p className="info">
                          <strong>Owner: </strong>
                          {project.owner}
                        </p>
                        <p className="info">
                          <strong>Original owner: </strong>
                          {project.original_owner}
                        </p>
                        <p className="info">
                          <strong>Desc: </strong>
                          {project.external_data.description}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <h2>No NFTs Yet...</h2>
            )}
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default PageCommunity
