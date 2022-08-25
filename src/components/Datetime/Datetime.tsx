import { FC } from "react";
import { formatDate } from "../../utils/dates";

import styles from "./Datetime.module.css";

export type DatetimeProps = {
  date: Date;
};

export const Datetime: FC<DatetimeProps> = (props) => {
  const { date } = props;

  const datePart = formatDate(date, "MMM DD, YYYY");
  const timePart = formatDate(date, "hh:mm");

  return (
    <span>
      {datePart}
      <i className={`fa-solid fa-clock ${styles.datetimeIcon}`}></i>
      {timePart}
    </span>
  );
};
