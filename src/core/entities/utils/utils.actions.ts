export const parseGermanDate = (germanDate: string): Date | null => {
  var parts = germanDate.match(/(\d+)/g) || [];
  if (parts.length > 2)
    // note parts[1]-1
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

  return null;
};

export const dateToGermanDateString = (
  date: Date
): `${string}:${string}:${string}` => {
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();
  const year = date.getFullYear();

  return `${(day > 9 ? '' : '0') + day}:${
    (month > 9 ? '' : '0') + month
  }:${year}`;
};
