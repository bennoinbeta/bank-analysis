// Inspired by https://github.com/nashdot/accounting-js/blob/master/lib/unformat.js
export const unformatMoney = (
  value: string,
  decimal: string = '.',
  fallback: number = 0
): number => {
  if (typeof value === 'number') return value;

  // Build regex to strip out everything except digits, decimal point and minus sign
  const unformattedValueString = value
    .replace(new RegExp('[^0-9-(-)-' + decimal + ']/g'), '') // strip out any cruft
    .replace(decimal, '.') // make sure decimal point is standard
    .replace(/\(([-]*\d*[^)]?\d+)\)/g, '-$1') // replace bracketed values with negatives
    .replace(/\((.*)\)/, ''); // remove any brackets that do not have numeric value

  /**
   * Handling -ve number and bracket, eg.
   * (-100) = 100, -(100) = 100, --100 = 100
   */
  const negative = (unformattedValueString.match(/-/g)?.length || 2) % 2;
  const absUnformatted = parseFloat(unformattedValueString.replace(/-/g, ''));
  const unformatted = absUnformatted * (negative ? -1 : 1);

  // This will fail silently which may cause trouble, let's wait and see
  return unformatted != null ? unformatted : fallback;
};

export const formatMoney = (value: number) => {
  // TODO
  const currencyFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
};

export const getDecimal = (currency: string): string | undefined => {
  const currencyToDecimalKeymap: { [key: string]: string } = {
    EUR: ',',
  };

  return currencyToDecimalKeymap[currency] || undefined;
};
