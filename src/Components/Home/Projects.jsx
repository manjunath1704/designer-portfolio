import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const projectsData = [
  {
    projectLink:
      "https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles",
    backgroundImage:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-47ceafde-6060-4820-9bee-c81047e2a5b6.png?h=612&e=webp&nll=true",
  },
  {
    projectLink:
      "https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles",
    backgroundImage:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-47ceafde-6060-4820-9bee-c81047e2a5b6.png?h=612&e=webp&nll=true",
  },
  {
    projectLink:
      "https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles",
    backgroundImage:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-b65a7fba-e69d-4c95-a0a7-d359444f254a.png?h=612&e=webp&nll=true",
  },
  {
    projectLink:
      "https://stackoverflow.com/questions/39195687/setting-a-backgroundimage-with-react-inline-styles",
    backgroundImage:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-d2556dfa-cc47-4521-b6b9-d671ebde75b8.png?h=612&e=webp&nll=true",
  },
];
const SlideImage = ({ backgroundImage, projectLink }) => {
  return (
    <a href={projectLink} className="d-block">
      <div className="sid-projects__slide">
        <img
          src={backgroundImage}
          alt=""
          className="sid-projects__image w-100 h-100 d-block"
        />
      </div>
    </a>
  );
};
const Projects = () => {
  return (
    <section className="sid-section sid-projects">
      <Container className="sid-projects__wrapper">
        <h5 className="color-black text-4xl text-lg-8xl sid-font__head text-center mb-10">
          My most recent projects
        </h5>
        <Row className="justify-content-center">
          <Col xs={11}>
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="sid-projects__slider pb-18"
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            >
              {projectsData.map((data, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SlideImage
                      projectLink={data.projectLink}
                      backgroundImage={data.backgroundImage}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Projects;
