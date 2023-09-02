import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Contact from './Views/Contact';

const AppRoutes = () => {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </Router>
  )
}
export default AppRoutes;