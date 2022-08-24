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

export type DataTableProps<T extends Base> = {
  columns: DataTableColumn<T>[];
  items: T[];
  onSort?: (sort: Sort<T>) => void;
  onFilter?: (filters: { [key: string]: string }) => void;
};

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
                {column.format
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
