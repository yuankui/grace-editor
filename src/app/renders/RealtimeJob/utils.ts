export function changeValue<T>(obj: T, onChange: (v: T) => void) {
    return key => value => {
        return onChange({
            ...obj,
            [key]: value,
        });
    }
}