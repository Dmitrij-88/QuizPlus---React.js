import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  // Access the context using useContext hook
  const context = useContext(AuthContext)

  // If the context is not available, throw an error
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  // Return the context
  return context
}