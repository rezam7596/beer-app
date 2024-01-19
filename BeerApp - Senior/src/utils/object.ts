export function removeEmptyProperties(obj: object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => ![undefined, null, ''].includes(value)));
}