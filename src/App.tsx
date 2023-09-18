import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Routes, Route } from 'react-router-dom'
import TextTransition, { presets } from 'react-text-transition';
import Link from '@mui/material/Link';


import EmpPage from './Components/Pages/EmpPage';
import LogInPage from './Components/Pages/LogInPage';
import KlaPage from './Components/Pages/KlaPage';
import KlbPage from './Components/Pages/KlbPage';
import KlcPage from './Components/Pages/KlcPage';
import ComplaintListPage from './Components/Pages/ComplaintListPage';
import NewRecPage from './Components/Pages/NewRecPage';
import ListMenu from './Data/MenuData';
import RegisterItemsPage from './Components/Pages/RegisterItemsPage';
import { MatrixRainV12 } from './Components/Pages/MatrixFinal';
import { useEffect, useState } from 'react';
import ProfilePage from './Components/Pages/ProfilePage';

import * as randomstring from "randomstring";
// import { useLocalStorage } from './Data/useLocalStorage';
import Grid from '@mui/material/Grid';
import { BsList, BsFillPersonVcardFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function getUserInfo() {
  const tokenString = sessionStorage.getItem('json');
  const userToken = JSON.parse(tokenString!);
  return userToken
}


const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function App() {

  const getUser = getUserInfo();
  // if (getUser != null) {
  //   window.location.href = 'Login';
  // }


  const theme = useTheme();
  // const [userInfo] = useLocalStorage("json", []);
  const [open, setOpen] = useState(true);

  const TEXTS = ['KSN', 'KRITSANA', 'WATHANIYANON', 'DING', 'TRACE BACK SYSTEM', 'KSN COMEBACK'];
  const [index, setIndex] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openRight = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      1000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: "#494949", }}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ width: "1" }}>
            <Typography variant="h6" noWrap component="div" >
              <TextTransition springConfig={presets.wobbly} >{TEXTS[index % TEXTS.length]}</TextTransition>
            </Typography >

          </Box>

          {getUser != null && <Button
            id="basic-button"
            aria-controls={openRight ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openRight ? 'true' : undefined}
            onClick={handleClick}
          >
            <Typography variant="h4" style={{ color: '#FFF', letterSpacing: '0.2rem', fontWeight: 'bold', }}>
              <BsFillPersonVcardFill />
            </Typography>
          </Button>}

          {getUser != null && <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openRight}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {/* <MenuItem onClick={() => {
              window.location.href = 'Kla';
            }}>Register Complaint mode</MenuItem>
            <MenuItem onClick={() => {
              window.location.href = 'RegisterItems';
            }}>Register Data item</MenuItem> */}
            <MenuItem onClick={() => {
              window.location.href = 'Profile';
            }}>Profile</MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              sessionStorage.clear();
              window.location.href = 'login';
            }}>Logout</MenuItem>
          </Menu>}





        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{
        sx: {
          backgroundColor: "#424242",
          color: "#FFF",
        }
      }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: '#FFF' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ListMenu.map((data, index) => (


            <Link href={data.href} underline="none" color="inherit" key={data.key} >

              <ListItem key={data.title} disablePadding sx={{ display: 'block' }} >

                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}

                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {data.ico}
                  </ListItemIcon>

                  <ListItemText primary={<Typography variant="h6" >{data.title}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>


          ))}
        </List>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="dark" style={{

        minHeight: '100vh'


      }}>
        <DrawerHeader />
        <Routes>
          <Route path='*' element={<MatrixRainV12 />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/Kla' element={<KlaPage />} />
          <Route path='/Klb' element={<KlbPage />} />
          <Route path='/Klc' element={<KlcPage />} />
          <Route path='/RegisterItems' element={<RegisterItemsPage />} />
          <Route path='/ComplaintList' element={<ComplaintListPage />} />
          <Route path='/NewRec' element={<NewRecPage />} />
          <Route path='/Profile' element={<ProfilePage />} />




          {/* <Route path='/LoginPage' element={<LoginPage />} />
          <Route path='/page_a' element={<Page_A />} />
          <Route path='/page_b' element={<Page_B />} />
          <Route path='/page_d' element={<Page_D />} />
          <Route path='/page_e' element={<Page_E />} />
          <Route path='/page_f' element={<Page_F />} />
          <Route path='/page_g' element={<Page_G />} />
          <Route path='/page_h' element={<Page_H />} />
          <Route path='/RegisterComplaintMode' element={<RegisterComplaintMode />} />
          <Route path='/RegisterDataItems' element={<RegisterDataItems />} /> */}






          {/* <Route path='/topics' element={<Topics />} />
              <Route path='/settings' element={<Settings />} /> */}
        </Routes>

      </Box>
    </Box >
  );
}

export default App;
