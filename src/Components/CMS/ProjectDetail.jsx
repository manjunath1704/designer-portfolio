import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Image } from 'react-bootstrap';

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
    <div className="my-4">
      {/* <h2 className="mb-3">{project.title}</h2>

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
      </Row> */}


      <section className="mb-8">
      <div className="overflow-hidden">
      <Row>
        {project.images
          ?.sort((a, b) => a.order - b.order)
          .map((img, index) => (
            <Col xs={12} key={index}>
              <Image src={img.url} className='w-100' />
            </Col>
          ))}
      </Row>
      </div>
      </section>
    </div>
  );
}
