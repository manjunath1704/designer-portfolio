import React from "react";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";

const servicesData = [
  {
    ServicesTitle: "Research and Discovery",
    servicesDescription:
      "Understanding brand, target audience, & project goals to create a solid foundation for design decisions",
  },
  {
    ServicesTitle: "Wireframing and Prototyping",
    servicesDescription:
      "Developing low-fidelity wireframes and interactive prototypes to visualize the user flow and structure of the project",
  },
  {
    ServicesTitle: "UI Design",
    servicesDescription:
      "Crafting visually appealing and consistent user interfaces that align with your brand identity while focusing on usability",
  },
  {
    ServicesTitle: "Final Deliverables",
    servicesDescription:
      "Providing you with high-fidelity designs, design specifications, and assets ready for development.",
  },
];

const ServicesCard = ({ cardTitle, cardDescription, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      },
    },
  };
  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <h6 className="text-2xl text-lg-4xl color-white sid-font__body font-bold mb-2 mb-lg-5">
        {cardTitle}
      </h6>
      <p className="text-md text-lg-xl color-white sid-font__body mb-0">
        {cardDescription}
      </p>
    </motion.article>
  );
};
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
        <Row className="g-4 g-lg-5">
          {servicesData.map((data, index) => {
            return (
              <Col xs={12} sm={6} key={index}>
                <ServicesCard
                  cardTitle={data.ServicesTitle}
                  cardDescription={data.servicesDescription}
                  delay={0.4 * index}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
export default Services;
