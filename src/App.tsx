import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './styles/App.css';
import InputItem from './Components/Input/InputItem';
import SelectMenu from './Components/SelectMenu/SelectMenu';
import { ITask } from './Interfaces';
import { loadLocalStorage, saveLocalStorage } from './utils/utils';
import TaskList from './Components/TaskList/TaskList';

const App: FC = () => {
    const [task, setTask] = useState<ITask>({
        taskName: '',
        deadline: 0,
        number: 0,
        taskType: '',
        repeatSpread: '',
        repeatDays: [],
    });
    const taskTypes = [
        'Курсы',
        'Домашние',
        'Genshin: ХуТао',
        'Genshin: Аяка',
        'Genshin: Рейден',
    ];
    const repeatValues = [
        'Не повторять',
        'Ежедневно',
        'Еженедельно',
        'Ежемесячно',
    ];
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [todoList, setTodoList] = useState<ITask[]>(() => {
        const state = loadLocalStorage('state');
        return state ? state : [];
    })
    const saveState = (state: ITask[]) => (saveLocalStorage('state', state));

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

    const updateTask = (taskName: string, id: number): void =>{
        const updatedTask = todoList.filter((task) => task.number === id)[0];
        updatedTask.taskName = taskName;
        if (validateTask(updatedTask)) {
            setTodoList([
                ...todoList.filter((task) => {
                    return task.number !== id;
                }), updatedTask
            ]);
        }
    }

    const addTask = (): void => {
        const newTask = {
            taskName: task?.taskName,
            deadline: task?.deadline,
            number: new Date().valueOf(),
            taskType: task?.taskType,
            repeatSpread: task?.repeatSpread,
            repeatDays: task?.repeatDays,
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
                        name="repeatDays"
                        value={task.repeatDays}
                        defaultValue="Дни повтора"
                        handleChange={handleChange}
                        items={weekDays}
                        multiple
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

            <TaskList
                updateTask={updateTask}
                taskList={todoList}
                weekDays={weekDays}
                completeTask={completeTask}
            />
        </div>
    );
};

export default App;
