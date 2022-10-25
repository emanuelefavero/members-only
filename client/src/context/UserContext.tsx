import { useState, createContext } from 'react'
import axios from 'axios'

// ---------- INTERFACES ----------
import UserInterface from '../interfaces/UserInterface'

// ---------- CONTEXT ----------
const UserContext = createContext({
  user: {} as UserInterface | null,
  registerUsername: '',
  setRegisterUsername: (username: string) => {},
  registerPassword: '',
  setRegisterPassword: (password: string) => {},
  registerEmail: '',
  setRegisterEmail: (email: string) => {},
  registerFullName: '',
  setRegisterFullName: (email: string) => {},
  // registerRole: '',
  // setRegisterRole: (email: string) => {},
  // registerMembership: false,
  // setRegisterMembership: (membership: boolean) => {},
  // registerCreatedAt: new Date(),
  // setRegisterCreatedAt: (createdAt: Date) => {},

  loginUsername: '',
  setLoginUsername: (username: string) => {},
  loginPassword: '',
  setLoginPassword: (password: string) => {},

  register: () => {},
  login: () => {},
  logout: () => {},
  getUser: () => {},

  registeredSince: '',
  setRegisteredSince: (registeredSince: string) => {},
  timeFrame: '',
  setTimeFrame: (timeFrame: string) => {},
  getRegisteredSince: () => {},
  getTimeFrame: () => {},
})

// const UserContext = createContext<UserContextInterface>({})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerFullName, setRegisterFullName] = useState('')
  // const [registerRole, setRegisterRole] = useState('')
  // const [registerMembership, setRegisterMembership] = useState(false)
  // const [registerCreatedAt, setRegisterCreatedAt] = useState(new Date())

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        fullName: registerFullName,
        // role: registerRole,
        // membership: registerMembership,
        // createdAt: registerCreatedAt,
      },
      withCredentials: true,
      url: 'http://localhost:4000/register',
    }).then((res) => console.log(res.data))
  }

  const login = async () => {
    await axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login',
    }).then((res) => {
      console.log(res.data)

      // setUser(res.data)
      // window.location.reload()
    })
  }

  const logout = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout',
    }).then((res) => {
      setUser(null)

      // console.log(res.data)
      // window.location.reload()
    })
  }

  const getUser = async () => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user',
    }).then((res) => {
      if (res.data) {
        setUser(res.data)
      } else {
        setUser(null)
      }

      // setUser(res.data)
      // console.log(res.data)
    })
  }

  // User Date and Time
  const [registeredSince, setRegisteredSince] = useState('')
  const [timeFrame, setTimeFrame] = useState('')

  const getRegisteredSince = (): void => {
    const date = new Date(user?.createdAt || '')
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    setRegisteredSince(`${month} ${day}, ${year}`)
  }

  const getTimeFrame = (): void => {
    const date = new Date(user?.createdAt || '')
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    })
    const minute = date.getMinutes()
    const currentMinute = new Date().getMinutes()
    const hour = date.getHours()
    const currentHour = new Date().getHours()
    const day = date.getDate()
    const currentDay = new Date().getDate()
    const month = date.getMonth()
    const monthName = date.toLocaleString('default', { month: 'short' })
    const currentMonth = new Date().getMonth()
    const year = date.getFullYear()
    const currentYear = new Date().getFullYear()

    if (
      minute === currentMinute &&
      hour === currentHour &&
      day === currentDay &&
      month === currentMonth &&
      year === currentYear
    ) {
      setTimeFrame('Now')
    } else if (
      hour === currentHour &&
      day === currentDay &&
      month === currentMonth &&
      year === currentYear
    ) {
      const minutesDifference = currentMinute - minute
      setTimeFrame(`${minutesDifference} minutes ago`)
    } else if (
      day === currentDay &&
      month === currentMonth &&
      year === currentYear
    ) {
      const hoursDifference = currentHour - hour
      setTimeFrame(`${hoursDifference}h`)
    } else if (
      day === currentDay - 1 &&
      month === currentMonth &&
      year === currentYear
    ) {
      setTimeFrame(`Yesterday, ${time}`)
    } else if (year === currentYear) {
      setTimeFrame(`${monthName} ${day}`)
    } else if (year !== currentYear) {
      setTimeFrame(`${monthName} ${day}, ${year}`)
    } else {
      setTimeFrame('Unknown')
    }
  }

  // ---------- RETURN ----------
  return (
    <UserContext.Provider
      value={{
        user,
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,
        registerEmail,
        setRegisterEmail,
        registerFullName,
        setRegisterFullName,
        // registerRole,
        // setRegisterRole,
        // registerMembership,
        // setRegisterMembership,
        // registerCreatedAt,
        // setRegisterCreatedAt,

        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,

        register,
        login,
        logout,
        getUser,

        registeredSince,
        setRegisteredSince,
        timeFrame,
        setTimeFrame,
        getRegisteredSince,
        getTimeFrame,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
