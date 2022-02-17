
import * as React from "react";
import {
    Typography,
    Button,
    Box,
    Toolbar,
    IconButton,
    AppBar,
    Badge,
    ClickAwayListener,
    Popper,
    Grow,
    Paper,
    MenuList,
    MenuItem,
} from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";




//TODO: Implement Cart System
export default function TopBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{backgroundColor: "#F3D9DC", color: "#C78283"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ShopIt
                    </Typography>
                    <IconButton 
                    color="inherit"
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    >
                        <Badge badgeContent={1} color="error">                            
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <Popper
                </Toolbar>
            </AppBar>
      </Box>
    );
}