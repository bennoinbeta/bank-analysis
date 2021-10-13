export const parseGermanDate = (germanDate: string): Date | null => {
  var parts = germanDate.match(/(\d+)/g) || [];
  if (parts.length > 2)
    // note parts[1]-1
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

  return null;
};
