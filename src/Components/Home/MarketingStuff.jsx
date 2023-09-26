import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../Global/Card";
import db from "../../firebase";
import { collection, getDocs  } from "firebase/firestore";

const projectData = [
  {
    projectTitle: "COMPLETE APP DESIGN — MeetMySnake",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-04a659f4-3ba4-40c6-9b27-c52c7f6617a1.png?w=885&e=webp&nll=true",
    projectLink: "www.google.com",
  },
  {
    projectTitle: "WEB INTERFACE DESIGN & BRAND IDENTITY — Mes Travaux Économiques",
    projectThumbnail:
      "https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-32269c02-b7bf-4096-a1f0-e78762eaf55b.png?w=885&e=webp&nll=true&cX=0.6238447319777833&cY=0&cW=1693.7523105360444&cH=2208 2x, https://d2kq0urxkarztv.cloudfront.net/62c2eecea67ec50023695793/4046480/image-32269c02-b7bf-4096-a1f0-e78762eaf55b.png?w=1328&e=webp&nll=true&cX=0.6238447319777833&cY=0&cW=1693.7523105360444&cH=2208",
    projectLink: "www.google.com",
  }
];
const MarketingStuff = () => {
  const [projects, setProjects] = useState([]);
  const projectsCollectionRef = collection(db,"projects")
  useEffect(()=>{
    const getProjectList = async () => {
      try{
        const data = await getDocs(projectsCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id,}))
        setProjects(filteredData)
      } catch(err){
        console.error(err)
      }
    }
    getProjectList();
  }, []);
  console.log(projects, "projects");
  return (
    <>

    <section className="sid-section sid-marketingStuff overflow-hidden position-relative">
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
          {projectData.map((data, index) => {
            return (
              <Col xs={12} sm={6} lg={4} key={index}>
               <Card
                  titleColor="color-black"
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
    {/* <Row className="g-4">
          {projects.map((data) => {
            return (
              <Col xs={12} key={data.id} className="bg-danger">
                <h4>{data.description}</h4>
                <h4>{data.title}</h4>
                <h4>{data.thumbnail}</h4>
                <h4>{data.mobileThumbnail}</h4>
                 <h4>{data.category}</h4>
                 <h4>{data.coverImage}</h4>
                 
              </Col>
            );
          })}
        </Row> */}
    </>
  );
};
export default MarketingStuff;
