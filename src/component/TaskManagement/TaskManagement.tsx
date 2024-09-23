"use client"

import {useState} from "react";

const TaskManagement = () =>{
    const [tasks, setTasks] =  useState<ITaskType[]>([])
    const [completedTasks, setCompletedTasks] =  useState<ITaskType[]>([])

    const [taskName, setTaskName] = useState<string>("")
    const [priority, setPriority] = useState<string>("top-priority")
    const [id, setId] = useState(0)

    const handleOnChange = (e)=>{
        const val = e.target.value
        const name = e.target.name
        switch (name) {
            case "task-name":
                setTaskName(val);
                break;
            case "priority":
                setPriority(val)
                break;

        }
    }

    const handleOnAdd = (e)=>{
        e.preventDefault()
        setId(prevState => prevState+1)
        if(taskName===""){
            alert("Task Name must be entered")
            return
        }
        const task : ITaskType = {
            id: id,
            taskName:taskName,
            priority: priority
        }

        setTasks((prevState)=>[...prevState, task])

    }

    const handleCompletedTask=(id:number)=>{
        const completedTask = tasks.find((t)=>t.id==id)
        const newTasks = tasks.filter((t)=>t.id!==id)

        // @ts-ignore
        setCompletedTasks((prevState)=>[...prevState, completedTask])
        setTasks(newTasks)
    }


return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h1 className="mt-4 task-header text-center">Task Management</h1>
                <div className="task-create">
                    <input name="task-name" type="text" onChange={handleOnChange}/>
                    <select name="priority" onChange={handleOnChange}>
                        <option value="top-priority">High Priority</option>
                        <option value="low-priority">Low Priority</option>
                    </select>

                    <button type="submit" onClick={handleOnAdd}>Add Task</button>

                </div>

                <div>
                    <h2 className="text-center">Upcoming Tasks</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id </th>
                            <th>Task Name</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map((t, index)=>{
                            return (
                                <tr key={index}>
                                <td>
                                    {t.id}
                                </td>
                                    <td>
                                        {t.taskName}
                                    </td>
                                    <td>
                                        {t.priority}
                                    </td>
                                    <td>
                                        <button type="submit" onClick={()=>handleCompletedTask(t.id)}>Complete</button>
                                    </td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-center">Completed Tasks</h2>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id </th>
                            <th>Task Name</th>
                            <th>Priority</th>
                        </tr>
                        </thead>
                        <tbody>
                        {completedTasks.map((t, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{t.id}</td>
                                    <td>{t.taskName}</td>
                                    <td>{t.priority}</td>
                                </tr>
                            )
                        })}

                        </tbody>

                    </table>
                </div>


            </div>
        </div>


    </div>
)
}


export default TaskManagement;