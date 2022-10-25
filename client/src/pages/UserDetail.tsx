import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

// function Home({ user, logout }: Props) {
function Home() {
  const { user, registeredSince, getRegisteredSince, getTimeFrame } =
    useContext(UserContext)

  useEffect(() => {
    getRegisteredSince()
    getTimeFrame()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div>
        {user ? (
          <>
            <h1>@{user.username}</h1>
            <div>
              <h5>{user.fullName}</h5>
              {/* <p>{user.email}</p> */}
              <a href={`mailto:${user.email}`}>Contact</a>
              <h3>{user.membership ? '👁' : ''}</h3>
              <code>Registered: {registeredSince}</code>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Home
