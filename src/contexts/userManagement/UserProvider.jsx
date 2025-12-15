import { useEffect, useReducer } from "react"
import { userContext as UserContext } from "./userContext"

function UserProvider({children}) {
    const defaultState = {
        isLoggedIn: false,
        username: "",
        profile_photo: "",
    }
    
    const getUserState = () => {
        const saved = localStorage.getItem("userState")
        return saved ? JSON.parse(saved) : defaultState
    }

    const [state, dispatch] = useReducer((prevState, action) => {
        switch (action.type) {
            case "LOGIN": {
                const {username, profile_photo} = action.payload
                return {
                    ...prevState,
                    isLoggedIn: true,
                    username,
                    profile_photo: profile_photo || ""
                }
            }

            case "LOGOUT":
                return defaultState

            case "UPDATE_PROFILE": {
                const {profile_photo} = action.payload
                return {
                    ...prevState,
                    profile_photo: profile_photo ?? prevState.profile_photo
                }
            }
            default:
                return prevState
        }
    }, defaultState, getUserState)

    useEffect(() => {
        localStorage.setItem("userState", JSON.stringify(state))
    }, [state])

  return (
    <UserContext.Provider value={{state, dispatch}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider