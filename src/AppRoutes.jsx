import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from './Components/Auth/AuthContext';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import { useEffect, useState } from "react";
// import Home from "./Views/Home";
import Contact from "./Views/Contact";
import ProjectView from "./Views/ProjectView";
import ProjectDetails from "./Views/ProjectDetails";
import Edlore from "./Views/ProjectViews/Edlore";
import MavenSilicon from "./Views/ProjectViews/MavenSIlicon";
import EmailMarketing from "./Views/ProjectViews/EmailMarketing";
import SocialMedia from "./Views/ProjectViews/SocialMedia";
import LimitLess from "./Views/ProjectViews/LimitLess";
import Useralia from "./Views/ProjectViews/Useralia";
import Genex from "./Views/ProjectViews/Genex";
import NotFound from "./Views/404";
// import UploadResume from "./Views/UploadResume";
import LoginPage from './Views/LoginPage';
import CreateProject from './Views/CreateProject';
import ProjectDetail from './Components/CMS/ProjectDetail';
import ResumeManager from './Components/CMS/ResumeManage';
import Projects from './Components/CMS/Projects';
import HomeNew from './Views/HomeNew';
import JokePage from './Components/CMS/JokesPage';

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
      {/* <CreatePr/> */}

      <Routes>
        { /* Public routes : Start */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/project-view" element={<ProjectView />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/edlore" element={<Edlore />} />
        <Route path="/maven-silicon" element={<MavenSilicon />} />
        <Route path="/email-marketing" element={<EmailMarketing />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/limitless" element={<LimitLess />} />
        <Route path="/useralia" element={<Useralia />} />
        <Route path="/genex" element={<Genex />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/manage-resume-9880274931" element={<UploadResume />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects/:title" element={<ProjectDetail />} />
        <Route path="/" element={ <HomeNew/>} />
        { /* Public routes : End */}

        {/* Protected routes : Start */}
        <Route path="/admin/create-project" element={<ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>}/>

        <Route path="/admin/manage-resume" element={<ProtectedRoute>
          <ResumeManager />
        </ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute>
          <Projects/>
        </ProtectedRoute>} />
        <Route path="/admin/jokes" element={<ProtectedRoute>
          <JokePage/>
        </ProtectedRoute>} />
        
        {/* Protected routes : end */}
      
      </Routes>
    </Router>
  );
};
export default AppRoutes;
