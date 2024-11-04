import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const subjects = [
  { label: 'Physics' },
  { label: 'Mathematics' },
  { label: 'Quantitative Biology' },
  { label: 'Computer Science' },
  { label: 'Quantitative Finance' },
  { label: 'Statistics' },
  { label: 'Electrical Engineering and Systems Science' },
  { label: 'Economics' },
  { label: 'Search All'}
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Scholarly Insight
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        <Toolbar />
        {/* Search and Subject Selection Section */}
        <Container>
          {/* Centered search box with button */}
          <Box display="flex" justifyContent="center" sx={{ marginTop: 3, marginBottom: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: 600, width: '100%' }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                sx={{ marginRight: 1 }}
              />
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Box>
          </Box>

          {/* Centered options box */}
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
            {/* Left side text */}
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              Subject search and browse
            </Typography>

            {/* Autocomplete dropdown with subject options */}
            <Autocomplete
              disablePortal
              options={subjects}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Subject" />}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default DrawerAppBar;