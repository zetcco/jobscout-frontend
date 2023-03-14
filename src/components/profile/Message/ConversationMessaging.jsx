import { Box, Drawer, Modal, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { NewChat } from "./NewChat";
import { Conversations } from "./Conversations";
import Conversation from "./Conversation";

const drawerWidth = 300;

const ConversationMessaging = () => {

    const [ mobileOpen, setMobileOpen ] = useState(true)

    const [ newChatOpen, setNewChatOpen ] = useState(false);

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
                    <Conversations setNewChatOpen={setNewChatOpen}/>
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
                    <Conversations setNewChatOpen={setNewChatOpen}/>
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
            <Conversation/>
        </Box>
        </>
    );
};

export default ConversationMessaging;
