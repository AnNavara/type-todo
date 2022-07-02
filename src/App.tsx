import React, { ChangeEvent, FC, useState } from 'react';
import './styles/App.css';
import { ITask } from './Interfaces';
import Modal from './Components/UI/Modal/Modal';
import Button from './Components/UI/Button/Button';
import TaskList from './Components/TaskList/TaskList';
import TaskCreator from './Components/TaskCreator/TaskCreator';
import useLocalStorage from './hooks/useLocalStorage';

const App: FC = () => {
    const [task, setTask] = useState<ITask>({
        taskName: '',
        deadline: 0,
        number: 0,
        taskType: '',
        repeatSpread: '',
        repeatDays: [],
    });
    const [taskError, setTaskError] = useState<boolean>(false);
    const [todoList, setTodoList] = useLocalStorage<ITask[]>('state', []);
    const [modal, setModal] = useState<boolean>(false);
    const [taskTypes, setTaskTypes] = useLocalStorage<string[]>(
        'taskTypes',
        []
    );

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

    const updateTask = (taskName: string, id: number): void => {
        const updatedTask = todoList.filter((task) => task.number === id)[0];
        updatedTask.taskName = taskName;
        if (validateTask(updatedTask)) {
            setTodoList([
                ...todoList.filter((task) => {
                    return task.number !== id;
                }),
                updatedTask,
            ]);
        }
    };

    const completeTask = (taskId: number): void => {
        const task = todoList.filter((task) => {
            return task.number === taskId;
        })[0];
        if (task.repeatSpread === 'Не повторять') {
            setTodoList(
                todoList.filter((task) => {
                    return task.number !== taskId;
                })
            );
        } else {
            setTodoList([
                ...todoList.filter((task) => {
                    return task.number !== taskId;
                }),
                {
                    ...task,
                    lastCompletion: new Date(),
                },
            ]);
        }
    };

    const removeTask = (taskId: number): void => {
        setTodoList(
            todoList.filter((task) => {
                return task.number !== taskId;
            })
        );
    };

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
            setTaskError(false);
            setModal(false);
        } else {
            setTaskError(true);
            console.warn('Task invalid');
        }
    };

    const addType = (type: string): void => {
        if (type !== '') {
            setTaskTypes([...taskTypes, type]);
        } else {
            console.warn('Type invalid');
        }
    };

    const removeType = (typeToRemove: string): void => {
        setTaskTypes(taskTypes.filter((type) => type !== typeToRemove));
    };

    return (
        <div className="App">
            <React.StrictMode>
                <header className="header">
                    <Button click={() => setModal(true)}>
                        Добавить задание
                    </Button>
                </header>
                {modal && <Modal visible={modal} setVisible={setModal}>
                    {taskError && 'В задании ошибка'}
                    <TaskCreator
                        addType={addType}
                        removeType={removeType}
                        addTask={addTask}
                        handleChange={handleChange}
                        taskTypes={taskTypes}
                        task={task}
                    />
                </Modal>}
                <TaskList
                    updateTask={updateTask}
                    taskList={todoList}
                    completeTask={completeTask}
                    removeTask={removeTask}
                />
            </React.StrictMode>
        </div>
    );
};

export default App;
