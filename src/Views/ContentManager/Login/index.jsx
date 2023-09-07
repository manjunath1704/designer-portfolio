import { Container, Row, Col } from "react-bootstrap";
import LoginButton from "../../../Components/Buttons/Login";
const ladyHoldingFlowers = "./assets/illustrations/walking-into-dream-world.svg";
const Login = () => {
  return (
    <section className="vh-100  d-flex align-items-center justify-content-center ubantu-font background-black">
      <Container>
        <Row>
          <Col md={5}>
            <div className="mb-6">
              <h2 className="text-3xl mb-1 color-black">
                {/* How.dy <span className="cms-app-color">SID</span>{" "} */}
              </h2>
              <p className="text-md mb-0 color-white opacity-6">
                Sign in to continue
              </p>
            </div>
            <form action="">
              <div class="mb-4">
                <label
                  for="exampleFormControlInput1"
                  className="text-lg text-center font-semibold mb-2 color-white opacity-6"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent p-3 color-white opacity-6"
                  id="exampleFormControlInput1"
                  placeholder="Enter email"
                />
              </div>
              <div class="mb-4">
                <label
                  for="exampleFormControlInput1"
                  className="text-lg text-center font-semibold mb-2 color-white opacity-6"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent p-3 color-white opacity-6"
                  id="exampleFormControlInput1"
                  placeholder="Enter password"
                />
              </div>
              <LoginButton
                name="Log In"
                type="submit"
                additionalClass="text-xl px-18 mt-2"
              />
            </form>
          </Col>
          <Col md={7}>
            {/* <img
              src={ladyHoldingFlowers}
              className="img-fluid"
              alt=""
            /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
