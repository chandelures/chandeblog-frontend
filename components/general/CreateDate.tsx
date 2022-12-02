import { Typography } from "@mui/material";

interface CreateDateProps {
  dateStr: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return monthNames[month] + " " + day + ", " + year;
};

export default function CreateDate(props: CreateDateProps) {
  const { dateStr } = props;
  return (
    <Typography variant="subtitle1" color="text.secondary">
      {formatDate(dateStr)}
    </Typography>
  );
}
