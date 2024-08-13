import React, { PropsWithChildren } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
