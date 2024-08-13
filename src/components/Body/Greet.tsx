import { Typography } from "@mui/material";
import s from "./Body.module.sass";

const Greet = () => {
  return (
    <Typography variant="h3" className={s.greet}>
      Добро пожаловать
    </Typography>
  );
};

export default Greet;
