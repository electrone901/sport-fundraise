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
  CardMedia,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
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
  const userWallet = '0xAF67cbD8fb00759C3b4667beAcfBB3600e25476A'
  const [items, setItems] = useState([])
  console.log(
    '🚀 ~ file: PageCommunity.js ~ line 43 ~ PageCommunity ~ items',
    items,
  )

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
    try {
      const covalentAPI = 'ckey_d4115699196e4d238fa138e180c'
      const contractAddress = '0x1a2FCb5F2704f1fF8eFF26668f63D001b42bF80B'
      try {
        const nfts = await fetch(
          `https://api.covalenthq.com/v1/80001/tokens/${contractAddress}/nft_token_ids/?quote-currency=USD&format=JSON&key=${covalentAPI}`,
        )
        const allNFTS = await nfts.json()
        if (allNFTS) {
          setNfts(allNFTS)
          setItems(allNFTS?.data?.items)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }

      // const historyResult = await fetch(
      //   `https://api.covalenthq.com/v1/137/address/${userWallet}/balances_v2/?nft=true&key=${covalentAPI}`,
      // )
      // const { data } = await historyResult.json()
      // console.log(
      //   '🚀 ~ file: PageCommunity.js ~ line 65 ~ loadMyCollection ~ data',
      //   data,
      // )
      // if (data) {
      //   setData(data)
      //   setUserHistory(data.items[0].nft_data)
      //   setLoading(false)
      // }
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
        <br/>
        <br/>
        <h2>Contract Stats from Covalent API</h2>
        {loading ? (
          <CircularStatic />
        ) : (
          <div>
            {nfts && nfts?.data ? (
              <div>
                <p className="info">
                  <strong>Last update: </strong> {nfts.data.updated_at}
                </p>
                <p>
                  <strong className="info">Total Count: </strong>
                  6+
                </p>
              </div>
            ) : (
              <h2>No data</h2>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Contract name</TableCell>
                    <TableCell>Contract address</TableCell>
                    <TableCell>Contract symbol</TableCell>
                    <TableCell>Contract decimals</TableCell>
                    <TableCell>Logo url</TableCell>
                    <TableCell>View Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items &&
                    items.map((legislator, key) => {
                      let overallRating, overallBlkRating
                      if (legislator.AverageRating) {
                        overallRating = legislator.overallRating
                      }
                      if (legislator.AverageBLKRating) {
                        overallBlkRating = legislator.overallBlkRating
                      }
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            <Avatar alt="nft logo" src={legislator.photoUrl} />
                          </TableCell>
                          <TableCell>
                            {legislator.token_id} {legislator.photoUrl}
                          </TableCell>
                          <TableCell>{legislator.contract_name}</TableCell>
                          <TableCell className="line-break">
                            {legislator.contract_address}
                          </TableCell>
                          <TableCell>
                            {legislator.contract_ticker_symbol}
                          </TableCell>
                          <TableCell>{legislator.contract_decimals}</TableCell>
                          <TableCell className="line-break">
                            {legislator.logo_url}
                          </TableCell>
                          <TableCell align="center">
                            <a
                              href={`https://mumbai.polygonscan.com/address/${legislator.contract_address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ChevronRightIcon
                                fontSize="large"
                                style={{ color: 'blue' }}
                              />
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Container>
    </StylesProvider>
  )
}

export default PageCommunity
