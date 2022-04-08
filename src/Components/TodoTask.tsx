import React from 'react';
import { ITask } from '../Interfaces';

interface Props {
    task: ITask;
    completeTask(taskIdToDelete: number): void;
}

const TodoTask = ({task, completeTask}: Props) => {
    return (
        <div className="task">
            <div className="content">
                <span>{task.task}</span>
                <span>{task.deadline}</span>
            </div>
            <button onClick={() => completeTask(task.number)}>X</button>
        </div>
    )
};

export default TodoTask;
