import React from "react";
import Footer from "./Footer";
import HeaderSecondary from "./HeaderSecondary";

const LayoutSecondary = (props) => {
  return (
    <main>
      <HeaderSecondary />
      {props.children}
      <Footer />
    </main>
  );
};
export default LayoutSecondary;
