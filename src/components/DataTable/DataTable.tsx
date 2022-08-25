import React, {
  ReactElement,
  useState,
  useCallback,
  SyntheticEvent,
} from "react";

import { SortIcon } from "./SortIcon";

import styles from "./DataTable.module.css";

export type DataTableColumn<T> = {
  title: string;
  key: keyof T;
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any) => string | ReactElement;
  width?: string;
  icon?: string;
};

// the DataTableProps allow passing onSort that will get triggered
// when the user clicks any of the sort icons in the headers, the sorting is left to the DataTable user because most of the time for big data sets the sorting will be done on the API side
export type DataTableProps<T extends Base> = {
  columns: DataTableColumn<T>[];
  items: T[];
  onSort?: (sort: Sort<T>) => void;
};

// very flexible data table component that allows for configuring various aspects through the DataTableColumn[] props
// the user can provide the items and the column configs to describe the structure of the individual items
// the DataTable will then loop through the items and use the column config to pull the correct data keys in the individual row cells
// additionally the user can make the columns sortable or filterable, give the width in %, the icon for the colum header and custom format callback that can modify the plain item[key] value
// before rendering it into the cell. This way the user can render custom components in the cells instead of just the plain text.
// E.g. this is how the labels are rendered as Badges and the date as Datetime component that adds additional icon for the time portion of the createdAt
export const DataTable = <T extends Base>(props: DataTableProps<T>) => {
  const { columns, items, onSort } = props;

  const [sortColumn, setSortColumn] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // handle header clicks to trigger sorting
  const onHeaderClick = useCallback(
    (e: SyntheticEvent) => {
      const newColumn = e.currentTarget.getAttribute("data-key")?.toString();

      if (newColumn) {
        // const newColumn = key;
        const newDirection = sortDir === "asc" ? "desc" : "asc";
        setSortColumn(newColumn);
        setSortDir(newDirection);

        // call onSort from props
        if (onSort) {
          onSort({ key: newColumn as keyof T, dir: newDirection });
        }
      }
    },
    [sortDir, onSort]
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => {
            const {
              key,
              title,
              sortable = true,
              width = "auto",
              icon,
            } = column;

            return (
              <th
                data-key={key}
                onClick={onHeaderClick}
                key={key as string}
                className={`${styles.tableHeader} ${
                  sortable && sortColumn === key && styles.tableHeaderActive
                }`}
                style={{ width }}
              >
                {title}
                {sortable && (
                  <SortIcon dir={sortColumn === key ? sortDir : undefined} />
                )}
                {icon && (
                  <i
                    className={`fa-solid ${icon} ${styles.tableHeaderIcon}`}
                  ></i>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {items.map((item) => (
          <tr key={item.uid}>
            {columns.map((column) => (
              <td key={column.key as string}>
                {column.format // if the column specifies format callback, apply it, otherwise just render the item[key] value
                  ? column.format((item as any)[column.key])
                  : (item as any)[column.key].toString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
