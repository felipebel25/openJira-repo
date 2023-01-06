import { useContext } from "react";
import { InboxOutlined, MailLockOutlined } from "@mui/icons-material";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { UIContext } from "../../../context/ui";


const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts', 'sss', 'asds', 'asdsa']

export const SideBar = () => {
    const {  closeSideMenu, sideMenuOpen } = useContext(UIContext)

    return (
        <Drawer
            anchor="left"
            open={sideMenuOpen}
            onClose={ closeSideMenu}
        >
            <Box sx={{ width: 250 }}>
                <Box
                    sx={{ padding: "5px 10px" }}
                >
                    <Typography variant="h4">Menu</Typography>
                </Box>
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem button key={text} >
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlined /> : <MailLockOutlined />}
                            </ListItemIcon>
                            <ListItemText primary={text}></ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem button key={text} >
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlined /> : <MailLockOutlined />}
                            </ListItemIcon>
                            <ListItemText primary={text}></ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
