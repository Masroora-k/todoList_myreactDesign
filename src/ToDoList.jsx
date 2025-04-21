import React, {useState} from "react"

function ToDoList(){

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function AddTask(){
        if(newTask.trim() !== ''){
            const newTaskObj = {
                text: newTask,
                done: false
            }
            setTasks(t => [...t, newTaskObj])
            setNewTask('')
        }
    }

    function doneTask(index){
        const updatedTasks = [...tasks]
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks)
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_,i)=> i !== index)
        setTasks(updatedTasks)
    }

    function clearList(){
        setTasks([])
    }

    return(
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div className="task-list">
                <div className="input-task">
                    <input type="text" placeholder="Enter a task..." value={newTask} onChange={handleInputChange} />
                    <button className="add-button" onClick={AddTask}><span className="plus">&#43;</span></button>
                    
                </div>
                <div className="clear-list">   <button className="clear-button" onClick={clearList}>Clear</button></div>
                <div>
                    
                    <ol>
                        {tasks.map((task,index)=> 
                            <li key={index}>
                                <input type="checkbox" onClick={()=>doneTask(index)} />
                                <span className={task.done ? 'text done' : 'text'}>{task.text}</span>
                                <button className="delete-button" onClick={()=>deleteTask(index)}>❌</button>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    )

}

export default ToDoList