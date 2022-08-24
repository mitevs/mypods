import { FC, useCallback, useState } from "react";
import { DataTable, DataTableColumn } from "../DataTable";
import { usePodData } from "../../hooks/usePodData";
import { formatDate } from "../../utils/dates";
import { Badge } from "../Badge";
import { Status } from "../Status";

import "./App.css";

export const App: FC = () => {
  const [sort, setSort] = useState<Sort<Pod>>();
  const { pods } = usePodData(sort);

  // table colum config
  const columns: DataTableColumn<Pod>[] = [
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
      format: (status: PodStatus) => <Status status={status} />,
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
      format: (labels: PodLabel[]) => {
        return (
          <>
            {labels.map(({ name, value }) => (
              <Badge key={name}>
                <strong>{name}</strong>: {value}
              </Badge>
            ))}
          </>
        );
      },
      width: "25%",
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
