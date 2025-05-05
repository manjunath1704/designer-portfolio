// //EmailersSocialMediaMarketing

// import React from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import Card from "../Global/Card";

// const EmailersSocialMediaMarketing = ({ projects }) => {
//   return (
//     <section className="sid-section sid-marketingStuff overflow-hidden position-relative">
//      <div className="sid-marketingStuff__shape">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="-30 0.9927821159362793 1337 2867.00732421875"
//           fill="none"
//           preserveAspectRatio="xMidYMid meet"
//           role="img"
//         >
//           <path
//             d="M2.97947 8.30054L-13.7289 20.2833C-23.9426 27.6083 -30 39.4068 -30 51.9756V2829C-30 2850.54 -12.5391 2868 9 2868H1268C1289.54 2868 1307 2850.54 1307 2829V51.9755C1307 39.4067 1300.94 27.6083 1290.73 20.2833L1274.02 8.30052C1260.43 -1.44313 1242.15 -1.44313 1228.56 8.30052L1218.31 15.652C1204.73 25.3957 1186.44 25.3957 1172.85 15.652L1162.6 8.30056C1149.02 -1.44311 1130.73 -1.44312 1117.15 8.30053L1106.9 15.652C1093.31 25.3957 1075.02 25.3957 1061.44 15.652L1051.19 8.30056C1037.6 -1.44311 1019.32 -1.44312 1005.73 8.30053L995.479 15.652C981.893 25.3957 963.607 25.3957 950.021 15.652L939.771 8.30053C926.184 -1.44312 907.899 -1.44312 894.313 8.30054L884.062 15.652C870.476 25.3957 852.191 25.3957 838.604 15.652L828.354 8.30054C814.768 -1.44312 796.482 -1.44313 782.896 8.30052L772.646 15.652C759.059 25.3957 740.774 25.3957 727.188 15.652L716.937 8.30055C703.351 -1.44311 685.066 -1.44312 671.479 8.30054L661.229 15.652C647.643 25.3957 629.357 25.3957 615.771 15.652L605.521 8.30053C591.934 -1.44312 573.649 -1.44312 560.063 8.30054L549.812 15.652C536.226 25.3957 517.941 25.3957 504.354 15.652L494.104 8.30054C480.518 -1.44311 462.232 -1.44311 448.646 8.30054L438.396 15.652C424.809 25.3957 406.524 25.3957 392.938 15.652L382.687 8.30054C369.101 -1.44312 350.816 -1.44312 337.229 8.30054L326.979 15.652C313.393 25.3957 295.107 25.3957 281.521 15.652L271.271 8.30053C257.684 -1.44312 239.399 -1.44312 225.813 8.30054L215.562 15.652C201.976 25.3957 183.691 25.3957 170.104 15.652L159.854 8.30054C146.268 -1.44311 127.982 -1.44311 114.396 8.30054L104.146 15.652C90.5593 25.3957 72.274 25.3957 58.6878 15.652L48.4372 8.30054C34.851 -1.44312 16.5657 -1.44312 2.97947 8.30054Z"
//             fill="#E4FBFF"
//           ></path>
//         </svg>
//       </div>
//       <Container>
//         <Row className="mb-8 position-relative z-5">
//           <Col xs={12}>
//           <h5 className="color-black text-4xl text-lg-8xl sid-font__head text-center mb-5">
//             Emailers and Social media Marketing
//             </h5>
//           </Col>
//         </Row>
//         <Row className="g-4">
//           {projects.map((data, index) => {
//             const projectSlug = data.title.toLowerCase().split(' ').join('-');
//             return (
//               <Col xs={12} sm={6} lg={4} key={data.id}>
//                 <Card
//                   titleColor="color-white"
//                   projectThumbnail={data.thumbnail?.desktop || data.thumbnail?.mobile}
//                   projectTitle={data.title}
//                   projectLink={`/projects/${projectSlug}`}
//                   delay={0.6 * index}
//                 />
//               </Col>
//             );
//           })}
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default EmailersSocialMediaMarketing

