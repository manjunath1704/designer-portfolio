import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../Global/Card";

const projectData = [
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/datautics-website.png",
    projectLink: "",
  },

  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/useralia-website-xs-a.png",
    projectLink: "",
  },
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/maven-thumbnail.png",
    projectLink: "",
  },
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/useralia-website-xs-b.png",
    projectLink: "",
  },
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/edlore-xs.png",
    projectLink: "",
  },
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/genex-website-xs.png",
    projectLink: "",
  },
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/limitless-xs.png",
    projectLink: "",
  },
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:"/assets/thumbnails/projects/one-hat-a.png",
    projectLink: "",
  }
];
const UiUxProjects = () => {
  return (
   
      <section className="sid-section sid-UiUxProjects position-relative overflow-hidden">
        <div className="sid-UiUxProjects__shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-3.5 0.8048839569091797 1305.5 3830.695068359375"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            role="img"
          >
            <path
              d="M187.925 5.86567L-3.5 31.5V3770.5L1287.5 3831.5L1302 31.5L1121.38 46.609C1067.02 51.1565 1012.29 44.7187 960.47 27.679C891.42 4.97521 817.547 1.19486 746.541 16.7315L697.023 27.5663C618.877 44.6652 538.013 45.1827 459.655 29.0852L378.95 12.5058C316.098 -0.406028 251.522 -2.65073 187.925 5.86567Z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <Container>
          <Row className="mb-8 position-relative z-5">
            <Col xs={12}>
              
              <h5 className="color-white text-4xl text-lg-8xl sid-font__head text-center mb-5">
                UI UX Design Projects
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
                    delay={0.6 * index}
                  />
                 
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
  );
};
export default UiUxProjects;