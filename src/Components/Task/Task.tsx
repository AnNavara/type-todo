import React from 'react';
import { ITask } from '../../Interfaces';
import taskStatusHandler from '../../utils/taskStatusHandler';
import styles from './Task.module.css';

interface Props {
    task: ITask;
    weekDays: any[];
    completeTask(event: any, taskIdToDelete: number): void;
}

const TodoTask = ({ task, completeTask, weekDays }: Props) => {
    const { active, isToday, deadlineDate } = taskStatusHandler(task, weekDays)

    let cssClasses = [styles.task]
    if (active) cssClasses.push(styles.active)

    return (
        <section key={task.number} className={cssClasses.join(' ')}>
            <header className={styles.content}>
                <span>{task.taskType}</span>
                <h3>{task.taskName}</h3>
                {+task.deadline !== 0 && <span>{deadlineDate}</span>}
            </header>
            <div className={styles.repeat}>
                {task.repeatDays.length > 0 ? task.repeatDays.map((day: string) => {
                    return <span key={day + task.number} className={isToday(day) ? styles.repeatToday : ''}>{day} &nbsp;</span>
                }) : ''}
            </div>
            <button className={styles.btn} onClick={(event) => completeTask(event, task.number)}>X</button>
        </section>
    )
};

export default TodoTask;
