// // ProjectDetail.js
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { db } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { Container, Row, Col, Image } from 'react-bootstrap';

// export default function ProjectDetail() {
//   const { title } = useParams();
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     const fetchProject = async () => {
//       const snapshot = await getDocs(collection(db, 'projects'));
//       const data = snapshot.docs.map(doc => doc.data());
//       const match = data.find(p => p.title === decodeURIComponent(title));
//       setProject(match || null);
//     };

//     fetchProject();
//   }, [title]);

//   if (!project) return <div>Loading...</div>;

//   return (
//     <Container className="my-4">
//       <h2 className="mb-3">{project.title}</h2>

//       <Row className="mb-4">
//         <Col>
//           <h5>Desktop Thumbnail</h5>
//           {project.thumbnail?.desktop && <Image src={project.thumbnail.desktop} fluid />}
//         </Col>
//         {project.thumbnail?.mobile && (
//           <Col>
//             <h5>Mobile Thumbnail</h5>
//             <Image src={project.thumbnail.mobile} fluid />
//           </Col>
//         )}
//       </Row>

//       <h4>Project Images</h4>
//       <Row xs={1} md={2} lg={3} className="g-4">
//         {project.images
//           ?.sort((a, b) => a.order - b.order)
//           .map((img, index) => (
//             <Col key={index}>
//               <Image src={img.url} thumbnail fluid />
//             </Col>
//           ))}
//       </Row>
//     </Container>
//   );
// }
// ProjectDetail.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function ProjectDetail() {
  const { title } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const snapshot = await getDocs(collection(db, 'projects'));
      const data = snapshot.docs.map(doc => doc.data());

      const originalTitle = title.replace(/-/g, ' ');
      const match = data.find(
        p => p.title.toLowerCase() === originalTitle.toLowerCase()
      );

      setProject(match || null);
    };

    fetchProject();
  }, [title]);

  if (!project) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <h2 className="mb-3">{project.title}</h2>

      <Row className="mb-4">
        <Col>
          <h5>Desktop Thumbnail</h5>
          {project.thumbnail?.desktop && (
            <Image src={project.thumbnail.desktop} fluid />
          )}
        </Col>
        {project.thumbnail?.mobile && (
          <Col>
            <h5>Mobile Thumbnail</h5>
            <Image src={project.thumbnail.mobile} fluid />
          </Col>
        )}
      </Row>

      <h4>Project Images</h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {project.images
          ?.sort((a, b) => a.order - b.order)
          .map((img, index) => (
            <Col key={index}>
              <Image src={img.url} thumbnail fluid />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
