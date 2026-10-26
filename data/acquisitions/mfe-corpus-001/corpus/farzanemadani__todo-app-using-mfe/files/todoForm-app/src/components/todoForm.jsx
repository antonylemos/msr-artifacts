import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import  '../index.css';
function todoForm({type='add',todoId=''}) {
      const navigate = useNavigate();
    const [todo,setTodo] = useState({
        name:'',
        description:'',
        status:'pending',
        priority:'low',
    })

    const params = useParams();
    useEffect(()=>{
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        if( type === 'edit'){
            const todoItem = todos.find((el)=> el.id === params.id);
            setTodo(todoItem)
        }
    },[])

    const onSave = () => {
        try{
            if(type === 'add'){
                const uniqeId = Date.now().toString();
                const todos = JSON.parse(localStorage.getItem('todos')) || [];
                todos.push({...todo,id:uniqeId});
                localStorage.setItem('todos',JSON.stringify(todos));
                toast.success('Task added Successfuly!')
                navigate('/');
            }else{
                const existingTodos = JSON.parse(localStorage.getItem('todos')) || [] ;
                const newTodos =  existingTodos.map((el)=>{
                    if(el.id === params.id){
                        return todo
                    }
                    return el
                });
                localStorage.setItem('todos', JSON.stringify(newTodos));
                toast.success('Task update successfully');
                navigate('/')
            }
        }catch(error){
            toast.error('Something went wrong')
        }
    }
  return (
    <div className='todo-form'>
        <h1 className="form-title">
           { type === 'edit' ? 'Edit' : 'Add'} a new task
        </h1>
        <div className="form">
            <div className="form-item">
                <label>Name</label>
                <input
                type='text'
                value={todo.name}
                onChange={(e)=>setTodo({...todo,name:e.target.value})}/>
            </div>
            <div className="form-item">
                <label>Description</label>
                <textarea
                type='text'
                value={todo.description}
                onChange={(e)=>setTodo({...todo,description:e.target.value})}/>
            </div>
            <div className="flex">
                <div className="form-item">
                    <label>Status</label>
                    <select
                    value={todo.status}
                    onChange={(e)=>setTodo({...todo,status:e.target.value})}>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>Priority</label>
                    <select
                    value={todo.priority}
                    onChange={(e)=>setTodo({...todo,priority:e.target.value})}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <div className="form-action-buttons">
                <button className='default-button' onClick={()=>navigate('/')}>Cancel</button>
                <button className='primary-button' onClick={onSave}>Save</button>
            </div>
        </div>
    </div>
  )
}
export default todoForm