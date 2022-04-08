import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './App.css';
import InputItem from './Components/InputItem';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {
    const [task, setTask] = useState<ITask>({
        taskName: '',
        deadline: 0,
        number: 0,
    });
    const [todoList, setTodoList] = useState<ITask[]>(() => {
        const saved = localStorage.getItem('state');
        if (!saved) return [];
        return JSON.parse(saved);
    });

    const saveState = (state: ITask[]): void => {
        localStorage.setItem('state', JSON.stringify(state));
    };

    useEffect(() => {
        saveState(todoList);
    }, [todoList]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newTask = {
            ...task,
        };
        newTask[event.target.name] = event.target.value;
        setTask(newTask);
    };

    const addTask = (): void => {
        const newTask = {
            taskName: task?.taskName,
            deadline: task?.deadline,
            number: new Date().valueOf(),
        };
        setTodoList([...todoList, newTask]);
        // setTask();
    };

    const completeTask = (taskIdToDelete: number): void => {
        setTodoList(
            todoList.filter((task) => {
                return task.number !== taskIdToDelete;
            })
        );
    };

    return (
        <div className="App">
            <div className="header">
                <InputItem
                    type="text"
                    value={task?.taskName}
                    name="taskName"
                    placeholder="Task"
                    handleChange={handleChange}
                />
                <InputItem
                    type="number"
                    value={task?.deadline}
                    name="deadline"
                    placeholder="Deadline"
                    handleChange={handleChange}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="todo-list">
                {todoList.map((task: ITask) => {
                    return (
                        <TodoTask
                            key={task.number}
                            task={task}
                            completeTask={completeTask}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
