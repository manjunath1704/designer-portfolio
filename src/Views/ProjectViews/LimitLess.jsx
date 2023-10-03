import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const EmailersImages = [
  "/assets/projects-view/limitless/limitless-a.jpg",
  "/assets/projects-view/limitless/limitless-b.jpg",
  "/assets/projects-view/limitless/limitless-c.jpg",
  "/assets/projects-view/limitless/limitless-h.jpg",
  "/assets/projects-view/limitless/limitless-d.jpg",
  "/assets/projects-view/limitless/limitless-f.jpg",
  "/assets/projects-view/limitless/limitless-e.jpg",
];

const LimitLess = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={EmailersImages}  />
    </LayoutSecondary>
  );
};
export default LimitLess;
