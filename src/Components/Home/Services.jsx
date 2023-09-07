import React  from 'react';
import { Col, Container, Row } from "react-bootstrap";
const servicesData = [
  {
    ServicesTitle:"Research and Discovery",
    servicesDescription:"Understanding brand, target audience, & project goals to create a solid foundation for design decisions",
  },
  {
    ServicesTitle:"Wireframing and Prototyping",
    servicesDescription:"Developing low-fidelity wireframes and interactive prototypes to visualize the user flow and structure of the project",
  },
  {
    ServicesTitle:"UI Design",
    servicesDescription:"Crafting visually appealing and consistent user interfaces that align with your brand identity while focusing on usability",
  }
  ,
  {
    ServicesTitle:"Final Deliverables",
    servicesDescription:"Providing you with high-fidelity designs, design specifications, and assets ready for development.",
  }
]
const Services = () => {
  return (
    <section className="sid-section sid-services overflow-hidden">
      <Container>
        <Row>
          <Col xs={12}>
            <h5 className="color-white text-4xl text-lg-8xl sid-font__head mb-5">
            My process involves
            </h5>
          </Col>
        </Row>
        <Row className="g-5">
          {
           servicesData.map((data,index)=>{
            return(
              <Col xs={12} sm={6} key={index}>
              <article>
              <h6 className="text-4xl color-white sid-font__body font-bold mb-5">{data.ServicesTitle}</h6>
              <p className="text-xl color-white sid-font__body mb-0">{data.servicesDescription}</p>
              </article>
            </Col>
            )
           })
          }
        </Row>
      </Container>
     
    </section>
  );
};
export default Services;
