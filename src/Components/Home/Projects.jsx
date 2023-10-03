import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
const projects = [
  {
    thumbnail:"/assets/projects-slider/edlore.jpg",
    mobileThumbnail:"/assets/projects-slider/edlore-mobile.png",
    link:"/edlore",
  },
  {
    thumbnail:"/assets/projects-slider/emailer.png",
    mobileThumbnail:"/assets/projects-slider/emailer-mobile.png",
    link:"/email-marketing",
  },
  {
    thumbnail:"/assets/projects-slider/maven.png",
    mobileThumbnail:"/assets/projects-slider/maven-mobile.png",
    link:"/maven-silicon",
  },
  {
    thumbnail:"/assets/projects-slider/social-media-marketing.png",
    mobileThumbnail:"/assets/projects-slider/social-media-marketing-mobile.png",
    link:"/social-media",
  }
]

const SlideImage = ({ backgroundImage, UrlPath }) => {
  return (
    <Link
      to={UrlPath}
      className="d-block"
    >
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
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 998); // Adjust the breakpoint as needed
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
              {projects.map((data, index) => {
                return (
                  <SwiperSlide key={index}>
                    <SlideImage
                      UrlPath={data.link}
                      backgroundImage={
                        isMobile ? data.mobileThumbnail : data.thumbnail
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
};
export default Projects;



// import { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/effect-coverflow";
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { Link } from "react-router-dom";
// import db from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const SlideImage = ({ backgroundImage, data, title }) => {
//   const noSpaceTitle = title.split(" ")?.join("-");

//   return (
//     <Link
//       to={`/project-details/${noSpaceTitle}`}
//       state={{ details: data }}
//       className="d-block"
//     >
//       <div className="sid-projects__slide">
//         <img
//           src={backgroundImage}
//           alt=""
//           className="sid-projects__image w-100 h-100 d-block"
//         />
//       </div>
//     </Link>
//   );
// };
// const Projects = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   const [projects, setProjects] = useState([]);
//   const projectsCollectionRef = collection(db, "projects");
//   useEffect(() => {
//     const getProjectList = async () => {
//       try {
//         const data = await getDocs(projectsCollectionRef);
//         const filteredData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         setProjects(filteredData);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getProjectList();
//   }, []);
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
//       className="sid-section sid-projects"
//       ref={ref}
//       style={{
//         transform: isInView ? "none" : "translateY(200px)",
//         opacity: isInView ? 1 : 1,
//         transition: "all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
//       }}
//     >
//       <Container className="sid-projects__wrapper">
//         <h5 className="color-black text-4xl text-lg-8xl sid-font__head text-center mb-10">
//           My Recent Creatives
//         </h5>
//         <Row className="justify-content-center">
//           <Col xs={11}>
//             <Swiper
//               modules={[Autoplay, Pagination, EffectCoverflow]}
//               spaceBetween={0}
//               slidesPerView={1}
//               pagination={{ clickable: true }}
//               className="sid-projects__slider pb-18"
//               loop={true}
//               autoplay={{
//                 delay: 3500,
//                 disableOnInteraction: false,
//               }}
//             >
//               {projects.map((data, index) => {
//                 return (
//                   <SwiperSlide key={index}>
//                     <SlideImage
//                       data={data}
//                       title={data.title}
//                       projectLink={data.projectLink}
//                       backgroundImage={
//                         isMobile ? data.mobileThumbnail : data.thumbnail
//                       }
//                     />
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>
//           </Col>
//         </Row>
//       </Container>
//     </motion.section>
//   );
// };
// export default Projects;
