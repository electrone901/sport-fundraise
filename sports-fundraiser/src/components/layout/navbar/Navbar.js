import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import { StylesProvider } from '@material-ui/core/styles'
import './Navbar.css'
import logo from '../../../images/logo1.png'
import UAuth from '@uauth/js'

export const Navbar = withRouter(
  ({ account, connectWallet, getBalance, setGreeting, sendTip, balance }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const [udUser, setudUser] = useState('')


    const uauth = new UAuth({
      clientID: 'febba860-f127-4466-89b8-b4c2734c840f',
      redirectUri: 'http://localhost:3000',
    })
    const unstoppableDomainsLogin = async () => {
      try {
        const authorization = await uauth.loginWithPopup()
        const currentUser = authorization.idToken.sub
        setudUser(currentUser)
      } catch (error) {
        console.error(error)
      }
    }
    const unstoppableDomainsLogout = () => {
      console.log('logging out!')
      uauth.logout().catch((error) => {
        console.error('profile error:', error)
      })
      setudUser('')
    }

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
      setAnchorEl(null)
      handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget)
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    )

    return (
      <StylesProvider injectFirst>
        <div className="grow">
          <AppBar position="static">
            <Toolbar className="toolbar">
              <Link to="/" className="whiteLink">
                <img src={logo} alt="logo" className="logo" />
              </Link>
              <Link to="/" className="whiteLink">
                <Typography className="title" variant="h6" noWrap>
                  Sport Fundraiser
                </Typography>
              </Link>

              {/* <Button className="whiteLink" component={Link} to="/">
              Home
            </Button> */}
              <Button className="whiteLink" component={Link} to="/">
                Fundraisers
              </Button>
              <Button
                className="whiteLink"
                component={Link}
                to="/register-community"
              >
                Register
              </Button>

              <a
                href="https://staging-global.transak.com/?apiKey=72034f95-2aef-4ca8-855e-7abc98e0a117"
                target="_blank"
                rel="noopener noreferrer"
                className="whiteLink"
              >
                transak
              </a>

              {/* <Button className="whiteLink" component={Link} to="/create-pet">
              CreateNFTs
            </Button> */}

              <div className="grow" />
              <div className="sectionDesktop">
                {account ? (
                  <>
                    <Button className="whiteLink">
                      {account.substring(0, 8)}...{account.substring(32, 24)}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      className="connect-wallet-btn p-l-2"
                      onClick={() => {
                        connectWallet()
                      }}
                    >
                      Login with zksync
                    </Button>
                    <Button
                      variant="contained"
                      className="connect-wallet-btn-ud"
                      onClick={() => {
                        unstoppableDomainsLogin()
                      }}
                    >
                      Login with UD
                    </Button>
                  </>
                )}
                {udUser ? <Button className="whiteLink">{udUser}</Button> : ''}
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className="sectionMobile">
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </StylesProvider>
    )
  },
)
