export const parseGermanDate = (germanDate: string): Date | null => {
  var parts = germanDate.match(/(\d+)/g) || [];
  if (parts.length > 2)
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
  let currentDate = new Date(startDate);

  // Update date scope to limit it to the specified step
  if (steps === 'month') {
    currentDate = new Date(
      `${currentDate.getMonth()}/01/${currentDate.getFullYear()}`
    );
    endDate = new Date(`${endDate.getMonth()}/01/${endDate.getFullYear()}`);
  }
  if (steps === 'year') {
    currentDate = new Date(`01/01/${currentDate.getFullYear()}`);
    endDate = new Date(`01/01/${endDate.getFullYear()}`);
  }

  // Go stepwise into the future with the currentDate
  // until the currentDate is greater than the endDate
  while (currentDate < endDate) {
    dateArray.push(new Date(currentDate));
    if (steps === 'day') currentDate.setDate(currentDate.getDate() + 1);
    if (steps === 'month') currentDate.setMonth(currentDate.getMonth() + 1);
    if (steps === 'year')
      currentDate.setFullYear(currentDate.getFullYear() + 1);
  }

  return dateArray;
};
