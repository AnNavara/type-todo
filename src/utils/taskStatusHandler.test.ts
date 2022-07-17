import taskStatusHandler from './taskStatusHandler';

// First completion task
const taskFirstCompletion = {
    taskName: '',
    deadline: 0,
    number: 1657373892631,
    taskType: '',
    repeatSpread: 'Ежедневно',
    repeatDays: ['Вт', 'Ср'],
    date: '2022-07-11T13:38:12.631Z',
};
const taskFirstCompletionAny = {
    taskName: '',
    deadline: 0,
    number: 1657373892631,
    taskType: '',
    repeatSpread: 'Еженедельно',
    repeatDays: [],
    date: '2022-07-11T13:38:12.631Z',
};

const dateFirstMon = '2022-07-11T13:38:12.631Z';
const dateFirstWed = '2022-07-13T13:38:12.631Z';

// Everyday tasks
const taskEveryDay = {
    taskName: '',
    deadline: 0,
    number: 1657373892631,
    taskType: '',
    repeatSpread: 'Ежедневно',
    repeatDays: [],
    date: '2022-07-11T13:38:12.631Z',
    lastCompletion: '2022-07-11T00:24:48.833Z',
};
const taskEveryDaySelect = {
    taskName: '',
    deadline: 0,
    number: 1657373892631,
    taskType: '',
    repeatSpread: 'Ежедневно',
    repeatDays: ['Вт', 'Ср'],
    date: '2022-07-11T13:38:12.631Z',
    lastCompletion: '2022-07-11T00:24:48.833Z',
};
const dateEDCompleted = '2022-07-11T00:24:48.833Z';
const dateEDActive = '2022-07-13T00:24:48.833Z';
const dateEDInactive = '2022-07-11T00:24:48.833Z';

// Weekly Tasks
const taskWeekly = {
    taskName: '',
    deadline: 0,
    number: 1653357034231,
    taskType: '',
    repeatSpread: 'Еженедельно',
    repeatDays: [],
    date: '2022-05-24T01:50:34.231Z',
    lastCompletion: '2022-07-13T06:29:38.541Z',
};
const dateWeeklyMon = '2022-07-11T08:29:38.541Z';
const dateWeeklyMonActive = '2022-07-18T08:29:38.541Z';
const dateWeeklyWed = '2022-07-13T08:29:38.541Z';
const dateWeeklySun = '2022-07-17T08:29:38.541Z';
const dateWeeklySunActive = '2022-07-24T08:29:38.541Z';

const taskStartofMonth = {
    taskName: '',
    deadline: 0,
    number: 1653357034231,
    taskType: '',
    repeatSpread: 'Еженедельно',
    repeatDays: [],
    date: '2022-05-24T01:50:34.231Z',
    lastCompletion: '2022-06-29T06:29:38.541Z',
};
const dateWeeklySOMMon = '2022-06-27T06:29:38.541Z';
const dateWeeklySOMMonActive = '2022-07-04T08:29:38.541Z';
const dateWeeklySOMSun = '2022-07-03T06:29:38.541Z';
const dateWeeklySOMSunActive = '2022-07-10T06:29:38.541Z';

// 
// Monthly Tasks
// 
const taskMonth = {
    taskName: '',
    deadline: 0,
    number: 1653357034231,
    taskType: '',
    repeatSpread: 'Ежемесячно',
    repeatDays: [],
    date: '2022-05-24T01:50:34.231Z',
    lastCompletion: '2022-07-13T06:29:38.541Z',
};
const dateMonth = '2022-07-13T06:29:38.541Z';
const dateMonthActive = '2022-08-13T06:29:38.541Z';

const taskMonthEoY = {
    taskName: '',
    deadline: 0,
    number: 1653357034231,
    taskType: '',
    repeatSpread: 'Ежемесячно',
    repeatDays: [],
    date: '2022-10-24T01:50:34.231Z',
    lastCompletion: '2022-12-13T06:29:38.541Z',
};
const dateMonthEoY = '2023-01-13T06:29:38.541Z';