import React, { useRef, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../Global/Card";
import { motion, useAnimation, useInView } from "framer-motion";

const EmailersSocialMediaMarketing = ({ projects }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // delay between each card
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      // ref={sectionRef}
      // variants={sectionVariants}
      // initial="hidden"
      // animate={controls}
      className="sid-section sid-marketingStuff overflow-hidden position-relative"
    >
      <div className="sid-marketingStuff__shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-30 0.9927821159362793 1337 2867.00732421875"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          role="img"
        >
          <path
            d="M2.97947 8.30054L-13.7289 20.2833C-23.9426 27.6083 -30 39.4068 -30 51.9756V2829C-30 2850.54 -12.5391 2868 9 2868H1268C1289.54 2868 1307 2850.54 1307 2829V51.9755C1307 39.4067 1300.94 27.6083 1290.73 20.2833L1274.02 8.30052C1260.43 -1.44313 1242.15 -1.44313 1228.56 8.30052L1218.31 15.652C1204.73 25.3957 1186.44 25.3957 1172.85 15.652L1162.6 8.30056C1149.02 -1.44311 1130.73 -1.44312 1117.15 8.30053L1106.9 15.652C1093.31 25.3957 1075.02 25.3957 1061.44 15.652L1051.19 8.30056C1037.6 -1.44311 1019.32 -1.44312 1005.73 8.30053L995.479 15.652C981.893 25.3957 963.607 25.3957 950.021 15.652L939.771 8.30053C926.184 -1.44312 907.899 -1.44312 894.313 8.30054L884.062 15.652C870.476 25.3957 852.191 25.3957 838.604 15.652L828.354 8.30054C814.768 -1.44312 796.482 -1.44313 782.896 8.30052L772.646 15.652C759.059 25.3957 740.774 25.3957 727.188 15.652L716.937 8.30055C703.351 -1.44311 685.066 -1.44312 671.479 8.30054L661.229 15.652C647.643 25.3957 629.357 25.3957 615.771 15.652L605.521 8.30053C591.934 -1.44312 573.649 -1.44312 560.063 8.30054L549.812 15.652C536.226 25.3957 517.941 25.3957 504.354 15.652L494.104 8.30054C480.518 -1.44311 462.232 -1.44311 448.646 8.30054L438.396 15.652C424.809 25.3957 406.524 25.3957 392.938 15.652L382.687 8.30054C369.101 -1.44312 350.816 -1.44312 337.229 8.30054L326.979 15.652C313.393 25.3957 295.107 25.3957 281.521 15.652L271.271 8.30053C257.684 -1.44312 239.399 -1.44312 225.813 8.30054L215.562 15.652C201.976 25.3957 183.691 25.3957 170.104 15.652L159.854 8.30054C146.268 -1.44311 127.982 -1.44311 114.396 8.30054L104.146 15.652C90.5593 25.3957 72.274 25.3957 58.6878 15.652L48.4372 8.30054C34.851 -1.44312 16.5657 -1.44312 2.97947 8.30054Z"
            fill="#E4FBFF"
          ></path>
        </svg>
      </div>
      <Container>
        <Row className="mb-8 position-relative z-5">
          <Col xs={12}>
            <h5 className="color-black text-4xl text-lg-8xl sid-font__head text-center mb-5">
              Emailers and Social media Marketing
            </h5>
          </Col>
        </Row>
        <Row className="g-4">
          {projects.map((data) => {
            const projectSlug = data.title.toLowerCase().split(" ").join("-");
            return (
              <Col xs={12} sm={6} lg={4} key={data.id}>
                {/* <motion.div variants={cardVariants}>
                 
                </motion.div> */}
                 <Card
                    titleColor="color-white"
                    projectThumbnail={data.thumbnail?.desktop || data.thumbnail?.mobile}
                    projectTitle={data.title}
                    projectLink={`/projects/${projectSlug}`}
                  />
              </Col>
            );
          })}
        </Row>
      </Container>
    </motion.section>
  );
};

export default EmailersSocialMediaMarketing;
