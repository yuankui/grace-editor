
export interface Consumer<T> {
    (data: T): void,
}