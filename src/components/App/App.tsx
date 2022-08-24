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
      title: "Labels",
      key: "labels",
      format: (labels: { [key: string]: string }) => {
        return Object.keys(labels)
          .map((key) => `${key}: ${labels[key]}`)
          .join(", ");
      },
    },
    {
      title: "Age",
      key: "createdAt",
      format: formatDate,
    },
  ];

  const onSort = useCallback(({ key, dir }: Sort<Pod>) => {
    setSort({ key, dir });
  }, []);

  return (
    <div>
      <DataTable columns={columns} items={pods} onSort={onSort} />
    </div>
  );
};
