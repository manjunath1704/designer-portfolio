import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const EmailersImages = [
  "/assets/projects-view/useralia/useralia-a.jpg",
  "/assets/projects-view/useralia/useralia-b.jpg",
  "/assets/projects-view/useralia/useralia-c.jpg",
  "/assets/projects-view/useralia/useralia-d.jpg",
  "/assets/projects-view/useralia/useralia-e.jpg",
  "/assets/projects-view/useralia/useralia-f.jpg",
];
const useraliaVideos = [
  // "/assets/projects-view/useralia/useralia-a.mp4",
  // "/assets/projects-view/useralia/useralia-b.mp4",
  "/assets/projects-view/useralia/useralia-c.mp4",
]
const Useralia = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={EmailersImages} projectVideos={useraliaVideos}  />
    </LayoutSecondary>
  );
};
export default Useralia;
