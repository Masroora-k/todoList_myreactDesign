import React, {useEffect, useState, useRef} from "react"

function ToDoList(){

     const [tasks, setTasks] = useState(() => {
    // ✅ Load tasks from localStorage on first render (lazy initialization)
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
    const [newTask, setNewTask] = useState('')
    const [editingIndex, setEditingIndex] = useState(null)
    const [editedText, setEditedText] = useState('')
    const inputRef = useRef(null)

    useEffect(()=>{
       
        inputRef.current.focus()
    },[])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function AddTask(){

        const dup = tasks.some((item)=> item.text.toLowerCase() === newTask.toLowerCase().trim())
        if(newTask.trim() !== '' && !dup){
            const newTaskObj = {
                text: newTask,
                done: false
            }
            setTasks(t => [...t, newTaskObj])
            setNewTask('')
            return
        }else{
            
        alert('Please enter valid inputs..')
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

    function editTask(index){
        setEditingIndex(index)
        setEditedText(tasks[index].text)
    }

    function saveEdit(index){
        if(editedText.trim() === ''){
            alert('Task cannot be empty')
            return
        }
        const dup = tasks.some((item)=> item.text.toLowerCase() === editedText.toLowerCase().trim())
        if(dup){
            alert("Task already exists. Please enter a different task.");
            return;
        }

        const updatedTasks = [...tasks]
        updatedTasks[index].text = editedText.trim()
        setTasks(updatedTasks)
        setEditingIndex(null)
        setEditedText('')
    }

    function cancelEditTask(){
        setEditingIndex(null)
        setEditedText('')
    }

    function clearList(){
        setTasks([])
    }

    return(
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div className="task-list">
                <div className="input-task">
                    <input type="text" placeholder="Enter a task..." ref={inputRef} value={newTask} onChange={handleInputChange} />
                    <button className="add-button" onClick={AddTask}><span className="plus">&#43;</span></button>
                    
                </div>
                <div className="clear-list">{tasks.length > 0  &&  <button className="clear-button" onClick={clearList}>Clear</button>}</div>
                <div>
                    
                    <ol>
                        {tasks.map((task,index)=> 
                            <li key={index}>
                                <input type="checkbox" onClick={()=>doneTask(index)} />
                                {editingIndex === index ? (
                                    <><input type="text" value={editedText} onChange={(e)=> setEditedText(e.target.value)} className="edit-input" />
                                    <button className="save-button" onClick={()=> saveEdit(index)}>✔️</button>
                                     <button className="delete-button" onClick={()=>cancelEditTask(index)}>❌</button>
                                    </>
                                    
                                ) : (
                                    <>
                                        <span className={task.done ? 'text done' : 'text'}>{task.text}</span>
                                        <button className="edit-button" onClick={()=> editTask(index)}>✏️</button>
                                        <button className="delete-button" onClick={()=>deleteTask(index)}>❌</button>
                                    </>
                                )
                                }
                                
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    )

}

export default ToDoList