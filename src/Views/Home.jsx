import Hero from "../Components/Home/Hero";
import MarketingStuff from "../Components/Home/MarketingStuff";
import Projects from "../Components/Home/Projects";
import Services from "../Components/Home/Services";
import UiUxProjects from "../Components/Home/UiUxProjects";
import Layout from "../Components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <UiUxProjects />
      <MarketingStuff />
      <Services />
    </Layout>
  );
};
export default Home;
