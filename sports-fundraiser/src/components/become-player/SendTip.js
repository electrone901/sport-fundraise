import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import './BecomePlayer.css'
import { NFTStorage, File } from 'nft.storage'
import { createRef } from 'react'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  IconButton,
  MenuItem,
} from '@material-ui/core'
import './BecomePlayer.css'

const userImg =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
// use thewebamigos email
const toBecomePlayersIPFS =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRlZjk5ZThFZmFjMTdGMWI3YzA2MjIxMDM1ODg3Qjk4REE5MjJGODIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTU0MDA1ODg2NSwibmFtZSI6InRvQmVjb21lUGxheWVyc0lQRlMifQ.MkEGo3bsu3OQHLBa6IFFdWrbVbhId0KFGyb_VuhKsP8'

function SendTip({ account, connectWallet }) {
  const [to, setTo] = useState('')
  const tokenToSendType = React.createRef('')
  const tokenToPayType = React.createRef('')
  const [amount, setAmount] = useState(0)
  const [tokenToSend, setTokenToSend] = useState('')
  const [tokenToPay, setTokenToPay] = useState('')

  useEffect(() => {
    // if (!account) {
    //   alert('Please connect your wallet!')
    //   history.push('/')
    // }
  }, [])

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Support your favorite player by sending tokens
          </Typography>
          <div className="form-container">
            <form className="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Wallet to send to"
                variant="outlined"
                className="text-field"
                defaultValue={to}
                onChange={(e) => setTo(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Amount to send"
                variant="outlined"
                className="text-field"
                defaultValue={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <TextField
                fullWidth
                name="tokenToSend"
                select
                label="Choose token to send"
                variant="outlined"
                className="text-field"
                onChange={(e) => setTokenToSend(e.target.value)}
                defaultValue={tokenToSend}
                ref={tokenToSendType}
              >
                <MenuItem value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
                  ETH
                </MenuItem>
                <MenuItem value="0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4">
                  USDC
                </MenuItem>
                <MenuItem value="0x5C221E77624690fff6dd741493D735a17716c26B">
                  DAI
                </MenuItem>
              </TextField>

              <TextField
                fullWidth
                name="tokenToSend"
                select
                label="Choose token to pay with"
                variant="outlined"
                className="text-field"
                onChange={(e) => setTokenToPay(e.target.value)}
                defaultValue={tokenToPay}
                ref={tokenToPayType}
              >
                <MenuItem value="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE">
                  ETH
                </MenuItem>
                <MenuItem value="0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4">
                  USDC
                </MenuItem>
                <MenuItem value="0x5C221E77624690fff6dd741493D735a17716c26B">
                  DAI
                </MenuItem>
              </TextField>

              <Button
                size="large"
                variant="contained"
                color="primary"
                // onClick={handleSubmit}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </StylesProvider>
  )
}

export default SendTip
