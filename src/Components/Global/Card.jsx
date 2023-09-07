import React  from 'react';
const Card = ({ projectTitle, projectThumbnail, projectLink, titleColor }) => {
  return (
    <a className="sid-card__link position-relative" href={projectLink}>
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
    </a>
  );
};
export default Card;
