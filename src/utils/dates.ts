const MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Nov",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Format date using the provided format string
export const formatDate = (date: Date, format = "MMM DD, YYYY; hh:mm") => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  const h = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return format
    .replace("DD", d.toString().padStart(2, "0"))
    .replace("MMM", MONTH[m])
    .replace("YYYY", y.toString())
    .replace("hh", h.toString().padStart(2, "0"))
    .replace("mm", min.toString().padStart(2, "0"))
    .replace("ss", sec.toString().padStart(2, "0"));
};
