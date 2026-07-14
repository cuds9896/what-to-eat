export function sortArrayOnField<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key] !== undefined && a[key] !== null ? a[key] : "";
    const bValue = b[key] !== undefined && b[key] !== null ? b[key] : "";

    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      if (aValue.length < bValue.length) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue.length > bValue.length) {
        return order === "asc" ? 1 : -1;
      }
    }

    if (aValue < bValue) {
      return order === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}
