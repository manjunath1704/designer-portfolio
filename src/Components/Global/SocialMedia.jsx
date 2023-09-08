import {BiLogoBehance, BiLogoLinkedin} from 'react-icons/bi/'
const dataSocial = [
  { name: "Behance", link: "#", icon: <BiLogoBehance/>,iconSize:"text-8xl" },
  { name: "LinkedIN", link: "#", icon:  <BiLogoLinkedin/>,iconSize:"text-6xl"},
];

const SocialMedia = () => {
  return (
    <ul className="d-flex justify-content-center align-items-center mt-8">
      {dataSocial.map((data, index) => {
        return (
          <li key={index} className="me-2">
            <a href={data.link} className={`${data.iconSize} color-white`}>
             {data.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
export default SocialMedia;
