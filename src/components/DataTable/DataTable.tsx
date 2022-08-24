import React, { ReactElement, FC, useState } from "react";

import styles from "./DataTable.module.css";

export type DataTableColumn = {
  title: string;
  key: string;
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any) => string | ReactElement;
};

export type DataTableProps<T = any> = {
  columns: DataTableColumn[];
  items: T[];
  onSort?: (sort: Sort<T>) => void;
  onFilter?: (filters: { [key: string]: string }) => void;
};

export const DataTable: FC<DataTableProps> = (props) => {
  const { columns, items, onSort } = props;

  const [sortColumn, setSortColumn] = useState("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeader}>
          {columns.map((column) => {
            const { key, title, sortable = true } = column;

            return (
              <th
                key={key}
                className={
                  sortable && sortColumn === key ? styles.activeSortColumn : ""
                }
              >
                {title}
                {sortable ? (
                  <button
                    onClick={() => {
                      const newColumn = key;
                      const newDirection = sortDir === "asc" ? "desc" : "asc";

                      setSortColumn(newColumn);
                      setSortDir(newDirection);

                      // call onSort from props
                      if (onSort) {
                        onSort({ key: newColumn, dir: newDirection });
                      }
                    }}
                  >
                    {/* add filter column here */}
                    {sortColumn === key
                      ? sortDir === "asc"
                        ? "asc"
                        : "desc"
                      : "-"}
                  </button>
                ) : null}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.uid}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.format
                  ? column.format(item[column.key])
                  : item[column.key].toString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
