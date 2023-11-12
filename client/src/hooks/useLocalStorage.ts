import React, { type Dispatch, type SetStateAction } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = React.useState<T>(() => {
        const storedTheme = localStorage.getItem(key);
        return storedTheme !== null ? JSON.parse(storedTheme) : initialValue;
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

