import React, { useState, useEffect } from 'react'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { useHistory } from 'react-router-dom'
import './RegisterCommunity.css'
import {
  TextField,
  Container,
  StylesProvider,
  Typography,
  Button,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from '../../../APIKEYS'
import { providers } from 'ethers'
import { init } from '@textile/eth-storage'

function RegisterCommunity({ account, contractData }) {
  const petTypeRef = React.createRef()
  const [image, setImage] = useState('')
  const [name, setName] = useState('Kevin DePierrre')
  const [description, setDescription] = useState('One of the best Soccer communities of NYC, Upper West Side. Beautiful and Peaceful place.')
  const [sportType, setsportType] = useState('')
  const [loading, setLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState(
    '0x49b33f4tfcf2cee7102e5b34',
  )
  const [imageName, setImageName] = useState('')
  const [imageType, setImageType] = useState('')
  const history = useHistory()

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        // pass the cid
        const cid = 'QmTFaLUesrjbQLKxNszz2DWZ33N9YuGBSVCLpwXnvyiumz'

        let fileData = await fetch(`https://ipfs.io/ipfs/${cid}`)

        const yourData = await fileData.json()
        console.log(yourData)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommunity()
  }, [])

  const handleImage = (event) => {
    setImage(event.target.files[0])
    setImageName(event.target.files[0].name)
    setImageType(event.target.files[0].type)
    console.log(imageName, imageType)
  }

  const saveToTextile = async () => {
    try {
      // connects to ethereum & web3
      await window.ethereum.enable()
      const provider = new providers.Web3Provider(window.ethereum)
      const wallet = provider.getSigner()
      const storage = await init(wallet)

      // creates a file to save data
      const communityImage = new Blob([image], { type: 'text/plain' })
      const file = new File([communityImage], 'community.txt', {
        type: 'text/plain',
        lastModified: new Date().getTime(),
      })

      // await storage.addDeposit()
      const { cid } = await storage.store(file)
      let formattedCid = cid['/']
      return formattedCid
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(
      'clickkkkk',
      image,
      name,
      description,
      walletAddress,
      imageName,
      sportType,
    )
    try {
      setLoading(true)
      console.log(loading)

      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: name,
        description: `${description},$, ${sportType},$, ${walletAddress}`,
        image: new File([image], imageName, { type: imageType }),
      })
      console.log(
        '🚀 ~ file: RegisterCommunity.js ~ line 103 ~ handleSubmit ~ metadata',
        metadata,
      )
      if (metadata) {
        history.push('/')
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const saveToChain = async (event) => {
    event.preventDefault()

    const imageFromTextile = await saveToTextile()

    try {
      // save image to textil, get the imageURL then save imgURL and data to chain using the contract
      await contractData.methods
        .registerCommunity(
          imageFromTextile,
          name,
          description,
          sportType,
          walletAddress,
        )
        .send({ from: account })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <StylesProvider injectFirst>
      <Container
        className="root-create-pet"
        style={{ minHeight: '70vh', paddingBottom: '3rem' }}
      >
        <div>
          <Typography className="title" color="textPrimary" gutterBottom>
            Register Your Soccer Community
          </Typography>

          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="pet"
              className="img-preview"
            />
          ) : (
            ''
          )}
          <div className="form-container">
            <form className="form" noValidate autoComplete="off">
              {/* Community image */}
              <p className="image-label">Community image</p>
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
              {/* Community image */}

              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="outlined"
                className="text-field"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Short Description"
                variant="outlined"
                className="text-field"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                fullWidth
                name="petType"
                select
                label="Choose one option"
                variant="outlined"
                className="text-field"
                onChange={(e) => setsportType(e.target.value)}
                defaultValue=""
                ref={petTypeRef}
              >
                <MenuItem value="Soccer">Soccer</MenuItem>
                <MenuItem value="Basketball">Basketball</MenuItem>
                <MenuItem value="Baseball">Baseball</MenuItem>
                <MenuItem value="Voleyball">Voleyball</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Digital Wallet Address"
                variant="outlined"
                className="text-field"
                defaultValue={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />

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

export default RegisterCommunity
