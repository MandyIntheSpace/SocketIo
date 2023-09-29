import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        setUser(userInfo);
      } catch (error) {
        console.log(`Error parsing userIngo: ${error.message}`);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const ChatState = () => {
  return useContext(ChatContext);
};
