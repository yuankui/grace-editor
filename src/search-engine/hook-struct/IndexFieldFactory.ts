import {Field} from "./Field";

/**
 * 用来根据字段的值，新建字段的元数据的
 */
export interface IndexFieldFactory {
    guess(name: string, value: any): Field | null;
    fromConfig(name: string, config: any): Field | null;
}