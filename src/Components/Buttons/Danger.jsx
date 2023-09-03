import { Link } from "react-router-dom";
const DangerButton = ({ name, link, onClick, type, additionalClass }) => {
  return (
    <>
      {link ? (
        <Link
          to={link}
          className={`d-inline-block bg-transparent sid-button__danger color-white text-md px-18 ${additionalClass}`}
        >
          {name}
        </Link>
      ) : onClick ? (
        <button
          className={`d-inline-block bg-transparent sid-button__danger color-white text-md px-18 ${additionalClass}`}
          onClick={onClick}
        >
          {name}
        </button>
      ) : type ? (
        <button
          className={`d-inline-block bg-transparent sid-button__danger color-white text-md px-18  ${additionalClass}`}
          type={type}
        >
          {name}
        </button>
      ) : null}
    </>
  );
};
export default DangerButton;
