export function toBanglaNumber(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-IN"
  )
    .format(value)
    .replace(
      /\d/g,
      (digit) =>
        "০১২৩৪৫৬৭৮৯"[Number(digit)]
    );
}

export function formatPrice(
  value: number
): string {
  return `${toBanglaNumber(value)} টাকা`;
}

export function formatChange(
  value: number
): string {
  const number =
    Number(value) || 0;

  const bangla = Math.abs(number)
    .toFixed(1)
    .replace(
      /\d/g,
      (digit) =>
        "০১২৩৪৫৬৭৮৯"[Number(digit)]
    );

  if (number > 0) {
    return `▲ ${bangla}%`;
  }

  if (number < 0) {
    return `▼ ${bangla}%`;
  }

  return `— ${bangla}%`;
}