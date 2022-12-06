import * as React from "react";
import {
  AppBar,
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 200;

function DrawerAppBar({ menuItems, scrollTo }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = async () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Menu App
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item}
            onClick={async () => {
              await handleDrawerToggle();
              scrollTo(item);
            }}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ display: "block" }}>
          Menu App
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: "100%",
            justifyContent: "center",
            position: "absolute",
            left: 0,
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item}
              sx={{
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
              onClick={() => scrollTo(item)}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <Box component="nav">
        <Drawer
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
      </Box>
    </AppBar>
  );
}

export default DrawerAppBar;
