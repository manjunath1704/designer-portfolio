import { Container } from "react-bootstrap";
const Header = () => {
  return (
    <Container>
      <nav className="d-flex justify-content-between align-items-center py-5">
        <a href="/home" className="sid-btn__normal customFontOneBold fs-bold">Contact</a>
        <div style={{ height: "auto", width: "130px" }}>
          <img
            src="./assets/logo/image-6bd9f599-1d26-494e-91d8-833963e9da75.webp"
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
