import React  from 'react';
import { useState } from "react";
import { Container } from "react-bootstrap";
import PopUp from '../Global/PopUp';
const logoDark = "./assets/logo/logo-dark.webp"
const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

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
      <button onClick={openPopup}>Open Popup</button>
      <PopUp isOpen={isPopupOpen} onClose={closePopup} >
      <h5 className='text-4xl font-bold color-white'> Log in to continue</h5>
      </PopUp>
    </Container>
  );
};
export default Header;
