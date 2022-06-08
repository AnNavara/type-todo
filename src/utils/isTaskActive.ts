import { ITask } from '../Interfaces';

const isTaskActive = (task: ITask, weekDays: any[]): any => {
    let active = false;

    //
    // Day of the week handling
    //
    // is input day of the week is today
    const isToday = (day: string): boolean => {
        // Correct from US weekday format
        let correctedDay =
            weekDays.indexOf(day) < 7 ? weekDays.indexOf(day) + 1 : 0;
        return new Date().getDay() === correctedDay;
    };
    // is Task active days contain today
    const isTaskDayActive = (): boolean => {
        let activeDay = false;
        task.repeatDays.forEach((day: string) => {
            if (isToday(day)) activeDay = true;
        });
        return activeDay;
    };
    const isWeekday = (): boolean => {
        let weekday = false;
        if (task.repeatDays.length === 0) {
            // active weekday if any weekday
            weekday = true;
        } else {
            weekday = isTaskDayActive();
        }
        return weekday;
    };

    //
    // Repeat Handling
    //
    // check if task was completed before
    let completedBefore = task.lastCompletion || false;

    if (!completedBefore && isWeekday()) active = true;
    if (
        (task.repeatSpread === 'Ежедневно' ||
            task.repeatSpread === 'Не повторять') &&
        isWeekday()
    ) active = true;
    if (
        task.repeatSpread === 'Еженедельно' &&
        completedBefore &&
        new Date().getDate() - new Date(task.lastCompletion).getDate() >= 7 &&
        isWeekday()
    ) active = true;
    if (
        task.repeatSpread === 'Ежемесячно' &&
        completedBefore &&
        new Date().getDate() - new Date(task.lastCompletion).getDate() >= 30 &&
        isWeekday()
    ) active = true;

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

        if (
            deadline.getDate() - new Date().getDate() <= 3 &&
            task.deadline !== 0
        )
            active = true;
    }

    return { active, isToday, deadlineDate };
};

export default isTaskActive;
