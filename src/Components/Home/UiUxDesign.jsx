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
const UiUXDesign = () => {
  return (
    <section className="sid-UiUxDesign overflow-hidden">
      <Container>
        <Row className="mb-8">
          <Col xs={12}>
            <h5 className="d-flex align-items-center justify-content-center">
              <div className="customFontThree sid-projects__titleA color-black">
                UI/UX 
              </div>
              <div className="customFontFour sid-projects__titleB color-black">
                Design
              </div>
            </h5>
          </Col>
        </Row>
        <Row className="g-4">
          {projectData.map((data, index) => {
            return (
              <Col xs={12} sm={6} lg={4} key={index}>
                <Card
                  titleColor="color-black"
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
  );
};
export default UiUXDesign;
