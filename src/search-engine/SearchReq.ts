// language=yaml
import {Page} from "./hook-struct/Page";

export interface SearchReq {
    where: Expression,
    page: Page,
}

export type Expression = AndExpression
    | OrExpression
    | NotExpression
    | FieldExpression
    ;

export interface AndExpression {
    type: 'and',
    left: Expression,
    right: Expression,
}

export interface OrExpression {
    type: 'or',
    left: Expression,
    right: Expression,
}

export interface NotExpression {
    type: 'not',
    inner: Expression,
}

export interface FieldExpression {
    type: 'field',
    field: string,
    config: any;
}