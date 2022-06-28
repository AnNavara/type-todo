import React, { ChangeEvent, useState } from 'react';
import { repeatValues, weekDays } from '../../consts';
import { ITask } from '../../Interfaces';
import Button from '../UI/Button/Button';
import InputItem from '../UI/Input/InputItem';
import Toggle from '../UI/Toggle/Toggle';
import styles from './TaskCreator.module.css';

interface Props {
    addTask(): void;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    setTypesManager(status: boolean): void;
    taskTypes: string[];
    task: ITask;
}

const TaskCreator = ({ addTask, handleChange, task, taskTypes, setTypesManager }: Props) => {
    return (
        <div className={styles.taskCreator}>
            <h2 className={styles.taskCreatorTitle}>Добавить задание</h2>
            <div className={styles.taskCreatorWrapper}>
                <InputItem
                    className="task__name"
                    type="text"
                    name="taskName"
                    placeholder="Задание"
                    addTask={addTask}
                    handleChange={handleChange}
                />
                <Toggle
                    name="taskType"
                    value={task.taskType}
                    defaultValue="Тип задания"
                    items={taskTypes}
                    click={handleChange}
                />
                <div>
                    <a style={{cursor: 'pointer'}} onClick={() => setTypesManager(true)}>Управление типами</a>
                </div>
                <Toggle
                    name="repeatSpread"
                    value={task.repeatSpread}
                    defaultValue="Повтор"
                    items={repeatValues}
                    click={handleChange}
                />
                <Toggle
                    name="repeatDays"
                    value={task.repeatDays}
                    defaultValue="Дни повтора"
                    items={weekDays}
                    click={handleChange}
                />
                <div className={styles.taskCreatorInner}>
                    <InputItem
                        className="input__min"
                        type="number"
                        name="deadline"
                        placeholder="Deadline"
                        min="0"
                        handleChange={handleChange}
                    />
                    <Button click={addTask}>
                        Добавить задание
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskCreator;
