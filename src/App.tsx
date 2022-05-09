import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './styles/App.css';
import InputItem from './Components/Input/InputItem';
import SelectMenu from './Components/SelectMenu/SelectMenu';
import Task from './Components/Task/Task';
import { ITask } from './Interfaces';

const App: FC = () => {
    const [task, setTask] = useState<ITask>({
        taskName: '',
        deadline: 0,
        number: 0,
        taskType: '',
        repeatSpread: '',
        repeatDay: [],
    });
    const taskTypes = [
        'Курсы',
        'Домашние',
    ];
    const repeatValues = [
        'Не повторять',
        'Ежедневно',
        'Еженедельно',
        'Ежемесячно',
    ];
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

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
        if (Array.isArray(newTask[event.target.name])) {
            if (newTask[event.target.name].includes(event.target.value)) {
                newTask[event.target.name] = newTask[event.target.name].filter(
                    (el: string) => el !== event.target.value
                );
            } else {
                newTask[event.target.name].push(event.target.value);
            }
        } else {
            if (newTask[event.target.name] === event.target.value) {
                newTask[event.target.name] = '';
            } else {
                newTask[event.target.name] = event.target.value;
            }
        }
        setTask(newTask);
    };

    const validateTask = (task: ITask): boolean => {
        let valid = false;
        if (
            task.taskName !== ''
            && task.taskType !== ''
            && task.repeatSpread !== ''
        ) {
            valid = true;
        }
        return valid;
    };

    const addTask = (): void => {
        const newTask = {
            taskName: task?.taskName,
            deadline: task?.deadline,
            number: new Date().valueOf(),
            taskType: task?.taskType,
            repeatSpread: task?.repeatSpread,
            repeatDay: task?.repeatDay,
            date: new Date(),
        };
        if (validateTask(newTask)) {
            setTodoList([...todoList, newTask]);
        } else {
            console.warn('Task invalid');
        }
    };

    const completeTask = (event: any, taskIdToDelete: number): void => {
        const task  = todoList.filter((task) => {
            return task.number === taskIdToDelete;
        })[0];
        if (task.repeatSpread === 'Не повторять' || event.shiftKey) {
            setTodoList(
                todoList.filter((task) => {
                    return task.number !== taskIdToDelete;
                })
            );
        } else {

            setTodoList(
                [...todoList.filter((task) => {
                    return task.number !== taskIdToDelete;
                }),
                {
                    ...task,
                    lastCompletion: new Date(),
                },
                ]
            );
        }
    };

    return (
        <div className="App">
            <header className="header">
                <div className="task">
                    <InputItem
                        className="task__name"
                        type="text"
                        name="taskName"
                        placeholder="Задание"
                        handleChange={handleChange}
                    />
                    <SelectMenu
                        name="taskType"
                        value={task.taskType}
                        defaultValue="Тип задания"
                        handleChange={handleChange}
                        items={taskTypes}
                    />
                    <SelectMenu
                        name="repeatSpread"
                        value={task.repeatSpread}
                        defaultValue="Повтор"
                        handleChange={handleChange}
                        items={repeatValues}
                    />
                    <SelectMenu
                        name="repeatDay"
                        value={task.repeatDay}
                        defaultValue="Дни повтора"
                        handleChange={handleChange}
                        items={weekDays}
                    />
                    <InputItem
                        className="input__min"
                        type="number"
                        name="deadline"
                        placeholder="Deadline"
                        min="0"
                        handleChange={handleChange}
                    />
                    <button className="task__submit" onClick={addTask}>
                        Добавить задание
                    </button>
                </div>
            </header>

            <div className="tasks-container">
                {todoList.map((task: ITask) => {
                    return (
                        <Task
                            weekDays={weekDays}
                            repeatValues={repeatValues}
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
