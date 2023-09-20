import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Contact from './Views/Contact';
import Login from './Views/ContentManager/Login';
import CreateUiUxProjects from './Views/ContentManager/UiUx/create';
import ProjectView from './Views/ProjectView';
import CreateProject from './Views/ContentManager/Projects/Create';

const AppRoutes = () => {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/create-uiux-projects" element={<CreateUiUxProjects/>}/>
      <Route path="/project-view" element={<ProjectView/>}/>
      <Route path="/cms/create-project" element={<CreateProject/>}/>
    </Routes>
    </Router>
  )
}
export default AppRoutes;