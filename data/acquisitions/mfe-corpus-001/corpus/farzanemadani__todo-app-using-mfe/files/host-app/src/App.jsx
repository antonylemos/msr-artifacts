import React, { Suspense } from 'react'
const TodoForm = React.lazy(() => import('todoForm_app/TodoForm'))
const ToDoList = React.lazy(() => import('todoList_app/todoList'))
import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div className='container'>
      <Toaster position='top-center' reverseOrder={false}/>
      <Header/>
      <Routes>
        <Route path='/' element={<Suspense fallback={<div>loading</div>}>
          <ToDoList />
        </Suspense>} />
        <Route path='/add' element={<Suspense fallback={<div>loading</div>}>
          <TodoForm />
        </Suspense>} />
        <Route path='/edit/:id' element={<Suspense fallback={<div>loading</div>}>
          <TodoForm type='edit' />
        </Suspense>} />
      </Routes>
    </div>
  )
}

export default App