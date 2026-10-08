export function toBanglaNumber(value: number): string {
  const formatted = new Intl.NumberFormat("en-IN").format(value);

  return formatted.replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

export function formatPrice(value: number): string {
  return `${toBanglaNumber(value)} টাকা`;
}

export function formatChange(value: number): string {
  const absolute = Math.abs(value).toFixed(1);

  const bangla = absolute.replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );

  if (value > 0) {
    return `▲ ${bangla}%`;
  }

  if (value < 0) {
    return `▼ ${bangla}%`;
  }

  return `— ${bangla}%`;
}