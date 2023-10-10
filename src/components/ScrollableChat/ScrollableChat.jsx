import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../config/ChatLogic";
import { ChatState } from "../../context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
export default function ScrollableChat({ message }) {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {message &&
        message.map((m, index) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(message, m, index, user._id) ||
              isLastMessage(message, index, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `
                ${m.sender._id === user._id ? "#BEE3F8" : "pink"}`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(message, m, index, user._id),
                marginTop: isSameUser(message, m, index, user._id) ? 10 : 3
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}
