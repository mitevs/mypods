import { FC } from "react";

import styles from "./Status.module.css";

const STATUS_TO_ICON: Record<string, string> = {
  Pending: "fa-hourglass-half",
  Running: "fa-rotate",
  Succeeded: "fa-circle-check",
  Failed: "fa-circle-xmark",
  Unknown: "fa-circle-question",
};

export type StatusProps = {
  status: PodStatus;
};

// renders the status for the pod with a custom icon per status
export const Status: FC<StatusProps> = (props) => {
  const { status } = props;
  return (
    <div className={`${styles.status} ${styles[status]}`}>
      <i className={`fa-solid ${STATUS_TO_ICON[status]}`}></i>
      {status}
    </div>
  );
};
