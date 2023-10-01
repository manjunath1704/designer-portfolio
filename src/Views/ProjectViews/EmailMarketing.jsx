import ProjectView from "../../Components/Global/ProjectView";
import LayoutSecondary from "../../Components/Layout/LayoutSecondary";
const EmailersImages = [
  "/assets/projects-view/email/emailer-a.jpg",
  "/assets/projects-view/email/emailer-b.jpg",
  "/assets/projects-view/email/emailer-c.jpg",
  "/assets/projects-view/email/emailer-d.jpg",
  "/assets/projects-view/email/emailer-e.jpg",
  "/assets/projects-view/email/emailer-f.jpg",
  "/assets/projects-view/email/emailer-g.jpg",
];

const EmailMarketing = () => {
  return (
    <LayoutSecondary>
      <ProjectView projectImages={EmailersImages}  />
    </LayoutSecondary>
  );
};
export default EmailMarketing;
