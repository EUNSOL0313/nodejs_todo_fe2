import React from 'react'
import '../layout/AppLayout.css'
import { useNavigate } from 'react-router-dom'

const AppLayout = ({ user, setUser }) => {
   const navigate = useNavigate()

   //로그아웃 함수
   const handleLogout = async (event) => {
      try {
         sessionStorage.removeItem('token')
         setUser(null)
         navigate('/login')
      } catch (error) {
         console.log('error', error)
      }
   }

   return (
      <div className="user-info">
         <div className="user-name">{user.name} 님</div>
         <button className="button-logout" onClick={handleLogout}>
            Logout
         </button>
      </div>
   )
}

export default AppLayout
