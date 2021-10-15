export const parseGermanDate = (germanDate: string): Date | null => {
  var parts = germanDate.match(/(\d+)/g) || [];
  if (parts.length > 2)
    // note parts[1]-1
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

  return null;
};

export const dateToString = (
  date: Date,
  dateFormat: 'DD:MM:YYYY' | 'MM:DD:YYYY' = 'DD:MM:YYYY'
): `${string}:${string}:${string}` => {
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();
  const year = date.getFullYear();
  return dateFormat
    .replace('MM', (month > 9 ? '' : '0') + month)
    .replace('DD', (day > 9 ? '' : '0') + day)
    .replace('YYYY', year.toString()) as any;
};

export const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
  const dateArray: Date[] = [];
  const currentDate = startDate;
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};
