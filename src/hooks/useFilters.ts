import { useState } from "react";

export const useFilters = <T extends object>(
  initialFilters: Filter<T>[] = []
) => {
  const [filters, setFilters] = useState<Filter<T>[]>(initialFilters);

  // applies new filter, removes old one with the same key
  const applyFilter = (key: keyof T, value: string, append = false) => {
    const filter = filters.find((filter) => filter.key === key);

    if (append) {
      if (filter) {
        filter.values.add(value);
      } else {
        filters.push({ key, values: new Set([value]) });
      }
    } else {
      clearFilter(key);
      filters.push({ key, values: new Set([value]) });
    }

    setFilters([...filters]);
  };

  // applies new filter, removes old one with the same key
  const applyFilterValue = (key: keyof T, value: string) => {
    applyFilter(key, value, true);
  };

  const clearFilter = (key: keyof T, updateState = true) => {
    const index = filters.findIndex((filter) => filter.key === key);
    filters.splice(index, 1);

    if (updateState) {
      setFilters([...filters]);
    }
  };

  const clearFilterValue = (key: keyof T, value: string) => {
    const filter = filters.find((filter) => filter.key === key);

    if (filter) {
      filter.values.delete(value);

      if (!filter.values.size) {
        clearFilter(key, false);
      }

      setFilters([...filters]);
    }
  };

  const switchFilter = (key: keyof T, value: string, shouldApply: boolean) => {
    if (shouldApply) {
      applyFilter(key, value);
    } else {
      clearFilter(key);
    }
  };

  const switchFilterValue = (
    key: keyof T,
    value: string,
    shouldApply: boolean
  ) => {
    if (shouldApply) {
      applyFilterValue(key, value);
    } else {
      clearFilterValue(key, value);
    }
  };

  return {
    filters,
    applyFilter,
    applyFilterValue,
    clearFilter,
    clearFilterValue,
    switchFilter,
    switchFilterValue,
  };
};
