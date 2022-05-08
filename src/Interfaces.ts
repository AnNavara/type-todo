export interface ITask {
    taskName: string;
    deadline: number;
    number: number;
    taskType: string;
    repeatSpread: string;
    repeatDay: any;
    [key: string]: any;
}