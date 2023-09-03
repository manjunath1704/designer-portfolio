import BrandIdentity from "../Components/Home/BrandIdentity";
import Hero from "../Components/Home/Hero";
import Projects from "../Components/Home/Projects";
import Services from "../Components/Home/Services";
import UiUXDesign from "../Components/Home/UiUxDesign";
import Layout from "../Components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <BrandIdentity />
      <UiUXDesign />
      <Services />
    </Layout>
  );
};
export default Home;
