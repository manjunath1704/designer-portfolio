import React from "react";
import AdminHeader from "./AdminHeader";

const LayoutAdmin = (props) => {
  return (
    <main>
      <AdminHeader />
      {props.children}
     
    </main>
  );
};
export default LayoutAdmin;
