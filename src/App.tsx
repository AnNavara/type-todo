import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import './styles/App.css';
import InputItem from './components/UI/Input/InputItem';
import SelectMenu from './components/UI/SelectMenu/SelectMenu';
import { ITask } from './Interfaces';
import { loadLocalStorage, saveLocalStorage } from './utils/utils';
import TaskList from './components/TaskList/TaskList';
import Modal from './components/UI/Modal/Modal';
import { repeatValues, weekDays } from './consts';
import Button from './components/UI/Button/Button';
import Toggle from './components/UI/Toggle/Toggle';
import TaskCreator from './components/TaskCreator/TaskCreator';

const App: FC = () => {
    const [ task, setTask ] = useState<ITask>({
        taskName: '',
        deadline: 0,
        number: 0,
        taskType: '',
        repeatSpread: '',
        repeatDays: [],
    });
    const [ todoList, setTodoList ] = useState<ITask[]>(() => {
        const state = loadLocalStorage('state');
        return state ? state : [];
    })
    const [ modal, setModal ] = useState<boolean>(false);
    const taskTypes = [
        'Курсы',
        'Домашние',
        'Genshin: ХуТао',
        'Genshin: Аяка',
        'Genshin: Рейден',
    ];

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
            setModal(false);
        } else {
            // 
            // 
            // SHOW ERROR
            // 
            // 
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
            <header className='header'>
                <Button click={setModal}>
                    Добавить задание
                </Button>
                <div>|<b>*Toggle*</b>| Темная тема | Светлая тема</div>
            </header>
            <Modal visible={modal} setVisible={setModal}>
                <TaskCreator 
                    addTask={addTask}
                    handleChange={handleChange}
                    taskTypes={taskTypes}
                    task={task}           
                />
            </Modal>

            <TaskList
                updateTask={updateTask}
                taskList={todoList}
                completeTask={completeTask}
            />
        </div>
    );
};

export default App;
