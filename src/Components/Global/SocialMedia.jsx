import {BiLogoBehance, BiLogoLinkedin} from 'react-icons/bi/'
const dataSocial = [
  { name: "Behance", link: "#", icon: <BiLogoBehance/> },
  { name: "LinkedIN", link: "#", icon:  <BiLogoLinkedin/>},
];

const SocialMedia = ({iconSize}) => {
  return (
    <ul className="d-flex justify-content-center align-items-center">
      {dataSocial.map((data, index) => {
        return (
          <li key={index} className="me-2">
            <a href={data.link} className={`${iconSize} color-white`}>
             {data.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
export default SocialMedia;