describe('Not completed', () => {
    it('Anyday Mon active', () => {
        const { active } = taskStatusHandler(
            taskFirstCompletionAny,
            new Date(dateFirstMon)
        );
        expect(active).toBe(true);
    });
    it('Anyday Wed active', () => {
        const { active } = taskStatusHandler(
            taskFirstCompletionAny,
            new Date(dateFirstWed)
        );
        expect(active).toBe(true);
    });
    it('SelectDays Mon inactive', () => {
        const { active } = taskStatusHandler(
            taskFirstCompletion,
            new Date(dateFirstMon)
        );
        expect(active).toBe(false);
    });
    it('SelectDays Wed active', () => {
        const { active } = taskStatusHandler(
            taskFirstCompletion,
            new Date(dateFirstWed)
        );
        expect(active).toBe(true);
    });
})


describe('Daily completed before', () => {
    it('Today active completed', () => {
        const { active } = taskStatusHandler(
            taskEveryDay,
            new Date(dateEDCompleted)
        );
        expect(active).toBe(false);
    });
    it('Today select inactive', () => {
        const { active } = taskStatusHandler(
            taskEveryDaySelect,
            new Date(dateEDInactive)
        );
        expect(active).toBe(false);
    });
    it('Today select active', () => {
        const { active } = taskStatusHandler(
            taskEveryDaySelect,
            new Date(dateEDActive)
        );
        expect(active).toBe(true);
    });
})

describe('Weekly status', () => {
    it('Inactive monday', () => {
        const { active } = taskStatusHandler(
            taskWeekly,
            new Date(dateWeeklyMon)
        );
        expect(active).toBe(false);
    });

    it('Inactive wednesday', () => {
        const { active } = taskStatusHandler(
            taskWeekly,
            new Date(dateWeeklyWed)
        );
        expect(active).toBe(false);
    });

    it('Inactive sunday', () => {
        const { active } = taskStatusHandler(
            taskWeekly,
            new Date(dateWeeklySun)
        );
        expect(active).toBe(false);
    });

    it('Active monday', () => {
        const { active } = taskStatusHandler(
            taskWeekly,
            new Date(dateWeeklyMonActive)
        );
        expect(active).toBe(true);
    });

    it('Active sunday', () => {
        const { active } = taskStatusHandler(
            taskWeekly,
            new Date(dateWeeklySunActive)
        );
        expect(active).toBe(true);
    });
});

describe('Weekly status: start of month', () => {
    it('Inactive monday', () => {
        const { active } = taskStatusHandler(
            taskStartofMonth,
            new Date(dateWeeklySOMMon)
        );
        expect(active).toBe(false);
    });

    it('Inactive sunday', () => {
        const { active } = taskStatusHandler(
            taskStartofMonth,
            new Date(dateWeeklySOMSun)
        );
        expect(active).toBe(false);
    });

    it('Active monday', () => {
        const { active } = taskStatusHandler(
            taskStartofMonth,
            new Date(dateWeeklySOMMonActive)
        );
        expect(active).toBe(true);
    });

    it('Active sunday', () => {
        const { active } = taskStatusHandler(
            taskStartofMonth,
            new Date(dateWeeklySOMSunActive)
        );
        expect(active).toBe(true);
    });
});

describe('Monthly status', () => {
    it('Active month', () => {
        const { active } = taskStatusHandler(
            taskMonth,
            new Date(dateMonthActive)
        );
        expect(active).toBe(true);
    });

    it('Inactive month', () => {
        const { active } = taskStatusHandler(
            taskMonth,
            new Date(dateMonth)
        );
        expect(active).toBe(false);
    });

    it('New year', () => {
        const { active } = taskStatusHandler(
            taskMonthEoY,
            new Date(dateMonthEoY)
        );
        expect(active).toBe(true);
    });
});
