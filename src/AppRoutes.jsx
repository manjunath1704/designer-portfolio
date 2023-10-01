import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./Views/Home";
import Contact from "./Views/Contact";
import Login from "./Views/ContentManager/Login";
import CreateUiUxProjects from "./Views/ContentManager/UiUx/create";
import ProjectView from "./Views/ProjectView";
import CreateProject from "./Views/ContentManager/Projects/Create";
// import Cfff from "./Views/ContentManager/Projects/Cfff";
import ProjectDetails from "./Views/ProjectDetails";
import Edlore from "./Views/ProjectViews/Edlore";
import MavenSilicon from "./Views/ProjectViews/MavenSIlicon";
import EmailMarketing from "./Views/ProjectViews/EmailMarketing";
import SocialMedia from "./Views/ProjectViews/SocialMedia";
import LimitLess from "./Views/ProjectViews/LimitLess";
import Useralia from "./Views/ProjectViews/Useralia";
import Genex from "./Views/ProjectViews/Genex";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-uiux-projects" element={<CreateUiUxProjects />} />
        <Route path="/project-view" element={<ProjectView />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/cms/create-project" element={<CreateProject />} />
        <Route path="/edlore" element={<Edlore />} />
        <Route path="/maven-silicon" element={<MavenSilicon />} />
        <Route path="/email-marketing" element={<EmailMarketing />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/limitless" element={<LimitLess />} />
        <Route path="/useralia" element={<Useralia />} />
        <Route path="/genex" element={<Genex />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
