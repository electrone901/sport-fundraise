import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Players from '../../players/Players'
import Vote from '../../vote/Vote'
import BecomePlayer from '../../become-player/BecomePlayer'
// import RegisterCommunity from '../register-community/RegisterCommunity'
// import CommunityList from '../community-list/CommunityList'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs({ account, contractData }) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Official Players" {...a11yProps(0)} />
          {/* <Tab label="Register Community" {...a11yProps(0)} /> */}
          <Tab label="Vote for a guest to become a player" {...a11yProps(1)} />
          <Tab label="Register to become a player" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Players account={account} contractData={contractData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Vote account={account} contractData={contractData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BecomePlayer account={account} contractData={contractData} />
      </TabPanel>

      {/* <TabPanel value={value} index={1}>
        <CommunityList account={account} contractData={contractData} />
      </TabPanel> */}
    </Box>
  )
}
