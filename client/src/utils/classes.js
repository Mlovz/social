export const classes = (cls, types, newClasses) => {
  return [
    ...Object.entries(types)
      .filter(([key, value]) => Boolean(value))
      .map(([key, value]) => key),
    ...newClasses,
    ...cls,
  ].join(" ");
};
