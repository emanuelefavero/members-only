import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

// function Home({ user, logout }: Props) {
function Home() {
  const { user, timeFrame, getTimeFrame } = useContext(UserContext)

  useEffect(() => {
    // getRegisteredSince()
    getTimeFrame()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          </>
        ) : null}
      </div>
    </>
  )
}

export default Home
