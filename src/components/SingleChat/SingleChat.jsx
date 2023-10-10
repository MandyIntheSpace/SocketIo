import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Spinner,
  Text,
  Input,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import ProfileModal from "../Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../Miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import "../style.css";
import ScrollableChat from "../ScrollableChat/ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatComapre;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();
  const [socketConnection, setSocketConnection] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();

  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      console.log(message);
      setMessage(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnection(true);
    });
  }, []);

  useEffect(() => {
    fetchMessage();
    selectedChatComapre = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recived", (newMessageReceive) => {
      if (
        !selectedChatComapre ||
        selectedChatComapre._id !== newMessageReceive.chat._id
      ) {
        //givr the notification
      } else {
        setMessage([...message, newMessageReceive]);
      }
    });
  });

  const sendMessages = async (event) => {
    if (event.key === "Enter" && newMessage) {
      console.log(newMessage);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
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

        console.log(data);
        setNewMessage("");
        socket.emit("new message", data)
        setMessage([...message, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log(error.message);
      }
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
              <div className="message">
                <ScrollableChat message={message} />
              </div>
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
