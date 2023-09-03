import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import CMSSidebar from "./CMSSidebar";
import { Row,Col } from "react-bootstrap";

const CMSLayout = (props) => {
  return (
    <main>
      <Row className="vh-100  d-flex align-items-center justify-content-center ubantu-font overflow-hidden">
        <Col xs={2} className="h-100 position-relative h-100">
        <CMSSidebar />
        </Col>
        <Col  className="h-100 position-relative h-100 overflow-auto" xs={10}>{props.children}</Col>
      </Row>
    </main>
  );
};
export default CMSLayout;
