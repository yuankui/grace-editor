// language=yaml
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
    where: Exp<any>,
}

export interface Exp<T> {
    type: string,
    params: T,
}