import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const SocialMediaImages = [
  "/assets/projects-view/social-media/social-media-useralia-a.jpg",
  "/assets/projects-view/social-media/social-media-useralia-b.jpg",
  "/assets/projects-view/social-media/social-media-useralia-c.jpg",
];

const SocialMedia = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={SocialMediaImages}  />
    </LayoutSecondary>
  );
};
export default SocialMedia;
