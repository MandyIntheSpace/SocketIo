export const getSender = (loggedUser, users) => {
    // return users[0]._id === loggedUser._id ? users[1].name : users[0].name
    if (!Array.isArray(users) || users.length < 2) {
        return "Unknown"
    }

    if (users[0]._id === loggedUser._id) {
        return users[1].name
    } else{
        return users[0].name
    }
 }