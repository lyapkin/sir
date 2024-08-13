import { Button, Grid, Stack, TextField } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectSearchStatus } from "../../features/repository/repositoriesSlice";
import { useSearchParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { RequestStatus } from "../../consts";

const Search = () => {
  const searchStatus = useAppSelector(selectSearchStatus);

  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query === "") {
      setSearchParams({});
    } else if (searchStatus !== RequestStatus.LOADING) {
      setSearchParams({ q: query });
    }
  };

  return (
    <Grid container component="form" onSubmit={handleSubmit}>
      <Grid item xs={12} md={9}>
        <Stack direction="row" spacing={1}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            label="Введите поисковый запрос"
            size="small"
            fullWidth={true}
          />
          <Button variant="contained" size="large" type="submit">
            Искать
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Search;
