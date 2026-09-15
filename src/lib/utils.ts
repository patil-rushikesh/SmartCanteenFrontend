export const cn = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ');

// getRandomValues also works on the exam's HTTP ALB origin.
export const randomId = () => Array.from(crypto.getRandomValues(new Uint8Array(16)),
  (value) => value.toString(16).padStart(2, '0')).join('');

export const uniqueBy = <TItem, TKey extends string | number>(
  items: TItem[],
  resolver: (item: TItem) => TKey
) => {
  const seen = new Set<TKey>();
  return items.filter((item) => {
    const key = resolver(item);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};
