import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
import { Player, BigPlayButton } from "video-react";
const ProjectDetails = () => {
  const location = useLocation();
  const { details } = location.state;
  console.log(details, "details found");

  return (
    <LayoutSecondary>
      <div className="overflow-hidden">
        <Row>
          {details &&
            details.projectImages &&
            details.projectImages.map((imageUrl, index) => {
              return (
                <Col xs={12}>
                  <Image
                    src={imageUrl}
                    alt={`maven-silicon-${index}`}
                    key={index}
                    fluid
                  />
                </Col>
              );
            })}
        </Row>
      </div>
      {details && details.projectVideos.length > 0 && (
        <section className="background-black">
          <Container className="mt-14 pt-16 pb-8 ">
            <Row className="g-4">
              <Col xs={12}>
                <h2 className="sid-font__head text-5xl text-lg-9xl font-bold mb-2 text-uppercase color-white mb-3">
                  Videos
                </h2>
              </Col>
              {details &&
                details.projectVideos &&
                details.projectVideos.map((videoUrl, index) => {
                  return (
                    <Col lg={6} key={index}>
                      {/* <video controls muted>
                        <source src={videoUrl} type="video/mp4" />
                      </video> */}
                      <Player src={videoUrl}  poster="/assets/thumbnails/projects/datautics-website.png">
                        
                        <BigPlayButton position="center" />
                      </Player>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </section>
      )}
    </LayoutSecondary>
  );
};

export default ProjectDetails;
