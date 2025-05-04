import { db } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import ProjectsGrid from "../Components/CMS/ProjectsGrid";
import Hero from "../Components/Home/Hero";
import Services from "../Components/Home/Services";
import MyRecentCreatives from "../Components/Homec/MyRecentCreatives";
import Layout from "../Components/Layout/Layout";
import { useEffect, useState } from 'react';
import UiUxProjects from "../Components/Homec/UiUxProjects";
import EmailersSocialMediaMarketing from "../Components/Homec/EmailersSocialMediaMarketing";


const HomeNew = () => {
    const [recentCreatives, setRecentCreatives] = useState([]);
    const [uiuxProjects, setUiuxProjects] = useState([]);
    const [emailersSocial, setEmailersSocial] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
          const snapshot = await getDocs(collection(db, 'projects'));
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
          const recentCreativesFiltered = data.filter(project =>
            Array.isArray(project.type)
              ? project.type.includes('My Recent Creatives')
              : project.type === 'My Recent Creatives'
          );
    
          const uiuxFiltered = data.filter(project =>
            Array.isArray(project.type)
              ? project.type.includes('UI/UX Design Projects')
              : project.type === 'UI/UX Design Projects'
          );
    
          const emailersSocialFiltered = data.filter(project =>
            Array.isArray(project.type)
              ? project.type.includes('Emailers and Social Media Marketing')
              : project.type === 'Emailers and Social Media Marketing'
          );
    
          setRecentCreatives(recentCreativesFiltered);
          setUiuxProjects(uiuxFiltered);
          setEmailersSocial(emailersSocialFiltered);
        };
    
        fetchProjects();
      }, []);
      console.log(recentCreatives,'recentCreatives')
      console.log(uiuxProjects,'uiuxProjects')
      console.log(emailersSocial,'emailersSocial')
  return (
    <Layout>
      <Hero />
      <MyRecentCreatives projects={recentCreatives} />
      <UiUxProjects projects={uiuxProjects}/>
      <EmailersSocialMediaMarketing projects={emailersSocial}/>
      <Services />
    </Layout>
  );
};
export default HomeNew;