export interface Mapper<S, T> {
    map(namespace: string, source: S): T;
}