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

// use thewebamigos email
const toBecomePlayersIPFS =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRlZjk5ZThFZmFjMTdGMWI3YzA2MjIxMDM1ODg3Qjk4REE5MjJGODIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTU0MDA1ODg2NSwibmFtZSI6InRvQmVjb21lUGxheWVyc0lQRlMifQ.MkEGo3bsu3OQHLBa6IFFdWrbVbhId0KFGyb_VuhKsP8'

function BecomePlayer({ account, connectWallet }) {
  console.log('BecomePlayer', account, connectWallet)
  const history = useHistory()
  const [image, setImage] = useState('')
  const sportTypeRef = createRef()
  const [playerName, setPlayerName] = useState('')
  const [biography, setBiography] = useState(
    'I would love to play for this Soccer community , my skills are great. I can run 90miles per hour and jump higher than Ronaldo. I was born, 24 June 1987, in NYC to a working-class family and I love Soccer!',
  )
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const [petType, setPetType] = useState('')

  useEffect(() => {
    // if (!account) {
    //   alert('Please connect your wallet!')
    //   history.push('/')
    // }
  }, [])
  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const client = new NFTStorage({ token: toBecomePlayersIPFS })
      const metadata = await client.store({
        name: playerName,
        description: `${biography} 2$, ${petType} 2$`,
        image: new File([image], imageName, { type: imageType }),
      })
      if (metadata) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '1rem' }}
      >
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Register for a chance to become an Official player
          </Typography>

          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="player"
              className="img-preview"
            />
          ) : (
            ''
          )}
          <div className="form-container">
            <form className="form" noValidate autoComplete="off">
              <input
                accept="image/*"
                className="input"
                id="icon-button-photo"
                defaultValue={image}
                onChange={handleImage}
                type="file"
              />
              <label htmlFor="icon-button-photo">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                className="text-field"
                defaultValue={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Biography"
                variant="outlined"
                className="text-field"
                defaultValue={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
              <TextField
                fullWidth
                name="sportType"
                select
                label="Field Position"
                variant="outlined"
                className="text-field"
                onChange={(e) => setPetType(e.target.value)}
                defaultValue=""
                ref={sportTypeRef}
              >
                <MenuItem value="defender">defender</MenuItem>
                <MenuItem value="midfielder">midfielder</MenuItem>
                <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
                <MenuItem value="Right Fullback">Right Fullback</MenuItem>
                <MenuItem value="Left Fullback">Left Fullback</MenuItem>
                <MenuItem value="Box-to-Box">Box-to-Box</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
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

export default BecomePlayer
