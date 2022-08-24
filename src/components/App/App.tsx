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
      icon: "fa-server",
      width: "20%",
    },
    {
      title: "Namespace",
      key: "namespace",
      icon: "fa-circle-nodes",
    },
    {
      title: "Status",
      key: "status",
      icon: "fa-rotate",
    },
    {
      title: "Age",
      key: "createdAt",
      format: formatDate,
      icon: "fa-clock",
    },
    {
      title: "Labels",
      key: "labels",
      format: (labels: { [key: string]: string }) => {
        return Object.keys(labels)
          .map((key) => `${key}: ${labels[key]}`)
          .join(", ");
      },
      width: "15%",
      icon: "fa-tags",
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
