import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  List,
  Button,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Logo2 from "../logo/Logo2.png";
import Logo3 from "../logo/Logo3.png";
import Logo1 from "../logo/Logo1.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ backgroundColor: "#3273e3", height: "100vh" }}
    >
      <div className="w-24 p-2">
        <img src={Logo3} style={{ flexGrow: 1 }} />
      </div>

      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate("/home")}>
            <ListItemIcon></ListItemIcon>
            <ListItemText sx={{ color: "white" }}>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/projects")}>
            <ListItemIcon></ListItemIcon>
            <ListItemText sx={{ color: "white" }}>Projects</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/teams")}>
            <ListItemIcon></ListItemIcon>
            <ListItemText sx={{ color: "white" }}>Teams</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemIcon></ListItemIcon>
            <ListItemText sx={{ color: "white" }}>Dashboard</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const drawerWidth = 200;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: "#3273e3" }}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <img src={Logo3} className="w-24" />
            <p className="italic text-white">project management platform.</p>
          </Grid>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "white" }} onClick={() => navigate("/home")}>
              Home
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => navigate("/projects")}
            >
              Projects
            </Button>
            <Button sx={{ color: "white" }} onClick={() => navigate("/teams")}>
              Teams
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <Button sx={{ color: "white" }}>Profile</Button>
          </Box>

          <Grid sx={{ display: { xs: "block", sm: "none" } }}>
            <img src={Logo3} className="w-24" />
          </Grid>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          //container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
