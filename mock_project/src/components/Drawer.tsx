import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import { ColorLens } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import { drawerStyles } from "./style";

const Drawer = () => {
  const navigate = useNavigate()
  const handleNavigation = (route: string) => {
    navigate(route)
  }
  const menuItems = [
    { text: "Products", route: "/products", icon: <ShoppingCartIcon /> },
    { text: "Categories", route: "/categories", icon: <ListIcon /> },
    { text: "Colors", route: "/colors", icon: <ColorLens /> },
  ];
  return (
    <div style={{ display: "flex" }}>
      <Box style={drawerStyles}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Outlet />
    </div>
  )
}

export default Drawer