import Layout from "../Components/Layout/Layout";
import Hero from "../Components/ProjectView/Hero";
const backgroundImage ="./assets/unnamed.jpg";
const ProjectView = () => {
  return (
    <Layout>
      <Hero
        heroTitle="Customizing Material"
        heroDesc="Customization creates unique branded products with familiar patterns and accessible interactions"
        backgroundImage={backgroundImage}
      />
    </Layout>
  );
};
export default ProjectView;
