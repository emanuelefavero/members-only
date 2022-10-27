import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import MessageContext from '../context/MessageContext'
import { FaHeart } from 'react-icons/fa'

function Home() {
  const { user, timeFrame, getTimeFrame } = useContext(UserContext)
  const {
    messageText,
    setMessageText,
    messages,
    createMessage,
    getMessages,
    deleteMessage,
    likeMessage,
  } = useContext(MessageContext)

  useEffect(() => {
    getTimeFrame()
    getMessages()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <>
      <div>
        {user ? (
          <>
            <h1>
              Welcome back, <Link to='/profile'>@{user.username}</Link>
            </h1>

            <div>
              <h3>Whispering Since {timeFrame}</h3>
            </div>

            {/* CREATE NEW MESSAGE */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createMessage()
                // navigate('/')
              }}
              className='new-message'
            >
              <textarea
                onChange={(e) => setMessageText(e.target.value)}
                value={messageText}
                placeholder='message...'
                minLength={1}
                required
              ></textarea>
              <button type='submit'>Add Message</button>
            </form>
          </>
        ) : null}
      </div>
      <div>
        {/* MESSAGES */}
        {messages.map((message: any) => {
          return (
            <div className='message' key={message._id}>
              <h4
                style={
                  message.user === user?.username
                    ? { color: 'rgb(75, 255, 47)' }
                    : { color: 'rgb(135, 57, 244)' }
                }
                className='author'
              >
                {message.user}
              </h4>
              <p className='text'>{message.text}</p>

              {/* Like Button */}
              <div className='like-button-container'>
                <button
                  className='like-button'
                  onClick={() => likeMessage(message._id)}
                >
                  <FaHeart className='heart' />
                </button>
                <span className='likes'>{message.likes}</span>
              </div>

              {/* Delete Button */}
              {message.user === user?.username ? (
                <div className='delete-button-container'>
                  <button
                    className='delete-button'
                    onClick={() => {
                      deleteMessage(message._id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
