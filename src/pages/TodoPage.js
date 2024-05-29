import React, { useEffect, useState } from 'react'
import TodoBoard from '../components/TodoBoard'
import api from '../utils/api'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const TodoPage = () => {
   const [todoList, setTodoList] = useState([])
   const [todoValue, setTodoValue] = useState('')

   //할일 가져오기 함수
   const getTasks = async () => {
      const response = await api.get('/tasks')
      console.log('taskList', response.data.data)
      setTodoList(response.data.data)
   }
   useEffect(() => {
      getTasks()
   }, [])

   //할일 추가 함수
   const addTodo = async () => {
      try {
         const response = await api.post('/tasks', {
            task: todoValue,
            isComplete: false,
         })
         if (response.status === 200) {
            getTasks()
         }
         setTodoValue('')
      } catch (error) {
         console.log('error:', error)
      }
   }

   //할일 삭제 함수
   const deleteItem = async (id) => {
      try {
         console.log(id)
         const response = await api.delete(`/tasks/${id}`)
         if (response.status === 200) {
            getTasks()
         }
      } catch (error) {
         console.log('error', error)
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
               <button onClick={addTodo} className="button-add">
                  추가
               </button>
            </Col>
         </Row>

         <TodoBoard todoList={todoList} deleteItem={deleteItem} toggleComplete={toggleComplete} />
      </Container>
   )
}

export default TodoPage
