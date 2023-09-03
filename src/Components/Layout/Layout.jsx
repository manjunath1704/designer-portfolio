import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props) => {
  return (
    <main>
      <Header />
      {props.children}
      <Footer />
    </main>
  );
};
export default Layout;
