// // ProjectsGrid.js
// import { useEffect, useState,useRef } from 'react';
// import { db } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { Row, Col, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";
// import { motion, useInView } from "framer-motion";

// const SlideImage = ({ backgroundImage, UrlPath }) => {
//     return (
//       <Link
//         to={UrlPath}
//         className="d-block"
//       >
//         <div className="sid-projects__slide">
//           <img
//             src={backgroundImage}
//             alt=""
//             className="sid-projects__image w-100 h-100 d-block"
//           />
//         </div>
//       </Link>
//     );
//   };
// export default function MyRecentCreatives() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const snapshot = await getDocs(collection(db, 'projects'));
//       const data = snapshot.docs.map(doc => doc.data());
//       setProjects(data);
//     };

//     fetchProjects();
//   }, []);
// console.log(projects,'projects')

// const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth <= 998); // Adjust the breakpoint as needed
//     };

//     checkIfMobile();

//     window.addEventListener("resize", checkIfMobile);
//     return () => {
//       window.removeEventListener("resize", checkIfMobile);
//     };
//   }, []);
//   return (
//     <motion.section
//     className="sid-section sid-projects"
//     ref={ref}
//     style={{
//       transform: isInView ? "none" : "translateY(200px)",
//       opacity: isInView ? 1 : 1,
//       transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
//     }}
//   >
//     <Container className="sid-projects__wrapper">
//       <h5 className="color-black text-4xl text-lg-8xl sid-font__head text-center mb-10">
//         My Recent Creatives
//       </h5>
//       <Row className="justify-content-center">
//         <Col xs={11}>
//           <Swiper
//             modules={[Autoplay, Pagination, EffectCoverflow]}
//             spaceBetween={0}
//             slidesPerView={1}
//             pagination={{ clickable: true }}
//             className="sid-projects__slider pb-18"
//             loop={true}
//             autoplay={{
//               delay: 3500,
//               disableOnInteraction: false,
//             }}
//           >
              
//             {
//             projects.map((project) => {
//               const projectSlug = project.title.toLowerCase().split(' ').join('-');

//               return (
//                 <SwiperSlide key={project.id}>
//                   <SlideImage
//                     UrlPath={`/projects/${projectSlug}`}
//                     backgroundImage={
//                       isMobile ? project.thumbnail?.mobile : project.thumbnail?.desktop
//                     }
//                   />
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </Col>
//       </Row>
//     </Container>
//   </motion.section>
//   );
// }
// components/UIDesignProjects.js
import { useRef, useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { motion, useInView } from "framer-motion";

const SlideImage = ({ backgroundImage, UrlPath }) => {
  return (
    <Link to={UrlPath} className="d-block">
      <div className="sid-projects__slide">
        <img
          src={backgroundImage}
          alt=""
          className="sid-projects__image w-100 h-100 d-block"
        />
      </div>
    </Link>
  );
};

export default function MyRecentCreatives({ projects }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 998);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <motion.section
      className="sid-section sid-projects"
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(200px)",
        opacity: isInView ? 1 : 1,
        transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
      }}
    >
      <Container className="sid-projects__wrapper">
        <h5 className="color-black text-4xl text-lg-8xl sid-font__head text-center mb-10">
        My Recent Creatives
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
              {projects.map((project) => {
                const projectSlug = project.title.toLowerCase().split(' ').join('-');
                return (
                  <SwiperSlide key={project.id}>
                    <SlideImage
                      UrlPath={`/projects/${projectSlug}`}
                      backgroundImage={
                        isMobile ? project.thumbnail?.mobile : project.thumbnail?.desktop
                      }
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
}
