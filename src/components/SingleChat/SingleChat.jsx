import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Spinner,
  Text,
  Input,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import ProfileModal from "../Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../Miscellaneous/UpdateGroupChatModal";
import axios from "axios";

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();

  const { user, selectedChat, setSelectedChat } = ChatState();
  const sendMessages = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorizaton: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/message/storeMessage",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setNewMessage("");
        setMessage([...message, data]);
      } catch (error) {}
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            ></IconButton>

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                }
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"1g"}
            overflow={"hidden"}
            // Messages Here
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                justifyItems={"center"}
                margin={"auto"}
              />
            ) : (
              <div>{/* message */}</div>
            )}

            <FormControl onKeyDown={sendMessages} isRequired mt={3}>
              <Input
                placeholder="Enter a message"
                bg={"#E0E0E0"}
                variant={"filled"}
                onChange={typingHandler}
                value={newMessage}
              ></Input>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"2xl"} pb={3} fontFamily={"Work sans"}>
            Click on user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}
