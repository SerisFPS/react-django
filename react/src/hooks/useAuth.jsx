import { useContext } from 'react'
import { AuthContext } from '../context/main'

// custom hook
export const useAuth = () => useContext(AuthContext)
