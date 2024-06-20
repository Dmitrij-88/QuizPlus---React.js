import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Custom hook to handle user signup
export const useSignup = () => {
  // State variables to manage error and loading states
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  // Access the auth context and its dispatch function
  const { dispatch } = useAuthContext()

  // Function to perform the signup process
  const signup = async (fName, surname, email, password) => {
    // Set loading state to true and clear any previous errors
    setIsLoading(true)
    setError(null)

    // Make a signup request to the backend
    try{

    const response = await fetch('http://localhost:4000/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fName, surname, email, password })
    })
    const json = await response.json()

    // Handle the response based on success or failure
    if(!response.ok) {
      // If the signup request failed, update the error state and loading state accordingly
      setIsLoading(false)
      setError(json.error)
    } 
    if(response.ok) {
      // If the signup request was successful:
      // - Save the user data to local storage for persistence across sessions
      localStorage.setItem('user', JSON.stringify(json))

      // - Update the auth context with the user data (performing a "login")
      dispatch({ type: 'LOGIN', payload: json })

      // - Update loading state to false
      setIsLoading(false)
    }
  } catch(error){
    setIsLoading(false);
    setError('Failed to sign up');
  }
};

  // Return the signup function, isLoading state, and error state to be used in components
  return { signup, isLoading, error }
}