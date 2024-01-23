import {SORT} from "../../types";

export function getSortFieldsAndOrder(sort: string) {
  const [fieldsString, order] = sort.split(':')
  return {
    fields: fieldsString.length ? fieldsString.split(',') : [],
    order: order ? order as SORT : null,
  }
}

export function getSort(order: SORT | null, fields: Array<string>) {
  if (!order || !fields.length) {
    return null;
  }
  return `${fields.join(',')}:${order}`
}