import React, {
  ReactElement,
  FC,
  useState,
  useCallback,
  SyntheticEvent,
} from "react";

import styles from "./DataTable.module.css";

export type DataTableColumn = {
  title: string;
  key: string;
  sortable?: boolean;
  filterable?: boolean;
  format?: (value: any) => string | ReactElement;
  width?: string;
};

export type DataTableProps<T = any> = {
  columns: DataTableColumn[];
  items: T[];
  onSort?: (sort: Sort<T>) => void;
  onFilter?: (filters: { [key: string]: string }) => void;
};

type SortIconProps = {
  dir?: "asc" | "desc";
};

const SortIcon: FC<SortIconProps> = (props) => {
  const { dir } = props;

  return (
    <i
      className={`fa-solid fa-sort${
        dir === "asc" ? "-up" : dir === "desc" ? "-down" : ""
      } ${styles.icon}`}
    ></i>
  );
};

export const DataTable: FC<DataTableProps> = (props) => {
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
          onSort({ key: newColumn, dir: newDirection });
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
            const { key, title, sortable = true, width = "auto" } = column;

            return (
              <th
                data-key={key}
                onClick={onHeaderClick}
                key={key}
                className={`${styles.tableHeader} ${
                  sortable && styles.tableHeaderActive
                }`}
                style={{ width }}
              >
                {sortable && (
                  <SortIcon dir={sortColumn === key ? sortDir : undefined} />
                )}
                {title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
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
