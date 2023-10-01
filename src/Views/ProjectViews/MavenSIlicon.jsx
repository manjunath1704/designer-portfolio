import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const mavenImages = [
  "/assets/projects-view/maven-silicon/maven-a.jpg",
  "/assets/projects-view/maven-silicon/maven-b.jpg",
  "/assets/projects-view/maven-silicon/maven-c.jpg",
  "/assets/projects-view/maven-silicon/maven-d.jpg",
  "/assets/projects-view/maven-silicon/maven-e.jpg",
  "/assets/projects-view/maven-silicon/maven-f.jpg",
  "/assets/projects-view/maven-silicon/maven-g.jpg",
  "/assets/projects-view/maven-silicon/maven-h.jpg",
];

const MavenSilicon = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={mavenImages}  />
    </LayoutSecondary>
  );
};
export default MavenSilicon;
