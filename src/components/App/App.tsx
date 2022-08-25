import { FC, useCallback, useState } from "react";
import { DataTable, DataTableColumn } from "../DataTable";
import { PageTitle } from "../PageTitle";
import { usePodData } from "../../hooks/usePodData";
import { formatDate } from "../../utils/dates";
import { Badge } from "../Badge";
import { Status } from "../Status";

import "./App.css";
import { InputField } from "../InputField";

export const App: FC = () => {
  const [filters, setFilters] = useState<Filter<Pod>[]>([]);
  const [sort, setSort] = useState<Sort<Pod>>();
  const { pods } = usePodData(filters, sort);

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
      <PageTitle title="Pods">
        <InputField
          placeholder="Name filter..."
          onChange={(value) => {
            if (!value && filters.length) {
              setFilters([]);
            } else {
              setFilters([{ key: "name", value, type: "includes" }]);
            }
          }}
        />
      </PageTitle>
      <DataTable columns={columns} items={pods} onSort={onSort} />
    </>
  );
};
