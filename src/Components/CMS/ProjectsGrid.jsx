// ProjectsGrid.js
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, 'projects'));
      const data = snapshot.docs.map(doc => doc.data());
      setProjects(data);
    };

    fetchProjects();
  }, []);
console.log(projects,'projects')
  return (
    <Container className="my-5">
        <h1>hello</h1>
      <Row xs={1} md={3} className="g-4">
      {projects.map((project) => {
  const projectSlug = project.title.toLowerCase().split(' ').join('-');
  return (
    <Col key={project.id}>
      <Link
        to={`/projects/${projectSlug}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card className="h-100 shadow-sm">
          <Card.Img
            variant="top"
            src={project.thumbnail?.desktop}
            alt={project.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{project.title}</Card.Title>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
})}

      </Row>
    </Container>
  );
}
