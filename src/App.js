import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import TodoBoard from './components/TodoBoard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import api from './utils/api'

function App() {
   const [todoList, setTodoList] = useState([])
   const [todoValue, setTodoValue] = useState([])

   const getTasks = async () => {
      const response = await api.get('/tasks')
      console.log('res', response)
      setTodoList(response.data.data)
   }
   useEffect(() => {
      getTasks()
   }, [])

   const addTask = async () => {
      try {
         const response = await api.post('/tasks', { task: todoValue, isComplete: false })
         if (response.status === 200) {
            console.log('성공')
            setTodoValue('') //입력창 초기화
            getTasks() //추가한 값 다시 불러주기
         } else {
            throw new Error('task can not be added')
         }
      } catch (err) {
         console.log('error', err)
      }
   }

   const deleteItem = async (id) => {
      try {
         console.log(id)
         const response = await api.delete(`/tasks/${id}`)
         if (response.status === 200) {
            getTasks()
         }
      } catch (err) {
         console.log('error', err)
      }
   }
   const toggleComplete = async (id) => {
      try {
         const task = todoList.find((item) => item._id === id)
         const response = await api.put(`/tasks/${id}`, {
            isComplete: !task.isComplete,
         })
         if (response.status === 200) {
            getTasks()
         }
      } catch (error) {
         console.log('error', error)
      }
   }

   return (
      <Container>
         <Row className="add-item-row">
            <Col xs={12} sm={10}>
               <input
                  type="text"
                  placeholder="할일을 입력하세요"
                  onChange={(event) => setTodoValue(event.target.value)}
                  className="input-box"
                  value={todoValue}
               />
            </Col>
            <Col xs={12} sm={2}>
               <button onClick={addTask} className="button-add">
                  추가
               </button>
            </Col>
         </Row>

         <TodoBoard todoList={todoList} deleteItem={deleteItem} toggleComplete={toggleComplete} />
      </Container>
   )
}

export default App
