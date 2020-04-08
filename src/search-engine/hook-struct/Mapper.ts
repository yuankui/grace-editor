export interface Mapper<S, T> {
    map(source: S): T;
}