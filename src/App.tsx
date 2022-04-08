import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {
    const [task, setTask] = useState<string>('');
    const [deadline, setDeadline] = useState<number>(0);
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
        if (event.target.name === 'task') {
            setTask(event.target.value);
        } else {
            setDeadline(Number(event.target.value));
        }
    };

    const addTask = (): void => {
        const newTask = {
            taskName: task,
            deadline: deadline,
            number: new Date().valueOf(),
        };
        setTodoList([...todoList, newTask]);
        setTask('');
        setDeadline(0);
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
                <input
                    type="text"
                    value={task}
                    name="task"
                    placeholder="Task"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    value={deadline}
                    name="deadline"
                    placeholder="Deadline"
                    onChange={handleChange}
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
