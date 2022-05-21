import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  StylesProvider,
  Card,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core'
import './Players.css'
const playersIPFS =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJFOGY5MWZENTJmMGI4MTRGN2ZFNjdkNzcyQTJDRjE0RjkyNTU0ODgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NDEyMzU4MTM4NywibmFtZSI6InVwY29taW5nIHNwb3J0cyBzdGFycyJ9.gQARtoKY3enVMwL35t5FjGRjvb_q2jWFujVMAAq7X6U'

function Players() {
  const [playersData, setPlayersData] = useState([])

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        let cids = await fetch('https://api.nft.storage', {
          headers: {
            Authorization: `Bearer ${playersIPFS}`,
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

  // bio: "Was born, 24 June 2002 in Rosario, Argentina to a working-class family. His father was a factory steel worker, and his mother a cleaner. He began playing from an early age, and his talent was soon apparent. However, at the age of 11, Messi was diagnosed with growth hormone deficiency (GHD)., Soccer "
  // cid: "bafyreiarzxlfe5vpdxibbiiy3m4jqy2z2rg5yk4pl7ver3wbmw4ieg4i5e"
  // created: "2022-03-21T21:18:10.197+00:00"
  // description: "Was born, 24 June 2002 in Rosario, Argentina to a working-class family. His father was a factory steel worker, and his mother a cleaner. He began playing from an early age, and his talent was soon apparent. However, at the age of 11, Messi was diagnosed with growth hormone deficiency (GHD)., Soccer 2$, Football 2$, I want to play for my dream team. I have always dreamt of becoming a sports star and this is a great time for me to accomplish my dream.2$ , I will train everyday until I become a professional player. 2$, I strongly believe in my dream. Every career has its barriers to entry but I will pass those barriers and become what I want."
  // image: "https://ipfs.io/ipfs/bafybeigxxzzvzqjmbvucpqrbipnw2oqpl6u35wwes4ln3uu7umjwfd3xxq/IMG-20220316-WA0033.jpg"
  // name: "William"
  return (
    <StylesProvider injectFirst>
      <div className="player-container">
        {playersData && playersData?.length > 0 ? (
          <List className="players-root">
            {playersData.map((player) => (
              <Card>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Player name"
                      src={player.image}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className="players-inline"
                          color="textPrimary"
                        >

                        </Typography>
                        {player.bio}
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

export default Players
