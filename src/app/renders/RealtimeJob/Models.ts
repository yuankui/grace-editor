export interface JobConfig {
    labels: Array<Label>,
    sources: Array<Source>,
    storages: Array<Storage>,
}

export interface Source {
    sourceId: number,
    name: string,
    type: string,
    config: any,
}

export interface Storage {
    id: number,
    dimId: number,
    parallelism: number,
    type: string,
    config: any;
}

export interface Label {
    dimId: number,
    labelId: number,
    labelName: string,
    parallelism: number,
    sourceId: number,
    storageId: number,
    collector: any,
    extractor: string,
}

export interface KafkaSource {
    uid: string,
    name: string,
    namespace: string,
    format: string,
}

export interface SquirrelStorageConfig {
    cluster: string,
    category: string,
    timeout: number,
}

export interface TairStorageConfig {
    remoteKey: string,
    area: number;
    timeout: number;
    ttl: number;
    prefix: string;
}