import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InfoIcon from "@mui/icons-material/Info";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAccessToken } from "../redux/actions/userActions";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            OWASP
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        open={open}
      >
        <DrawerHeader sx={{ padding: 0, margin: 0 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
            }}
          >
            <Box
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <AcUnitIcon
                sx={{ width: "100%", height: "100%", color: "#003A75" }}
              />
            </Box>
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavList />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}

function NavList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navBar = [
    [
      {
        title: "Home",
        icon: <HomeIcon />,
        visibility: "always",
        clickHandler: () => navigate("/"),
      },
      {
        title: "Dashboard",
        clickHandler: () => navigate("/dashboard"),
        icon: <DashboardIcon />,
        visibility: "loggedIn",
      },
    ],
    [
      {
        title: "About",
        clickHandler: () => navigate("/about"),
        icon: <InfoIcon />,
        visibility: "always",
      },
      {
        title: "Help",
        clickHandler: () => navigate("/help"),
        icon: <HelpIcon />,
        visibility: "always",
      },
    ],
    [
      {
        title: "Logout",
        clickHandler: () => dispatch(removeAccessToken()),
        icon: <LogoutIcon />,
        visibility: "loggedIn",
      },
      {
        title: "Login",
        clickHandler: () => navigate("/login"),
        icon: <LoginIcon />,
        visibility: "loggedOut",
      },
      {
        title: "Register",
        clickHandler: () => navigate("/register"),
        icon: <AppRegistrationIcon />,
        visibility: "loggedOut",
      },
    ],
  ];

  const getNavBar = () => {
    return navBar.map((subNav) =>
      subNav
        .map((nav) => {
          if (nav.visibility === "always") return nav;
          if (nav.visibility === "loggedIn" && user.isLoggedIn) return nav;
          if (nav.visibility === "loggedOut" && !user.isLoggedIn) return nav;
          return null;
        })
        .filter(Boolean)
    );
  };
  return (
    <React.Fragment>
      {getNavBar().map((subNavBar, navBarIdx) => {
        return (
          <React.Fragment key={`navbar-${navBarIdx + 1}`}>
            <List>
              {subNavBar.map((nav, navIdx) => (
                <ListItem key={`nav-item-${navIdx}`} disablePadding>
                  <ListItemButton onClick={nav.clickHandler}>
                    <ListItemIcon>{nav.icon}</ListItemIcon>
                    <ListItemText>{nav.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {navBarIdx + 1 < navBar.length ? <Divider /> : <></>}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}
