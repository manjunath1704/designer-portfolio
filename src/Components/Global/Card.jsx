const Card = ({ projectTitle, projectThumbnail, projectLink, titleColor }) => {
  return (
    <a className="sid-card__link position-relative" href={projectLink}>
      <article className="sid-card position-relative">
        <header>
          <h4 className={`text-xl  customFontOneBold mb-5 font-bold ${titleColor}`}>
            {projectTitle}
          </h4>
        </header>
        <figure className="sid-card__wrap overflow-hidden position-relative">
          <img
            className="sid-card__thumbnail h-100 w-100"
            src={projectThumbnail}
            alt={projectTitle}
          />
        </figure>
      </article>
    </a>
  );
};
export default Card;
