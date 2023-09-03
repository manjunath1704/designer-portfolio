import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Contact from './Views/Contact';
import Login from './Views/ContentManager/Login';
import CreateUiUxProjects from './Views/ContentManager/UiUx/create';

const AppRoutes = () => {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/create-uiux-projects" element={<CreateUiUxProjects/>}/>
    </Routes>
    </Router>
  )
}
export default AppRoutes;