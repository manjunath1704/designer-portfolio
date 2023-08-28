import { Col, Container, Row } from "react-bootstrap";
const servicesData = [
  {
    ServicesTitle:"UI/UX Design",
    servicesDescription:"Création d'interfaces UI/UX modernes, originales et ingénieuses en maximisant l'expérience utilisateur.",
    servicesDescription2:"Faire la différence. Vous démarquez de la concurrence et atteindre vos objectifs."
  },
  {
    ServicesTitle:"Identité de marque",
    servicesDescription:"Amélioration ou création de votre identité visuelle complète. Refonte ou construction de votre logo professionnel.",
    servicesDescription2:"Valoriser votre marque. Mieux vous positionner sur le marché.Attirer et augmenter votre clientèle."
  },
  {
    ServicesTitle:"Graphic Design",
    servicesDescription:"Création graphique de tous types d'éléments, en passant par vos supports de communication à une simple création.",
    servicesDescription2:"Renforcer votre présence digitale. Améliorer votre communication."
  }
]
const Services = () => {
  return (
    <section className="sid-services">
      <Container>
        <Row>
          <Col xs={12}>
            <h5 className="d-flex align-items-center">
              <div className="customFontThree sid-services__titleA color-white">
                SERVICES
              </div>
              <div className="customFontFour sid-services__titleB color-white font-bold">
                Services
              </div>
            </h5>
          </Col>
        </Row>
        <Row className="g-4">
          {
           servicesData.map((data,index)=>{
            return(
              <Col xs={12} sm={6} md={4} key={index}>
              <article>
              <h6 className="text-4xl color-white customFontOneBold font-bold mb-5">{data.ServicesTitle}</h6>
              <p className="text-xl color-white customFontOneBold mb-0">{data.servicesDescription}</p>
              <h6 className="text-3xl color-white customFontOneBold font-bold my-4"> Objectif</h6>
              <p className="text-xl color-white customFontOneBold mb-0">{data.servicesDescription2}</p>
              </article>
            </Col>
            )
           })
          }
        </Row>
      </Container>
    </section>
  );
};
export default Services;
