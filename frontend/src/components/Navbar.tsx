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
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Logo2 from "../logo/Logo2.png";
import Logo3 from "../logo/Logo3.png";
import Logo1 from "../logo/Logo1.png";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCookies } from "react-cookie";
import axios from "axios";
import EditProfile from "../modal/EditProfile.js";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cookies, setCookie, removeCookies] = useCookies();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const navigate = useNavigate();

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ backgroundColor: "#3273e3", height: "100vh" }}
    >
      <div className="w-24 p-2">
        <img
          src={Logo3}
          style={{ flexGrow: 1 }}
          onClick={() => navigate("/home")}
        />
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
        <ListItem>
          <ListItemButton onClick={() => navigate("/history")}>
            <ListItemIcon></ListItemIcon>
            <ListItemText sx={{ color: "white" }}>History</ListItemText>
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
            <img
              src={Logo3}
              className="w-24"
              style={{ flexGrow: 1 }}
              onClick={() => navigate("/home")}
            />
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
            <Button
              id="profile-button"
              aria-control={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ color: "white" }}
            >
              Profile
            </Button>
          </Box>

          <Menu
            id="profile-menu"
            open={open}
            anchorEl={anchor}
            MenuListProps={{
              "aria-labelledby": "resources-button",
            }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <EditProfile />
            </MenuItem>

            <MenuItem>
              <Button
                onClick={() => {
                  handleClose();
                  navigate("/history");
                }}
                sx={{ color: "black" }}
              >
                History
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                onClick={() => {
                  handleClose();
                  removeCookies("Token");
                }}
                sx={{ color: "black" }}
              >
                Log out
              </Button>
            </MenuItem>
          </Menu>

          <Grid sx={{ display: { xs: "block", sm: "none" } }}>
            <img
              src={Logo3}
              className="w-24"
              onClick={() => navigate("/home")}
            />
            <p className="italic text-white">project management platform.</p>
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
