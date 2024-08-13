import { Stack } from "@mui/material";
import Greet from "./Greet";
import Main from "./Main";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reset,
  searchRepositories,
  selectSearchStatus,
} from "../../features/repository/repositoriesSlice";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { RequestStatus } from "../../consts";
import s from "./Body.module.sass";

const Body = () => {
  const searchStatus = useAppSelector(selectSearchStatus);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchParams.has("q")) {
      dispatch(searchRepositories(searchParams));
    } else {
      dispatch(reset());
    }
  }, [searchParams, dispatch]);

  return (
    <Stack className={s.body}>
      {searchStatus === RequestStatus.IDLE ? <Greet /> : <Main />}
    </Stack>
  );
};

export default Body;
