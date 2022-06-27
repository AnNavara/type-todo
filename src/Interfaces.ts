export interface ITask {
    taskName: string;
    deadline: number;
    number: number;
    taskType: string;
    repeatSpread: string;
    repeatDays: any[];
    lastCompletion?: Date;
    [key: string]: any;
}