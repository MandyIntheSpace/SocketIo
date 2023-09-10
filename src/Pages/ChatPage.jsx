import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChatPage() {

    const [chats, setChats] = useState([])

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:5000/api/chat")
        setChats(data)
        console.log(`The value of data is 
                        ${data}`)
    }

    useEffect(() => {
        fetchData()
    }, [])
    
  return (
    <div>
        {chats.length < 5 ? (
            <p>The data is too low</p>
        ) : (
            chats.map((chat, id) => (
                <div key={chat.id}>{chat.chatName}</div>
            ))
        )}
    </div>
  )
}
