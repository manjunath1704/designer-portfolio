import React  from 'react';
import { Container } from "react-bootstrap";
const logoDark = "./assets/logo/logo-dark.webp"
const Header = () => {
  return (
    <Container>
      <nav className="d-flex justify-content-between align-items-center py-5">
        <a href="/home" className="sid-btn__normal customFontOneBold fs-bold">Contact</a>
        <div style={{ height: "auto", width: "130px" }}>
          <img
            src={logoDark} 
            alt=""
            className="img-fluid"
          />
        </div>
        <a href="/home" className="sid-btn__filled customFontOneBold">Mail</a>
      </nav>
    </Container>
  );
};
export default Header;
