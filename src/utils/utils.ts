export const saveLocalStorage = (id: string, state: any): void => {
    localStorage.setItem(id, JSON.stringify(state));
}

export const loadLocalStorage = (id: string): any => {
    const saved = localStorage.getItem(id);
    if (!saved) return false;
    return JSON.parse(saved);
}

export const converMsToDays = (ms: number): number => {
    return Math.floor(ms / (24*60*60*1000));
}