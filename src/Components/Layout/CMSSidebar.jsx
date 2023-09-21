// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Link } from "react-router-dom";
// const CMSSidebar = () => {
//   return (
//     <Sidebar>
//       <Menu
//         menuItemStyles={{
//           button: {
//             // the active class will be added automatically by react router
//             // so we can use it to style the active menu item
//             [`&.active`]: {
//               backgroundColor: "#13395e",
//               color: "#b6c8d9",
//             },
//           },
//         }}
//         className="vh-100"
//       >
//         <MenuItem component={<Link to="/documentation" />}>
//           {" "}
//           Documentation
//         </MenuItem>
//         <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
//         <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
//       </Menu>
//     </Sidebar>
//   );
// };
// export default CMSSidebar;
import React, { useState } from "react";
// import {
//   RiHome4Line,
//   RiTeamLine,
//   RiCalendar2Line,
//   RiFolder2Line,
//   RiUserFollowLine,
//   RiPlantLine,
//   RiStackLine,
//   RiUserUnfollowLine
// } from "react-icons/ri";
// import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";
// import {GiVerticalBanner,GiFullFolder} from 'react-icons/gi/'
// import {GrServices} from 'react-icons/gr/'
// import {AiTwotoneMail} from "react-icons/ai"
// import {TfiLayoutSlider} from 'react-icons/tfi'
import {
  Sidebar,
  Menu,
  MenuItem
  //useProSidebar
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
function CMSSidebar() {
  //const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
      <Sidebar
        className={`app h-100 ubantu-font w-100 border-35 bg-danger m-1 overflow-hidden ${toggled ? "toggled" : ""}`}
      >
        <main>
          {/* <Menu>
          <MenuItem icon={<GiVerticalBanner />} component={<Link to="/" />}>Hero</MenuItem>
            <MenuItem icon={<TfiLayoutSlider />} component={<Link to="/create-uiux-projects" />}>Highlights</MenuItem>
            <MenuItem icon={<GiFullFolder />} component={<Link to="/create-uiux-projects" />}>Projects</MenuItem>
            <MenuItem icon={<GrServices />} component={<Link to="/create-uiux-projects" />}>Services</MenuItem>
            <MenuItem icon={<AiTwotoneMail />} component={<Link to="/create-uiux-projects" />}>Emails</MenuItem>
          </Menu> */}
        </main>
      </Sidebar>
  );
}
export default CMSSidebar;