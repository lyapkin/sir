import { AppBar, Toolbar } from "@mui/material";
import Search from "./Search";
import s from "./Header.module.sass";

const Header = () => {
  return (
    <AppBar position="static" className={s.header} elevation={0}>
      <Toolbar variant="dense" disableGutters={true}>
        <Search />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
