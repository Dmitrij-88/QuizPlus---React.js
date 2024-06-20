import { QuizContext } from "../context/QuizContext"
import { useContext } from "react"

export const useQuizContext = () => {
    // Access the QuizsContext using the useContext hook
    const context = useContext(QuizContext)
  
    // If the context is not available, throw an error indicating that it must be used inside a QuizsContextProvider
    if (!context) {
      throw Error('useQuizsContext must be used inside a QuizsContextProvider')
    }
  
    // Return the context
    return context
  }