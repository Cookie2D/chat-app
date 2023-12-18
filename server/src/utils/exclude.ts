export function excludeFromObject<T>(
  object: T,
  ...excluding: Array<string>
): T {
  const filteredObject: Partial<T> = {};

  if (!object) return null;

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (excluding.includes(key)) {
        continue;
      }
      filteredObject[key] = object[key];
    }
  }

  return filteredObject as T;
}
