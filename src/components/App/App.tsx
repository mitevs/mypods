import { FC, useCallback, useState } from "react";
import { DataTable, DataTableColumn } from "../DataTable";
import { PageTitle } from "../PageTitle";
import { InputField } from "../InputField";
import { Badge } from "../Badge";
import { Status } from "../Status";
import { MultiCheckbox } from "../MultiCheckbox";
import { usePodData } from "../../hooks/usePodData";
import { useFilters } from "../../hooks/useFilters";
import { Datetime } from "../Datetime";
import { Footer } from "../Footer";

import styles from "./App.module.css";

export const App: FC = () => {
  const { filters, switchFilter, switchFilterValue } = useFilters<Pod>();
  const [sort, setSort] = useState<Sort<Pod>>();
  const { pods } = usePodData(filters, sort);

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
    },
    {
      value: "Running",
      label: "Running",
    },
    {
      value: "Succeeded",
      label: "Succeeded",
    },
    {
      value: "Failed",
      label: "Failed",
    },
    {
      value: "Unknown",
      label: "Unknown",
    },
  ];

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
      title: "Created",
      key: "createdAt",
      format: (date: Date) => <Datetime date={date} />,
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
      <main>
        <PageTitle title="Kubernetes Pods">
          <MultiCheckbox
            className={styles.multicheckbox}
            options={statusOptions}
            onChange={(value, checked) =>
              switchFilterValue("status", value, checked)
            }
          />

          <InputField
            placeholder="Name filter..."
            onChange={(value) => switchFilter("name", value, !!value)}
          />
        </PageTitle>
        <DataTable columns={columns} items={pods} onSort={onSort} />
      </main>

      <Footer />
    </>
  );
};
