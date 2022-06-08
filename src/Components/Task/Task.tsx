import React from 'react';
import { ITask } from '../../Interfaces';
import styles from './Task.module.css';

interface Props {
    task: ITask;
    repeatValues: any;
    weekDays: any;
    completeTask(event: any, taskIdToDelete: number): void;
}

const TodoTask = ({ task, completeTask, repeatValues, weekDays }: Props) => {
    let active = false;

    // Day of the week handling
    const isWeekday = (): boolean => {
        let weekday = false;
        if (task.repeatDay.length === 0) {
            weekday = true;
        } else {
            weekday = activeDay();
        }
        return weekday;
    }

    const activeDay = (): boolean => {
        let activeDay = false;
        task.repeatDay.forEach((day: string) => {
            if (isToday(day)) activeDay = true;
        });
        return activeDay;
    }

    const isToday = (day: string): boolean => {
        let correctedDay = weekDays.indexOf(day) < 7 ? weekDays.indexOf(day) + 1: 0
        return (new Date()).getDay() === correctedDay;
    }

    // Repeat Handling
    let completedBefore = task.lastCompletion || false;
    
    if (!completedBefore && isWeekday()) active = true;
    if (
        (task.repeatSpread === 'Ежедневно' || task.repeatSpread === 'Не повторять')
        && isWeekday()
    ) active = true;
    if (
        task.repeatSpread === 'Еженедельно'
        && (completedBefore && ((new Date()).getDate() - (new Date(task.lastCompletion)).getDate() >= 7))
        && isWeekday()
    ) active = true;
    if (
        task.repeatSpread === 'Ежемесячно'
        && (completedBefore && ((new Date()).getDate() - (new Date(task.lastCompletion)).getDate() >= 30))
        && isWeekday()
    ) active = true;

    // Deadline handling
    let deadlineDate = '';
    if (+task.deadline !== 0) {
        let deadline = new Date(task.date);
        deadline.setDate(deadline.getDate() + +task.deadline);
        deadlineDate = Intl.DateTimeFormat('ru-RU', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(deadline)

        if (
            (deadline.getDate() - (new Date() ).getDate() <= 3)
            && task.deadline !== 0
            ) active = true;
    }

    let cssClasses = [styles.task]
    if (active) cssClasses.push(styles.active)

    return (
        <section className={cssClasses.join(' ')}>
            <header className={styles.content}>
                <span>{task.taskType}</span>
                <h3>{task.taskName}</h3>
                {+task.deadline !== 0 && <span>{deadlineDate}</span>}
            </header>
            <div className={styles.repeat}>
                {task.repeatDay.length > 0 ? task.repeatDay.map((day: string) => {
                    return <span className={isToday(day) ? styles.repeatToday : ''}>{day} &nbsp;</span>
                }) : ''}
            </div>
            <button className={styles.btn} onClick={(event) => completeTask(event, task.number)}>X</button>
        </section>
    )
};

export default TodoTask;
