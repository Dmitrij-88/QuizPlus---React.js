import { createContext, useReducer, useEffect } from 'react'

// Create the AuthContext to be used for providing and consuming authentication-related data
export const AuthContext = createContext()

// Reducer function to handle state changes based on dispatched actions
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Set the user data in the state when the user logs in
      return { user: action.payload }
    case 'LOGOUT':
      // Clear the user data from the state when the user logs out
      return { user: null }
    default:
      // If no action type matches, return the current state
      return state
  }
}

// AuthContextProvider component to wrap the application with the AuthContext
export const AuthContextProvider = ({ children }) => {
  // Initialize the state and the dispatch function using the authReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null // Initial state, indicating that no user is logged in initially
  })

  // useEffect hook to load the user data from localStorage on component mount
  useEffect(() => {
    // Retrieve the user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'))

    // If user data is found, dispatch the LOGIN action to set the user in the state
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  // Log the current state for debugging purposes
  console.log('AuthContext state:', state)

  // Provide the AuthContext with the state and dispatch function to its children
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}