import React from "react";
import { useInView,motion } from "framer-motion";
import { useRef } from "react";
const Card = ({
  projectTitle,
  projectThumbnail,
  projectLink,
  titleColor,
  delay,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        type: "spring", stiffness: 100
      },
     
    },
  };
  return (
    <motion.a
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="sid-card__link position-relative"
      href={projectLink}
    >
      <article className="sid-card position-relative">
        <figure className="sid-card__wrap overflow-hidden position-relative">
          <img
            className="sid-card__thumbnail h-100 w-100"
            src={projectThumbnail}
            alt={projectTitle}
          />
        </figure>
        <footer>
          <h4 className={`text-lg sid-font__body mt-2 ${titleColor}`}>
            {projectTitle}
          </h4>
        </footer>
      </article>
    </motion.a>
  );
};
export default Card;
