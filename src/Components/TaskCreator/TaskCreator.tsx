import React, { ChangeEvent, useState } from 'react';
import { repeatValues, weekDays } from '../../utils/consts';
import { ITask } from '../../Interfaces';
import Button from '../UI/Button/Button';
import InputItem from '../UI/Input/InputItem';
import Toggle from '../UI/Toggle/Toggle';
import styles from './TaskCreator.module.css';
import TypesManager from '../TypesManager/TypesManager';

interface Props {
    addTask(): void;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
    taskTypes: string[];
    task: ITask;
    error: boolean;
    addType(type: string): void;
    removeType(type: string): void;
}

const TaskCreator = ({
    addTask,
    handleChange,
    task,
    taskTypes,
    error,
    addType,
    removeType,
}: Props) => {
    const [typesManager, setTypesManager] = useState<boolean>(false);
    return typesManager ? (
        <TypesManager
            addType={addType}
            removeType={removeType}
            taskTypes={taskTypes}
            setTypesManager={() => setTypesManager(false)}
        />
    ) : (
        <div className={styles.taskCreator}>
            <h2 className={styles.taskCreatorTitle}>Добавить задание</h2>
            {error && <p>В задании ошибка</p>}
            <div className={styles.taskCreatorWrapper}>
                <InputItem
                    className="task__name"
                    type="text"
                    name="taskName"
                    placeholder="Задание"
                    addTask={addTask}
                    value={task.taskName}
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
                    <Button
                        click={() => setTypesManager(true)}
                    >
                        Управление типами
                    </Button>
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
                    <Button click={addTask}>Добавить задание</Button>
                </div>
            </div>
        </div>
    );
};

export default TaskCreator;
