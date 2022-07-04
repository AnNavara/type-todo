import React, { ChangeEvent, useState } from 'react';
import { ITask } from '../../Interfaces';
import taskStatusHandler from '../../utils/taskStatusHandler';
import Button from '../UI/Button/Button';
import InputItem from '../UI/Input/InputItem';
import styles from './Task.module.css';
import { CSSTransition } from 'react-transition-group';
import {ReactComponent as IconConfirm} from './assets/check-mark-svgrepo-com.svg';

interface Props {
    task: ITask;
    updateTask(taskName: string, id: number): void;
    completeTask(taskIdToDelete: number): void;
    removeTask(taskIdToDelete: number): void;
}

const TodoTask = ({ task, completeTask, updateTask, removeTask }: Props) => {
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
        // <CSSTransition
        //     in={!!task}
        //     timeout={300}
        //     mountOnEnter
        //     unmountOnExit
        //     onExited={() => setVisible(false)}
        //     classNames={{
        //         enterDone: styles['modal-active'],
        //         enter: styles['modal-enter'],
        //         enterActive: styles['modal-enter-active'],
        //         exit: styles['modal-exit'],
        //         exitActive: styles['modal-exit-active'],
        //     }}
        // >
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
                            <Button click={editTask}><IconConfirm className={styles.svgIcon} /></Button>
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
                {active 
                    && <button className={[styles.btn, styles.btnComplete].join(' ')} onClick={(event) => completeTask(task.number)}>
                        <span><IconConfirm className={styles.svgIcon} /></span>
                    </button>}
                <button className={[styles.btn, styles.btnRemove].join(' ')} onClick={(event) => removeTask(task.number)}><span>❌</span></button>
            </section>
        // </CSSTransition>
    )
};

export default TodoTask;
function setVisible(arg0: boolean) {
    throw new Error('Function not implemented.');
}

