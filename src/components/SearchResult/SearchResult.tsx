import { Stack, Table, TableContainer, Typography } from "@mui/material";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import TablePageControl from "./TablePageControl";
import s from "./SearchResult.module.sass";

const SearchResult = () => {
  return (
    <Stack className={s.searchResult}>
      <Typography variant="h3" className={s.title}>
        Результаты поиска
      </Typography>

      <TableContainer className={s.table}>
        <Table stickyHeader>
          <TableHeader />
          <TableContent />
        </Table>
      </TableContainer>

      <TablePageControl />
    </Stack>
  );
};

export default SearchResult;
