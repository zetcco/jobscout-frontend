import { Box, Drawer, IconButton, Modal, Toolbar, useTheme } from "@mui/material";
import React, { useState } from "react";
import { NewChat } from "./NewChat";
import { Conversations } from "./Conversations";
import Conversation from "./Conversation";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";

const drawerWidth = 300;

const ConversationMessaging = () => {

    const [ mobileOpen, setMobileOpen ] = useState(true)

    const [ newChatOpen, setNewChatOpen ] = useState(false);

    const { mixins: { toolbar } } = useTheme()

    return (
        <>
        <Box display={'flex'}>
            <Box sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Toolbar/>
                    <Conversations/>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                    <Toolbar/>
                    <Conversations/>
                </Drawer>
            </Box>
            <Modal
                open={newChatOpen}
                onClose={() => setNewChatOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <NewChat onClose={() => setNewChatOpen(false)}/>
            </Modal>
            <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ 
                    display: { sm: 'none' },
                    position: 'absolute',
                    zIndex: 9999,
                    top: `${toolbar?.minHeight}px`,
                    left: '14px'
                }}
            >
                <ArrowBackIosNewOutlined/>
            </IconButton>
            <Conversation/>
        </Box>
        </>
    );
};

export default ConversationMessaging;
