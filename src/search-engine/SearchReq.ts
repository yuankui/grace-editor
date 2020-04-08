// language=yaml
import {Page} from "./hook-struct/Page";

const example = `type: and
params:
  left:
    type: =
    params:
      field: age
      value: 33
  right:
    type: =
    params:
      field: name
      value: yuankui`;

export interface SearchReq {
    where: Expression<any>,
    page: Page,
}

export interface Expression<T> {
    type: string,
    params: T,
}