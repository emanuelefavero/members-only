import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import MessageContext from '../context/MessageContext'

// function Home({ user, logout }: Props) {
function Home() {
  const { user, timeFrame, getTimeFrame } = useContext(UserContext)
  const { messageText, setMessageText, messages, createMessage, getMessages } =
    useContext(MessageContext)

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
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
