"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import DDLogo from "./DDLogo";
import { User, useUserContext } from "@/context/UserContext";
import AuthenticationDialog from "./AuthenticationDialog";

const pages = [{label: "Discover", link: "/discover"}, {label: "Surprise", link: "/surprise"}, {label: "Connect", link: "/connect"}, {label: "Challenge", link: "/challenge"}];
const settings = [{label: "Profile", link: "/profile", onClick: undefined}, {label: "Dashboard", link: "/dashboard", onClick: undefined}];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [authModal, setAuthModal] = React.useState({open: false, showLogin: true});

    const {currentUser, handleUpdateUser, isLoggedIn} = useUserContext();
    const loggedInSettings = [...settings, {label: 'Logout', link: undefined, onClick: () => handleUpdateUser({} as User)}];
    const loggedOutSettings = ['Login', 'Register'];

    const handleShowAuthModal = (page: string) => {
        setAuthModal({open: !authModal.open, showLogin: page == 'Login'});
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userProfileLinks = isLoggedIn ? loggedInSettings.map((setting) => (
        <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
            <Typography component={Link} href={setting.link || '#'} onClick={setting.onClick} textAlign="center">{setting.label}</Typography>
        </MenuItem>
    ) ) : loggedOutSettings.map(setting => (
        <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography component={Link} href="#" onClick={() => handleShowAuthModal(setting)} textAlign="center">{setting}</Typography>
        </MenuItem>
    ))    

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{justifyContent:"space-between"}}>
                    {/* mobile menu toggle and dropdown */}
                    <Box sx={{display: {xs: "flex", md: "none"}}}>
                        <IconButton
                            size="large"
                            aria-label="Main Menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: {xs: "block", md: "none"} }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" color="#d8d8d8">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* logo and title for both mobile and desktop */}
                    <Typography variant="h2" component={Link} href="/" sx={{
                            mr: 2,
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                        }}>
                        <DDLogo alt="Dragonfly Destinations" wings="#c49a6c88" body="#505E9Baa"/>
                        Dragonfly Destinations
                    </Typography>

                    {/* desktop menu links */}
                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex", justifyContent: 'center'}}}>
                        {pages.map((page) => (
                            <Typography component={Link} color="primary.contrastText"
                                key={page.link} href={page.link}
                                sx={{m: 2, display: "block"}}>
                                {page.label}
                            </Typography>
                        ))}
                    </Box>

                    {/* right menu user options - replace with Login link if no logged-in user */}
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                {currentUser && isLoggedIn ? <Avatar alt={currentUser.userName} src={currentUser.profilePhoto} /> : 
                                    <Avatar alt="No User" src="/nouser.png" /> }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: "45px"}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userProfileLinks}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <AuthenticationDialog isOpen={authModal.open} isLogin={authModal.showLogin} handleClose={() => setAuthModal({open: false, showLogin: false})}/>
        </AppBar>
    );
}

export default NavBar;
