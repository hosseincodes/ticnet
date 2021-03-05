const removeItemWithSlice = (items, index) => {
  if (index === -1) return items;
  return [...items.slice(0, index), ...items.slice(index + 1)];
};