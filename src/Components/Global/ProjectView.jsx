import { Col, Row, Image } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";
const ProjectView = ({ projectImages, projectVideos }) => {
  return (
    <>
      {/* Images : Start */}
      <section className="mb-5">
        <div className="overflow-hidden">
          <Row>
            {projectImages &&
              projectImages.map((imageUrl, index) => {
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
      </section>
      {/* Images : End */}
      {/* Videos : Start */}
      {projectVideos && (
        <section className="background-black sid-projects__videos">
          <div className="mt-14 pt-16 pb-8 container-fluid">
            <Row className="g-4">
              <Col xs={12}>
                <h2 className="sid-font__head text-5xl text-lg-9xl font-bold mb-2 text-uppercase color-white mb-3 text-center">
                  Videos
                </h2>
              </Col>
              {projectVideos &&
                projectVideos.map((videoUrl, index) => {
                  return (
                    <Col
                      lg={10}
                      key={index}
                      className={`my-8 ${index % 2 === 0 ? "me-auto" : "ms-auto"}`}
                    >
                      <Player src={videoUrl}>
                        <BigPlayButton position="center" />
                      </Player>
                    </Col>
                  );
                })}
            </Row>
          </div>
        </section>
      )}
      {/* Videos : End */}
    </>
  );
};
export default ProjectView;
