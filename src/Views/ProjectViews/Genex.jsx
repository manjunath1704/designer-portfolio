import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const EmailersImages = [
  "/assets/projects-view/genex/genex-a.jpg",
  "/assets/projects-view/genex/genex-b.jpg",
  "/assets/projects-view/genex/genex-c.jpg",
  "/assets/projects-view/genex/genex-d.jpg",
  "/assets/projects-view/genex/genex-e.jpg",
  "/assets/projects-view/genex/genex-f.jpg",
];

const Genex = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={EmailersImages}  />
    </LayoutSecondary>
  );
};
export default Genex;
