import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const edloreImages = [
  "/assets/projects-view/edlore/edlore-a.jpg",
  "/assets/projects-view/edlore/edlore-b.jpg",
  "/assets/projects-view/edlore/edlore-c.jpg",
  "/assets/projects-view/edlore/edlore-d.jpg",
  "/assets/projects-view/edlore/edlore-e.jpg",
  "/assets/projects-view/edlore/edlore-f.jpg",
];
const edloreVideos = [
  "https://firebasestorage.googleapis.com/v0/b/siddhiparkar-5d475.appspot.com/o/edlore%2Fvideos%2Fdesktop-edlore-mockup.mp4?alt=media&token=665bd22e-f886-4124-b91a-12faf7a9c650",
  "https://firebasestorage.googleapis.com/v0/b/siddhiparkar-5d475.appspot.com/o/edlore%2Fvideos%2Ffinal-edlore-mockup.mp4?alt=media&token=8ffc5ab9-89e9-41b2-b7fc-6d527db8cff4",
  "https://firebasestorage.googleapis.com/v0/b/siddhiparkar-5d475.appspot.com/o/edlore%2Fvideos%2Flandscape-ipad-tablet-mockup.mp4?alt=media&token=ece396f3-5080-4839-a1fc-03e6c0ddd546",
];
const Edlore = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={edloreImages} projectVideos={edloreVideos} />
    </LayoutSecondary>
  );
};
export default Edlore;