export interface ITask {
    taskName: string;
    deadline: number;
    number: number;
    [key: string]: any;
}