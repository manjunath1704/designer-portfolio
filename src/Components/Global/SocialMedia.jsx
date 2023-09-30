import { Behance, Linkedin } from 'react-bootstrap-icons';
const dataSocial = [
  // { name: "Behance", link: "#", icon: <Behance/> },
  { name: "LinkedIN", link: "#", icon:  <Linkedin/>},
];

const SocialMedia = ({iconSize}) => {
  return (
    <ul className="d-flex justify-content-center align-items-center">
      {dataSocial.map((data, index) => {
        return (
          <li key={index} className="me-3">
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
