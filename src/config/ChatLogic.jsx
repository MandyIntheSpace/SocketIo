export const getSender = (loggedUser, users) => {
  // return users[0]._id === loggedUser._id ? users[1].name : users[0].name
  if (!Array.isArray(users) || users.length < 2) {
    return "Unknown";
  }

  if (users[0]._id === loggedUser._id) {
    return users[1].name;
  } else {
    return users[0].name;
  }
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (message, m, index, userId) => {
  return (
    index < message.length - 1 &&
    (message[index + 1].sender._id !== m.sender._id ||
      message[index + 1].sender._id === undefined) &&
    message[index].sender._id !== userId
  );
};

export const isLastMessage = (message, index, userId) => {
  return (
    index === message.length - 1 &&
    message[message.length - 1].sender._id !== userId &&
    message[message.length - 1].sender._id
  );
};

export const isSameSenderMargin = (message, m, index, userId) => {
  if (
    index < message.length - 1 &&
    message[index + 1].sender._id === m.sender_id &&
    message[index].sender._id !== userId
  )
    return 33;
  else if (
    (index < message.length - 1 &&
      message[index + 1].sender._id !== m.sender._id &&
      message[index].sender._id !== userId) ||
    (index === message.length - 1 && message[index].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (message, m, index) => {
  return index > 0 && message[index - 1].sender._id === m.sender._id
}
