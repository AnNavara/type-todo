import React, { ChangeEvent, useState } from 'react';
import { ITask } from '../../Interfaces';
import taskStatusHandler from '../../utils/taskStatusHandler';
import Button from '../UI/Button/Button';
import InputItem from '../UI/Input/InputItem';
import styles from './Task.module.css';

interface Props {
    task: ITask;
    updateTask(taskName: string, id: number): void;
    completeTask(event: any, taskIdToDelete: number): void;
}

const TodoTask = ({ task, completeTask, updateTask }: Props) => {
    const { active, isToday, deadlineDate } = taskStatusHandler(task);
    const [ isChanging, setIsChanging ] = useState<boolean>(false);
    const [ newTaskName, setNewTaskName ] = useState<string>(task.taskName);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(event.target.value);
    };

    const editTask = (): void =>{
        task.taskName = newTaskName;
        setIsChanging(false);
        updateTask(newTaskName, task.number);
    };

    let cssClasses = [styles.task];
    if (active) cssClasses.push(styles.active);

    return (
        <section key={task.number} className={cssClasses.join(' ')}>
            <header className={styles.content}>
                <span>{task.taskType}</span>
                {isChanging ? 
                    <div className={styles.editContainer}>
                        <InputItem
                            type="text"
                            name="newTaskName"
                            value={newTaskName}
                            placeholder={task.taskName}
                            handleChange={handleChange}
                        />
                        <Button click={editTask}>✔️</Button>
                    </div>
                    : <h3 onClick={() => setIsChanging(true)}>{task.taskName}</h3>
                }
                {+task.deadline !== 0 && <span>{deadlineDate}</span>}
            </header>
            <div className={styles.repeat}>
                {task.repeatDays.length > 0 ? task.repeatDays.map((day: string) => {
                    return <span key={day + task.number} className={isToday(day) ? styles.repeatToday : ''}>{day} &nbsp;</span>
                }) : ''}
            </div>
            {active ? <button className={styles.btn} onClick={(event) => completeTask(event, task.number)}>✔️</button> : ''}
            <button className={styles.btn} onClick={(event) => completeTask(event, task.number)}>❌</button>
        </section>
    )
};

export default TodoTask;
