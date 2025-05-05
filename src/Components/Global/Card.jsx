import React from "react";
import { useInView,motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
const Card = ({
  projectTitle,
  projectThumbnail,
  projectLink,
  titleColor,
  delay,
  description
}) => {
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true });

  // const cardVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       delay,
  //       type: "spring", stiffness: 100
  //     },
     
  //   },
  // };
  return (
    <div
      // ref={ref}
      // initial="hidden"
      // animate={isInView ? "visible" : "hidden"}
      // variants={cardVariants}
      className="sid-card__link position-relative"
      href={projectLink}
    >
    <Link to={projectLink}>
    <article className="sid-card position-relative">
        <figure className="sid-card__wrap overflow-hidden position-relative mb-0">
          <img
            className="sid-card__thumbnail h-100 w-100"
            src={projectThumbnail}
            alt={projectTitle}
          />
        </figure>
        <footer>
          <h4 className={`text-lg sid-font__body mt-4 ${titleColor}`}>
            {projectTitle} - {description}
          </h4>
        </footer>
      </article>
    </Link>
    </div>
  );
};
export default Card;
