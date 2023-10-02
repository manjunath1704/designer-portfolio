import { Link } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
const NotFound = () => {
  return (
   <Layout>
     <section className="bg-purple sid-not-found overflow-hidden">
      <div className="stars h-100" style={{backgroundImage:'url(/assets/not-found/overlay_stars.svg)'}}>
        <div className="h-100 d-flex align-items-center justify-content-center flex-column">
          <h5 className="font-bold text-light font-body sid-not-found__title">404</h5>
          <p className="text-uppercase text-light text-lg text-lg-xl">Looks like you are</p>
          <p className="text-uppercase text-light text-lg text-lg-xl">Lost in SPACE</p>
        <div className="mt-6">
        <Link className="d-inline-block bg-transparent sid-button__login color-white text-md px-8" to="/">
            Land in the world of Living
          </Link>
        </div>
        </div>
        <div className="objects">
          <img
            alt=""
            className="object_rocket"
            src="/assets/not-found/rocket.svg"
            width="40px"
          />
          <div className="earth-moon">
            <img
              alt=""
              className="object_earth"
              src="/assets/not-found/earth.svg"
              width="100px"
            />
            <img
              alt=""
              className="object_moon"
              src="/assets/not-found/moon.svg"
              width="80px"
            />
          </div>
          <div className="box_astronaut">
            <img
              alt=""
              className="object_astronaut"
              src="/assets/not-found/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </section>
   </Layout>
  );
};
export default NotFound;