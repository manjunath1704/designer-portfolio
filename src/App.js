import React  from 'react';
import Layout from "./Components/Layout/Layout";
import Hero from "./Components/Home/Hero";
import BrandIdentity from "./Components/Home/BrandIdentity";
import UiUXDesign from "./Components/Home/UiUxDesign";
import Services from "./Components/Home/Services";
import Projects from './Components/Home/Projects';

function App() {
  return (
    <Layout>
      <Hero />
      <Projects/>
      <BrandIdentity />
      <UiUXDesign />
      <Services />
    </Layout>
  );
}

export default App;
