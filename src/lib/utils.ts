export const cn = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ');

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
