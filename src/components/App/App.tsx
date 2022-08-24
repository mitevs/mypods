import { FC, useCallback, useState } from "react";
import { DataTable, DataTableColumn } from "../DataTable";

import "./App.css";
import { usePodData } from "../../hooks/usePodData";
import { formatDate } from "../../utils/dates";

export const App: FC = () => {
  const [sort, setSort] = useState<Sort<Pod>>();
  const { pods } = usePodData(sort);

  // table colum config
  const columns: DataTableColumn[] = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Namespace",
      key: "namespace",
    },
    {
      title: "Status",
      key: "status",
    },
    {
      title: "Age",
      key: "createdAt",
      format: formatDate,
    },
    {
      title: "Labels",
      key: "labels",
      format: (labels: { [key: string]: string }) => {
        return Object.keys(labels)
          .map((key) => `${key}: ${labels[key]}`)
          .join(", ");
      },
      width: "20%",
    },
  ];

  const onSort = useCallback(({ key, dir }: Sort<Pod>) => {
    setSort({ key, dir });
  }, []);

  return (
    <>
      <h1>Pods</h1>
      <DataTable columns={columns} items={pods} onSort={onSort} />
    </>
  );
};
