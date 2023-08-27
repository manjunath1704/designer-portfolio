import Layout from "./Components/Layout/Layout";
import Hero from "./Components/Home/Hero";
import BrandIdentity from "./Components/Home/BrandIdentity";
import UiUXDesign from "./Components/Home/UiUxDesign";
import Services from "./Components/Home/Services";

function App() {
  return (
    <Layout>
      <Hero />
      <BrandIdentity />
      <UiUXDesign />
      <Services />
    </Layout>
  );
}

export default App;
