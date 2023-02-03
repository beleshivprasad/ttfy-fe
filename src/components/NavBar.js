import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// Icons
import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { useNavigate } from "react-router-dom";

export default function Drawer() {
  const isLoggedIn = false;
  const navBar = [
    [
      { title: "Home", route: "", icon: <HomeIcon />, isProtected: false },
      {
        title: "Dashboard",
        route: "dashboard",
        icon: <DashboardIcon />,
        isProtected: true,
      },
    ],
    [
      {
        title: "About",
        route: "about",
        icon: <InfoIcon />,
        isProtected: false,
      },
      { title: "Help", route: "help", icon: <HelpIcon />, isProtected: false },
    ],
    [
      { title: "Logout", route: "", icon: <LogoutIcon />, isProtected: true },
      {
        title: "Login",
        route: "login",
        icon: <LoginIcon />,
        isProtected: false,
      },
      {
        title: "Register",
        route: "register",
        icon: <AppRegistrationIcon />,
        isProtected: false,
      },
    ],
  ];
  const [showDrawer, setShowDrawer] = React.useState(false);
  const navigate = useNavigate();

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={() => setShowDrawer(!showDrawer)}
      onKeyDown={() => setShowDrawer(!showDrawer)}
    >
      {navBar.map((subNavBar, navBarIdx) => {
        return (
          <React.Fragment key={`navbar-${navBarIdx + 1}`}>
            <List style={{ padding: 0 }}>
              {subNavBar.map((nav, navIdx) => {
                return isLoggedIn === nav.isProtected ? (
                  <ListItem
                    key={`nav-item-${navIdx}`}
                    style={{
                      paddingBottom: 2,
                      paddingTop: 2,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${nav.route}`);
                      }}
                    >
                      <ListItemIcon>{nav.icon}</ListItemIcon>
                      <ListItemText>{nav.title}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ) : null;
              })}
            </List>
            {navBarIdx + 1 < navBar.length ? <Divider /> : <></>}
          </React.Fragment>
        );
      })}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: "gray" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setShowDrawer(!showDrawer)}
              >
                <MenuIcon /> <Typography ml={1}>Menu</Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            anchor={"left"}
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            onOpen={() => setShowDrawer(true)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AcUnitIcon
                fontSize="larger"
                style={{
                  width: "80",
                  height: "80px",
                  color: "#003A75",
                  padding: 10,
                }}
              />
            </Box>
            {list()}
          </SwipeableDrawer>
        </Box>
      </React.Fragment>
    </div>
  );
}
