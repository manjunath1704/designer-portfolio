import { Container, Row, Col } from "react-bootstrap";
import React  from 'react';
const logoLight = "./assets/logo/logo-light.webp";

const dataSocial = [
  { name:"Behance",
    link:"#",
    icon:"./assets/logo/behance-icon.svg",
  },
  { name:"Dribble",
    link:"#",
    icon:"./assets/logo/dribble-icon.svg",
  },
  { name:"Instagram",
  link:"#",
  icon:"./assets/logo/instagram-icon.svg"
},
  

]
const Footer = () => {
  return (
    <footer className="sid-footer">
      <div className="sid-footer__top">
        <Container>
          <Row>
            <Col xs={12}>
              <h5 className="sid-footer__title color-black text-uppercase customFontThree">
                LET'S TALK
              </h5>
              <p className="sid-footer__tag color-black text-uppercase customFontOneRegular text-6xl font-thin">
                ON TRAVAILLE ENSEMBLE ?
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="sid-footer__bottom">
        <Container>
          <Row className="g-4">
            <Col  md={6} lg={4}>
              <img src={logoLight} alt="" className="img-fluid w-75 mb-5" />
              <p className="text-uppercase color-white font-bold text-md text-lg-xl customFontOneBold w-75">
                DIRECTRICE ARTISTIQUE — UI/UX DESIGNER — GRAPHIC DESIGNER EN
                FREELANCE - BASÉE EN FRANCE
              </p>
            </Col>
            <Col md={6} lg={4}>
              <p className="color-white font-bold text-3xl text-lg-5xl customFontOneBold w-75 mb-10">
                Un projet en tête ? N'hésitez pas à me contacter !
              </p>
              <button className="sid-button__neon customFontOneBold font-bold mt-3">Contactez-moi par mail</button>
            </Col>
            <Col md={6} lg={4}>
              <p className="color-white font-thin text-md text-md-2xl text-lg-4xl customFontOneRegular">
              REJOIGNEZ-MOI SUR LES RÉSEAUX SOCIAUX !
              </p>
             <ul className="d-flex mt-6">
              {
                dataSocial.map((data,index)=>{
                  return(
                    <li key={index} className="me-5">
                      <a href={data.link}>
                         <img src={data.icon} alt={data.name} className="img-fluid" style={{height:"40px",width:'40px'}} />
                      </a>
                    </li>
                  )
                })
              }
             </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};
export default Footer;
