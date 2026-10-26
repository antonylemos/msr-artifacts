import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { toast } from 'react-hot-toast'

function ToDoList() {
  const navigate = useNavigate();
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const onDelete = (id) => {
    const updatedTodos = todoItems.filter((el) => el.id !== id);
    setTodoItems(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
      toast.success('Task deleted Successfuly!')
  }
  return (
    <div>
      <div className='flex space-between items-center'>
        <h1 className="todo-list-title">
          ToDo List
        </h1>
        <button onClick={() => { navigate('/add') }} className='primary-btn'>Add Task</button>

      </div>
      <div className="todo-list">
        {
          todoItems.map((todo, index) => (
            <div key={todo.id}>
              <h1 className="name">
                {todo.name}
              </h1>
              <p>{todo.description}</p>
              <div className='flex space-between items-center'>
                <div className='flex space-between items-center'>
                  <div>
                    <div>
                      <label>Status</label>
                      <span>{todo.status}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>Priority</label>
                      <span>{todo.priority}</span>
                    </div>
                  </div>
                </div>
                <div className='flex action-btns items-center'>
                  <span onClick={() => navigate(`/edit/${todo.id}`)}>Edit</span>
                  <span onClick={() => onDelete(todo.id)}>Delete</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ToDoList