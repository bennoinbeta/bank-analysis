export const parseGermanDate = (germanDate: string): Date | null => {
  var parts = germanDate.match(/(\d+)/g) || [];
  if (parts.length > 2)
    // note parts[1]-1
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

  return null;
};

export const dateToString = (
  date: Date,
  dateFormat: string = 'DD/MM/YYYY'
): string => {
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();
  const year = date.getFullYear();
  return dateFormat
    .replace('MM', (month > 9 ? '' : '0') + month)
    .replace('DD', (day > 9 ? '' : '0') + day)
    .replace('YYYY', year.toString()) as any;
};

export const getDatesBetween = (
  startDate: Date,
  endDate: Date,
  steps: 'day' | 'month' | 'year' = 'day'
): Date[] => {
  const dateArray: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    switch (steps) {
      case 'day':
        currentDate.setDate(currentDate.getDate() + 1);
        break;

      case 'month':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;

      case 'year':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;

      default:
    }
  }
  return dateArray;
};
