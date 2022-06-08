export const saveLocalStorage = (id: string, state: any): void => {
    localStorage.setItem(id, JSON.stringify(state));
}

export const loadLocalStorage = (id: string): any => {
    const saved = localStorage.getItem(id);
    if (!saved) return false;
    return JSON.parse(saved);
}