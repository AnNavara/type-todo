import { DEADLINE_ALWAYS_ACTIVE, weekDays } from './consts';
import { ITask } from '../Interfaces';
import { convertMsToDays } from './utils';

interface ITaskStatusResult {
    active: boolean;
    isToday(day: string): boolean;
    deadlineDate: string;
}

const taskStatusHandler = (task: ITask): ITaskStatusResult => {

    let completedBefore: boolean = false;
    if (task.lastCompletion) completedBefore = true;
    let lastCompletion: Date = new Date(0);
    if (task.lastCompletion) lastCompletion = new Date(task.lastCompletion);
    let active = false;

    //
    // Day of the week handling
    //
    // is input day of the week is today
    const isToday = (day: string): boolean => {
        return new Date().getDay() === weekDays.indexOf(day) + 1;
    };
    // is Task active days contains today
    const isTaskDayActive = (): boolean => {
        let activeDay = false;
        // Task active day if any weekday
        if (task.repeatDays.length === 0) return true;
        task.repeatDays.forEach((day: string) => {
            if (isToday(day)) {
                activeDay = true;
            }
        });
        return activeDay;
    };

    //
    // Week Handling
    //
    const sundayOfDateWeek = (date: Date): Date => {
        const SUNDAY_DAY = 6;
        if (date.getDay() === SUNDAY_DAY) return date;
        const dateDiff = SUNDAY_DAY - date.getDay();
        const sundayDate = date.getDate() + dateDiff;
        const sunday = new Date(date);
        sunday.setDate(sundayDate);
        return sunday;
    }

    //
    // Repeat Handling
    //
    // task active if yet to be completed and today is active day
    if (!completedBefore && isTaskDayActive()) active = true;
    // task active if it doesn't have to be repeated
    if (task.repeatSpread === 'Не повторять') active = true
    // Repeated tasks can only be inactive if they weren't completed before
    if (completedBefore) {
        // task active if it have to be repeated everyday
        // wasn't completed today and today is active day for the task
        if (task.repeatSpread === 'Ежедневно'
            && lastCompletion < new Date()
            && isTaskDayActive()
        ) active = true;

        if (
            task.repeatSpread === 'Еженедельно'
            && sundayOfDateWeek(lastCompletion) < new Date()
            && isTaskDayActive()
        ) active = true;

        if (
            task.repeatSpread === 'Ежемесячно'
            && (lastCompletion.getMonth() < new Date().getMonth()
            || lastCompletion.getFullYear() < new Date().getFullYear())
            && isTaskDayActive()
        ) active = true;
    }

    //
    // Deadline handling
    //
    let deadlineDate = '';
    if (+task.deadline !== 0) {
        let deadline = new Date(task.date);
        deadline.setDate(deadline.getDate() + +task.deadline);
        deadlineDate = Intl.DateTimeFormat('ru-RU', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(deadline);

        // Task allways active if deadline approaching
        if (
            convertMsToDays(deadline.getTime() - new Date().getTime()) <= DEADLINE_ALWAYS_ACTIVE
            && task.deadline !== 0
        ) active = true;
    }

    return { active, isToday, deadlineDate };
};

export default taskStatusHandler;
