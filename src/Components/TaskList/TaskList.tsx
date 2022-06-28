import React from 'react';
import { ITask } from '../../Interfaces';
import taskStatusHandler from '../../utils/taskStatusHandler';
import Task from '../Task/Task';
import styles from './TaskList.module.css';

interface Props {
    taskList: ITask[];
    updateTask(taskName: string, id: number): void;
    completeTask(event: any, taskIdToDelete: number): void;
}

const TaskList = ({ taskList, completeTask, updateTask }: Props) => {
    const activeTasks: ITask[] = [],
        completedTasks: ITask[] = [];

    taskList.sort((taskA, taskB) => taskA.number - taskB.number).forEach((task) => {
        const { active } = taskStatusHandler(task);
        if (active) {
            activeTasks.push(task);
        } else {
            completedTasks.push(task);
        }
    });

    return (
        <>
            {activeTasks.length ? <section className="tasks-container">
                <header>
                    <h2 className={styles.taskListTitle}>Активные задания</h2>
                </header>
                {activeTasks.map((task) => {
                    return (<Task
                        updateTask={updateTask}
                        key={task.number}
                        task={task}
                        completeTask={completeTask}
                    />)
                })}
            </section> : '' }
            {completedTasks.length ? <section className="tasks-container">
                <header>
                    <h2 className={styles.taskListTitle}>Завершенные задания</h2>
                </header>
                {completedTasks.map((task) => {
                    return (<Task
                        updateTask={updateTask}
                        key={task.number}
                        task={task}
                        completeTask={completeTask}
                    />)
                })}
            </section> : '' }
        </>
    );
};

export default TaskList;
