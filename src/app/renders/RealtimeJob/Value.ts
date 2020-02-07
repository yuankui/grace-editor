export interface Value<T> {
    value: T,

    onChange(v: T): void,
}