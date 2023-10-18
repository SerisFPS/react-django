import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/App'

export const useAuth = () => useContext(AuthContext)
