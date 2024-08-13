import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  select,
  selectError,
  selectRepos,
  selectSearchStatus,
  selectSelectedRepo,
} from "../../features/repository/repositoriesSlice";
import { titles } from "../../features/repository/utils";
import { RequestStatus } from "../../consts";
import { useSearchParams } from "react-router-dom";

const TableContent = () => {
  const { items: repos } = useAppSelector(selectRepos) || {
    items: [],
  };
  const selectedRepo = useAppSelector(selectSelectedRepo);
  const searchStatus = useAppSelector(selectSearchStatus);
  const error = useAppSelector(selectError);
  const rowsPerPage = Number(useSearchParams()[0].get("per_page") || "10");

  const dispatch = useAppDispatch();
  const handleClick = (id: number) => {
    dispatch(select(id));
  };

  const body =
    searchStatus === RequestStatus.SUCCEEDED ? (
      repos?.map((repo) => (
        <TableRow
          key={repo.id}
          hover
          selected={selectedRepo?.id === repo.id}
          sx={{ cursor: "pointer" }}
          onClick={() => handleClick(repo.id)}
        >
          <TableCell>{repo[titles[0][0]]}</TableCell>
          <TableCell>{repo[titles[1][0]]}</TableCell>
          <TableCell>{repo[titles[2][0]]}</TableCell>
          <TableCell>{repo[titles[3][0]]}</TableCell>
          <TableCell>{repo[titles[4][0]]}</TableCell>
        </TableRow>
      ))
    ) : searchStatus === RequestStatus.LOADING ? (
      new Array(rowsPerPage).fill(1).map((item, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={5} align="center">
          {error}
        </TableCell>
      </TableRow>
    );

  return <TableBody>{body}</TableBody>;
};

export default TableContent;
