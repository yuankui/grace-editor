export interface IdMapper {
    map(namespace: string, source: string): Promise<number>;
}