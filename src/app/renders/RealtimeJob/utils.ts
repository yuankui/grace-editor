export function changeValue<T>(obj: T, onChange: (v: T) => void) {
    return key => value => {
        return onChange({
            ...obj,
            [key]: value,
        });
    }
}

export function changeList<T>(list: Array<T>, onChange: (v: Array<T>) => void, changeIndex: number) {
    return (newValue: T) => {
        const newList = list.map((oldValue, index) => {
            if (index == changeIndex) {
                return newValue;
            } else {
                return oldValue;
            }
        });

        onChange(newList);
    }
}