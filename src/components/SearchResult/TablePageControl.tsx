import { Stack, TablePagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectRepos } from "../../features/repository/repositoriesSlice";

const TablePageControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rowsPerPage = parseInt(searchParams.get("per_page") || "10");
  const page = parseInt(searchParams.get("page") || "1");

  const { total } = useAppSelector(selectRepos) || {
    total: 0,
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    searchParams.set("page", (newPage + 1).toString());
    setSearchParams(searchParams);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("per_page", e.target.value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <Stack>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        count={total}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        component="div"
      />
    </Stack>
  );
};

export default TablePageControl;
