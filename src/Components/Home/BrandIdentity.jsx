import React  from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Card from "../Global/Card";
const projectData = [
  {
    projectTitle: "GRAPHIC DESIGN, LOGO —  GoToGo",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-04a659f4-3ba4-40c6-9b27-c52c7f6617a1.png?w=885&e=webp&nll=true",
    projectLink: "www.google.com",
  },
  {
    projectTitle: "GRAPHIC DESIGN, LOGO —  GoToGo",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-32269c02-b7bf-4096-a1f0-e78762eaf55b.png?w=885&e=webp&nll=true&cX=0.6238447319777833&cY=0&cW=1693.7523105360444&cH=2208 2x, https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-32269c02-b7bf-4096-a1f0-e78762eaf55b.png?w=1328&e=webp&nll=true&cX=0.6238447319777833&cY=0&cW=1693.7523105360444&cH=2208",
    projectLink: "www.google.com",
  },
  {
    projectTitle: "GRAPHIC DESIGN, LOGO —  GoToGo",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-04a659f4-3ba4-40c6-9b27-c52c7f6617a1.png?w=885&e=webp&nll=true",
    projectLink: "www.google.com",
  },
  {
    projectTitle: "GRAPHIC DESIGN, LOGO —  GoToGo",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-04a659f4-3ba4-40c6-9b27-c52c7f6617a1.png?w=885&e=webp&nll=true",
    projectLink: "www.google.com",
  },
  {
    projectTitle: "GRAPHIC DESIGN, LOGO —  GoToGo",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-32269c02-b7bf-4096-a1f0-e78762eaf55b.png?w=885&e=webp&nll=true&cX=0.6238447319777833&cY=0&cW=1693.7523105360444&cH=2208 2x, https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-32269c02-b7bf-4096-a1f0-e78762eaf55b.png?w=1328&e=webp&nll=true&cX=0.6238447319777833&cY=0&cW=1693.7523105360444&cH=2208",
    projectLink: "www.google.com",
  },
  {
    projectTitle: "GRAPHIC DESIGN, LOGO —  GoToGo",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-04a659f4-3ba4-40c6-9b27-c52c7f6617a1.png?w=885&e=webp&nll=true",
    projectLink: "www.google.com",
  },
];
const BrandIdentity = () => {
  return (
    < >
    <section className="sid-brand position-relative overflow-hidden">
   <div className="sid-brand__shape">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3.5 0.8048839569091797 1305.5 3830.695068359375" fill="none" preserveAspectRatio="xMidYMid meet" role="img">
<path d="M187.925 5.86567L-3.5 31.5V3770.5L1287.5 3831.5L1302 31.5L1121.38 46.609C1067.02 51.1565 1012.29 44.7187 960.47 27.679C891.42 4.97521 817.547 1.19486 746.541 16.7315L697.023 27.5663C618.877 44.6652 538.013 45.1827 459.655 29.0852L378.95 12.5058C316.098 -0.406028 251.522 -2.65073 187.925 5.86567Z" fill="#0E0E0E"></path>
</svg>
   </div>
      <Container>
        <Row className="mb-8 position-relative z-5">
          <Col xs={12}>
            <h5 className="d-flex align-items-center justify-content-center">
              <div className="customFontThree sid-brand__titleA color-white">
                BRAND
              </div>
              <div className="customFontFour sid-brand__titleB color-white">
                Identity
              </div>
            </h5>
          </Col>
        </Row>
        <Row className="g-4">
          {projectData.map((data, index) => {
            return (
              <Col xs={12} sm={6} lg={4} key={index}>
                <Card
                  titleColor="color-white"
                  projectThumbnail={data.projectThumbnail}
                  projectTitle={data.projectTitle}
                  projectLink={data.projectLink}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
    </>
  );
};
export default BrandIdentity;
