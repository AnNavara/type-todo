import { ITask } from '../Interfaces';
import { convertMsToDays } from './utils';

const taskStatusHandler = (task: ITask, weekDays: any[]): any => {
    const deadlineAllwaysActiveDays = 3;
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
    // Repeat Handling
    //
    const dateDiffToToday = (date: Date): number => {
        return convertMsToDays(new Date().getTime() - new Date(date).getTime());
    }
    // check if task was completed before
    let completedBefore = task.lastCompletion || false;
    // task active if yet to be completed and today is active day
    if (!completedBefore && isTaskDayActive()) active = true;
    // task active if it doesn't have to be repeated
    if (task.repeatSpread === 'Не повторять') active = true
    // Repeated tasks can only be inactive if they weren't completed before
    if (!!completedBefore) {
        // task active if it have to be repeated everyday
        // wasn't completed today and today is active day for the task
        if (task.repeatSpread === 'Ежедневно'
            && new Date(task.lasCompletion).getDay() !== new Date().getDay()
            && isTaskDayActive()
        ) active = true;

        if (
            task.repeatSpread === 'Еженедельно'
            && dateDiffToToday(task.lastCompletion) >= 7
            && isTaskDayActive()
        ) active = true;

        if (
            task.repeatSpread === 'Ежемесячно'
            && dateDiffToToday(task.lastCompletion) >= 30
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
            convertMsToDays(deadline.getTime() - new Date().getTime()) <= deadlineAllwaysActiveDays
            && task.deadline !== 0
        ) active = true;
    }

    return { active, isToday, deadlineDate };
};

export default taskStatusHandler;
