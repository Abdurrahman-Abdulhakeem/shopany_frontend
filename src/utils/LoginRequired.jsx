import React from 'react'
import { useSelector } from 'react-redux'
import { userLoginState } from '../redux/userLoginSlice'
import { Navigate } from 'react-router-dom'

function LoginRequired({children}) {
    const {user} = useSelector(userLoginState)
    
  return user?.access ? children : <Navigate to ="/login" />
  
}

export default LoginRequired