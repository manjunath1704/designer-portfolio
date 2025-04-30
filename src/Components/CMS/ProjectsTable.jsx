import { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  Modal,
  Image,
  Spinner,
} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';

const ITEMS_PER_PAGE = 5;

export default function ProjectsTableWithEdit() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, 'projects'));
    const data = snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    setProjects(data);
    setFiltered(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (filterType) filtered = filtered.filter(p => p.type === filterType);
    setFiltered(filtered);
    setCurrentPage(0);
  }, [search, filterType, projects]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    await deleteDoc(doc(db, 'projects', id));
    fetchProjects();
  };

  const handleEdit = project => {
    setEditingProject({ ...project });
    setShowModal(true);
  };

  const uploadFile = (file, path, callback) => {
    setUploading(true);
    const storageRef = ref(storage, `${path}/${uuidv4()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      null,
      err => {
        setUploading(false);
        alert('Upload failed');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(false);
        callback(downloadURL);
      }
    );
  };

  const handleThumbUpload = (file, key) => {
    uploadFile(file, 'thumbnails', url => {
      setEditingProject(prev => ({
        ...prev,
        thumbnail: { ...prev.thumbnail, [key]: url },
      }));
    });
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file, 'projectImages', url => {
        setEditingProject(prev => ({
          ...prev,
          images: [...(prev.images || []), url],
        }));
      });
    }
  };

  const handleImageRemove = index => {
    setEditingProject(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleThumbRemove = key => {
    setEditingProject(prev => ({
      ...prev,
      thumbnail: { ...prev.thumbnail, [key]: '' },
    }));
  };

  const handleSave = async () => {
    const { id, title, type, thumbnail, images } = editingProject;
    await updateDoc(doc(db, 'projects', id), {
      title,
      type,
      thumbnail,
      images,
    });
    setShowModal(false);
    fetchProjects();
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const paginated = filtered.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <Container className="my-5">
      <h3>Manage Projects</h3>

      <Row className="my-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search by title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="my recent creatives">My Recent Creatives</option>
            <option value="UI/UX Design Projects">UI/UX Design Projects</option>
            <option value="Emailers and Social media Marketing">
              Emailers and Social Media Marketing
            </option>
          </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(proj => (
            <tr key={proj.id}>
              <td>{proj.title}</td>
              <td>{proj.type}</td>
              <td>
                {proj.thumbnail?.desktop && (
                  <Image src={proj.thumbnail.desktop} alt="desktop" thumbnail width={60} />
                )}
                {proj.thumbnail?.mobile && (
                  <Image src={proj.thumbnail.mobile} alt="mobile" thumbnail width={60} className="ms-2" />
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(proj)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(proj.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <ReactPaginate
          pageCount={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          pageClassName={'page-item'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          breakClassName={'page-item'}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingProject && (
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={editingProject.title}
                  onChange={e =>
                    setEditingProject(p => ({ ...p, title: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={editingProject.type}
                  onChange={e =>
                    setEditingProject(p => ({ ...p, type: e.target.value }))
                  }
                >
                  <option value="my recent creatives">My Recent Creatives</option>
                  <option value="UI/UX Design Projects">UI/UX Design Projects</option>
                  <option value="Emailers and Social media Marketing">
                    Emailers and Social Media Marketing
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Desktop Thumbnail</Form.Label>
                <div className="position-relative mb-2">
                  {editingProject.thumbnail?.desktop && (
                    <>
                      <Image src={editingProject.thumbnail.desktop} thumbnail width={100} />
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: 0, left: 100 }}
                        onClick={() => handleThumbRemove('desktop')}
                      >
                        ×
                      </Button>
                    </>
                  )}
                </div>
                <Form.Control
                  type="file"
                  onChange={e => handleThumbUpload(e.target.files[0], 'desktop')}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Mobile Thumbnail</Form.Label>
                <div className="position-relative mb-2">
                  {editingProject.thumbnail?.mobile && (
                    <>
                      <Image src={editingProject.thumbnail.mobile} thumbnail width={100} />
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: 0, left: 100 }}
                        onClick={() => handleThumbRemove('mobile')}
                      >
                        ×
                      </Button>
                    </>
                  )}
                </div>
                <Form.Control
                  type="file"
                  onChange={e => handleThumbUpload(e.target.files[0], 'mobile')}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Images</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {editingProject.images?.map((img, i) => (
                    <div key={i} className="position-relative">
                      <Image src={img} thumbnail width={100} />
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => handleImageRemove(i)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                <Form.Control
                  className="mt-2"
                  type="file"
                  onChange={handleImageUpload}
                />
              </Form.Group>
              {uploading && <Spinner animation="border" className="mt-3" />}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave} disabled={uploading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

