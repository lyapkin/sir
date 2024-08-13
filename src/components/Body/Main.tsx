import { Grid } from "@mui/material";
import SearchResult from "../SearchResult/SearchResult";
import RepoDetails from "../RepoDetails/RepoDetails";
import s from "./Body.module.sass";

const Main = () => {
  return (
    <Grid container className={s.main}>
      <Grid item md={8} className={s.item}>
        <SearchResult />
      </Grid>
      <Grid item md={4} className={s.item}>
        <RepoDetails />
      </Grid>
    </Grid>
  );
};

export default Main;
