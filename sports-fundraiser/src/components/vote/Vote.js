import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  StylesProvider,
  Card,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Typography,
} from '@material-ui/core'
import './Vote.css'
// use thewebamigos email
const toBecomePlayersIPFS =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRlZjk5ZThFZmFjMTdGMWI3YzA2MjIxMDM1ODg3Qjk4REE5MjJGODIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0OTU0MDA1ODg2NSwibmFtZSI6InRvQmVjb21lUGxheWVyc0lQRlMifQ.MkEGo3bsu3OQHLBa6IFFdWrbVbhId0KFGyb_VuhKsP8'

function Vote() {
  const [playersData, setPlayersData] = useState([])
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${toBecomePlayersIPFS}`,
            'Content-Type': 'application/json',
          },
        })
        cids = await cids.json()
        const temp = []
        for (let cid of cids.value) {
          if (cid?.cid) {
            let data = await fetch(
              `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
            )

            const getImage = (ipfsURL) => {
              if (!ipfsURL) return
              ipfsURL = ipfsURL.split('://')
              return 'https://ipfs.io/ipfs/' + ipfsURL[1]
            }
            data = await data.json()
            const dataArrray = data.description.split('2$,')
            data.bio = dataArrray[0]
            data.sportType = dataArrray[1]
            data.q1 = dataArrray[2]
            data.q2 = dataArrray[3]
            data.q3 = dataArrray[4]
            data.image = await getImage(data.image)
            data.cid = cid.cid
            data.created = cid.created
            temp.push(data)
          }
        }
        setPlayersData(temp)
      } catch (error) {
        console.log(error)
      }
    }
    loadPlayers()
  }, [])
  return (
    <StylesProvider injectFirst>
      <p>Vote for your favorite guest to become an Official Player</p>
      <div className="player-container">
        {playersData && playersData?.length > 0 ? (
          <List className="players-root">
            {playersData.map((player) => (
              <Card>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Player name" src={player.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <div>
                        {`Add ${player.name} as a new member?`}
                        <Button variant="contained" className="voted-btn">Yes</Button>
                        <Button variant="contained" color="secondary">No</Button>
                      </div>
                    }
                    className="listvote"
                    secondary={
                      <React.Fragment>
                        <p>
                          Created by <strong>River Side Soccer</strong>
                        </p>

                        <Typography
                          component="span"
                          variant="body2"
                          className="players-inline"
                          color="textPrimary"
                        >
                          {player.bio}
                        </Typography>

                        <p>Voting will end in 10 days</p>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Card>
            ))}
          </List>
        ) : (
          <h2>No Players yet...</h2>
        )}
      </div>
    </StylesProvider>
  )
}
export default Vote
