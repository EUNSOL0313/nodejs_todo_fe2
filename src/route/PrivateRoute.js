import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ user, children }) => {
   return user ? children : <Navigate to="/login" />
}

//user값이 있으면? Todopage : redirect to /login
//Private함을 원하는 모든페이지에서 쓸 수 있어야 한다.
//  새끼컴퍼넌트 : children

export default PrivateRoute
