/**
 * Copies the requested own properties into a new object, retaining their inferred types.
 * Missing optional properties are omitted. Neither the source nor the key list is mutated.
 * @param props Source object.
 * @param keys Property names to select.
 * @returns A new object containing only selected own properties.
 */
function pickProps<T extends object, K extends keyof T>(props: T, keys: readonly K[]): Pick<T, K> {
  return Object.fromEntries(
    keys
      .filter((key) => Object.prototype.hasOwnProperty.call(props, key))
      .map((key) => [key, props[key]]),
  ) as Pick<T, K>;
}

export { pickProps };
