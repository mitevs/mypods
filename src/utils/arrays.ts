// sorts an array in asc or desc order
export const sortArray = <T>(items: T[], key: keyof T, dir: "asc" | "desc") => {
  return items.sort((a, b) => {
    const sortFactor = dir === "asc" ? 1 : -1;

    return a[key] > b[key]
      ? 1 * sortFactor
      : a[key] < b[key]
      ? -1 * sortFactor
      : 0;
  });
};
