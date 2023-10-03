import { Behance, Linkedin } from 'react-bootstrap-icons';
const dataSocial = [
  // { name: "Behance", link: "https://www.behance.net/siddhipark58b2", icon: <Behance/> },
  { name: "LinkedIN", link: "https://www.linkedin.com/in/siddhi-parkar-5127b958/", icon:  <Linkedin/>},
];

const SocialMedia = ({iconSize}) => {
  return (
    <ul className="d-flex justify-content-center align-items-center">
      {dataSocial.map((data, index) => {
        return (
          <li key={index} className="me-3">
            <a href={data.link} className={`${iconSize} color-white`} target='_blank' rel="noreferrer">
             {data.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
export default SocialMedia;
