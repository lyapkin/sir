import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { sortableTitles, titles } from "../../features/repository/utils";

const TableHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort");
  const order = (searchParams.get("order") || "desc") as "desc" | "asc";

  const handleClick = (key: keyof typeof sortableTitles) => {
    searchParams.set("sort", key);
    const isDesc = sortBy === key && order === "desc";
    searchParams.set("order", isDesc ? "asc" : "desc");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  const headers = titles.map(([key, value]) =>
    sortableTitles[key] ? (
      <TableCell key={key}>
        <TableSortLabel
          active={sortBy === key}
          direction={order}
          onClick={() => handleClick(key)}
        >
          <Typography variant="tableHead">{value}</Typography>
        </TableSortLabel>
      </TableCell>
    ) : (
      <TableCell key={key}>
        <Typography variant="tableHead">{value}</Typography>
      </TableCell>
    )
  );
  return (
    <TableHead>
      <TableRow>{headers}</TableRow>
    </TableHead>
  );
};

export default TableHeader;
