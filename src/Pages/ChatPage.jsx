import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import MyChat from "../components/MyChat/MyChat";
import ChatBox from "../components/ChatBox/ChatBox";

export default function ChatPage() {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        padding={"10px"}
        h={'91.5vh'}
      >
        {user && <MyChat />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}
