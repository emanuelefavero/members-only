import { useState, createContext } from 'react'
import axios from 'axios'

// ---------- CONTEXT ----------
const MessageContext = createContext({
  messageText: '',
  setMessageText: (text: string) => {},
  createMessage: () => {},
  messages: [],
  getMessages: () => {},
  deleteMessage: (id: string) => {},
  likeMessage: (id: string) => {},
})

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')

  // Create a new message using axios
  const createMessage = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:4000/messages',
      data: {
        text: messageText,
      },
      withCredentials: true,
    })
      .then((res) => {
        setMessageText('')
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Get all messages using axios
  const getMessages = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/messages',
      withCredentials: true,
    })
      .then((res) => {
        setMessages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Delete a message using axios
  const deleteMessage = (id: string) => {
    axios({
      method: 'DELETE',
      url: `http://localhost:4000/messages/${id}`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data)
        getMessages()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Increase the likes count of a message and limit to 1 like per user
  const likeMessage = async (id: string) => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user',
    })
      .then((res) => {
        if (res.data) {
          setUsername(res.data.username)
        } else {
          setUsername('')
        }
      })
      .then(() => {
        axios.put(`http://localhost:4000/messages/${id}/like`, {
          username: username,
        })
      })
  }

  // -------- RETURN --------
  return (
    <MessageContext.Provider
      value={{
        messageText,
        setMessageText,
        messages,
        createMessage,
        getMessages,
        deleteMessage,
        likeMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export default MessageContext
