import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import RegisterPage from './pages/RegisterPage'
import { useEffect, useState } from 'react'
import PrivateRoute from './route/PrivateRoute'
import api from './utils/api'
import AppLayout from './layout/AppLayout'

function App() {
   const [user, setUser] = useState(null)
   const getUser = async () => {
      //토큰을 통해 유저 정보 가져오기
      try {
         const storedToken = sessionStorage.getItem('token')
         if (storedToken) {
            const response = await api.get('/user/me')
            //console.log('rrrr', response)
            setUser(response.data.user)
         }
      } catch (error) {
         setUser(null)
      }
   }

   useEffect(() => {
      getUser()
   }, [])
   return (
      <Routes>
         <Route
            path="/"
            element={
               //유저정보 있으면 => todo페이지로
               <PrivateRoute user={user}>
                  <AppLayout user={user} setUser={setUser} />
                  <TodoPage />
               </PrivateRoute>
            }
         />
         {/* 유저정보 없으면 => 로그인페이지로 */}
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
      </Routes>
   )
}

export default App
