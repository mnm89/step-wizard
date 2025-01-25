export function objectToString(object: object) {
  return objectToArray(object).join(" ");
}

export function objectToArray(object: object) {
  let result: unknown[] = [];

  Object.values(object).forEach((value) => {
    if (typeof value === "string") {
      result = [...result, value];
    } else if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      value !== null
    ) {
      result = [...result, ...objectToArray(value)];
    }

    return undefined;
  });

  return result;
}
