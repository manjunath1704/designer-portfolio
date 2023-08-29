import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Projects = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col xs={12}>
            <Swiper
              modules={[Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="sid-projects__slider"
            >
              <SwiperSlide>
                <div className="sid-projects__slider"></div>
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Projects;
