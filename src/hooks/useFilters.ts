import { useState } from "react";

// custom hook to work with applied filters
export const useFilters = <T extends object>(
  initialFilters: Filter<T>[] = []
) => {
  const [filters, setFilters] = useState<Filter<T>[]>(initialFilters);

  // applies new filter, in case append = true, it will add the value to already applied filter, otherwise it replaces the old filter value with the passed one
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

  // applies single value, shortcut with predefeind append = true
  const applyFilterValue = (key: keyof T, value: string) => {
    applyFilter(key, value, true);
  };

  // removes a filter with all its values, optionally updateState = false will avoid updating the internal state because this function is reused in the other functions
  const clearFilter = (key: keyof T, updateState = true) => {
    const index = filters.findIndex((filter) => filter.key === key);
    filters.splice(index, 1);

    if (updateState) {
      setFilters([...filters]);
    }
  };

  // removes single filter value if the filter with the given key is applied
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

  // adds or removes specific filter
  const switchFilter = (key: keyof T, value: string, shouldApply: boolean) => {
    if (shouldApply) {
      applyFilter(key, value);
    } else {
      clearFilter(key);
    }
  };

  // adds or removes specific filter value (used with the multicheckbox component)
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
