import * as React from 'react';
import {
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer
} from "@mui/material";

import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export default function WishlistDrawer({isDrawerOpen, setIsDrawerOpen}: {isDrawerOpen: boolean, setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    // const { window } = props;
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    // const toggleDrawer = () => {
    //     // setMobileOpen(!mobileOpen);
    //     setIsDrawerOpen(!isDrawerOpen);
    // };

    return (
        <div>
            <Drawer
                anchor={"right"}
                open={isDrawerOpen}
                onClose={()=> setIsDrawerOpen(false)}
            >
                Test
            </Drawer>
        </div>
    );
};