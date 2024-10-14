import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListIcon from '@mui/icons-material/List';
import { ColorLens } from "@mui/icons-material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { drawerStyles } from "./style";
import { useSelector } from "react-redux";


const Drawer = () => {
  const navigate = useNavigate()
  const auth = useSelector((state: any) => state.auth)

  const menuItems = [
    { text: "Products", route: "/products", icon: <ShoppingCartIcon /> },
    { text: "Categories", route: "/categories", icon: <ListIcon /> },
    { text: "Colors", route: "/colors", icon: <ColorLens /> },
  ];
  
  const handleNavigation = (route: string) => {
    navigate(route)
  }
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace={true}/>
  }

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