import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useToast, Box } from "@chakra-ui/react";
import axios from "axios";

export default function MyChat() {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        "Content-type": "application/json",
        Authorization: `Bearer${user.token}`,
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat/access",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        bg={"white"}
        w={{ base: "100%", md: "31%" }}
        borderWidth={"lg"}
        borderRadius={"1px"}
        boxShadow='outline'
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily={"Work sans"}
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          My Chats
        </Box>
      </Box>
  );
}
