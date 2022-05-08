import React from 'react';
import { ITask } from '../../Interfaces';
import styles from './Task.module.css';

interface Props {
    task: ITask;
    repeatValues: any;
    weekDays: any;
    completeTask(taskIdToDelete: number): void;
}

const TodoTask = ({ task, completeTask, repeatValues, weekDays }: Props) => {
    let active = false;

    // Day of the week handling
    const isWeekday = (): boolean => {
        let weekday = false;
        if (task.repeatDay.length === 0) {
            weekday = true;
        } else {
            task.repeatDay.forEach((day: string) => {
                let correctedDay = weekDays.indexOf(day) < 7 ? weekDays.indexOf(day) + 1: 0
                if ((new Date()).getDay() === correctedDay) {
                    weekday = true;
                }
            });
        }
        return weekday;
    }

    // Repeat Handling
    let completedBefore = task.lastCompletion || false;
    if (
        (task.repeatSpread === 'Ежедневно' || task.repeatSpread === 'Не повторять')
        && isWeekday()
    ) active = true;
    if (
        task.repeatSpread === 'Еженедельно'
        && (!completedBefore || ((new Date(task.lastCompletion)).getDate() - 7 <= 0))
        && isWeekday()
    ) active = true;
    if (
        task.repeatSpread === 'Ежемесячно'
        && (!completedBefore || ((new Date(task.lastCompletion)).getDate() - 30 <= 0))
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
            <button className={styles.btn} onClick={() => completeTask(task.number)}>X</button>
        </section>
    )
};

export default TodoTask;
