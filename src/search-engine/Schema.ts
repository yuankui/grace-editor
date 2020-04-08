export interface IndexSchema {
    fields: Array<FieldSchema>,
    pk: FieldSchema,
}

export interface FieldSchema {
    name: string,
    type: string,
    config: any,
}