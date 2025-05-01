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
  Spinner,
} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, PencilSquare, Plus, Trash, XCircleFill, XLg } from 'react-bootstrap-icons';
import AdminHeader from '../Layout/AdminHeader';
import { Link } from 'react-router-dom';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    if (filterType)
      filtered = filtered.filter(p => p.type?.toLowerCase() === filterType.toLowerCase());
    setFiltered(filtered);
    setCurrentPage(0);
  }, [search, filterType, projects]);
  
  const handleDelete = async id => {
    // if (!window.confirm('Delete this project?')) return;
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
  <>
  <AdminHeader/>
    <Container className="mt-20 pt-10">
     <div className="d-flex flex-column flex-md-row justify-content-between items-center mb-8 mt-4">
     <h3 className='text-4xl font-bold mb-5'>Manage Projects</h3>

     <Link to="/admin/create-project"><div className='create-btn bg-success text-white px-8 py-3 mb-0 d-flex align-items-center'><div><Plus className='text-4xl'/></div><div className='ms-1'>Create project</div></div></Link>
     </div>
      <Row className="my-3 mb-4">
        <Col md={8}>
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
      <Table striped bordered hover responsive variant='dark' className="custom-rounded-table">
        <thead>
          <tr>
            <th><div className="p-3">Title</div></th>
            <th><div className="p-3">Type</div></th>
            {/* <th>Thumbnail</th> */}
            <th><div className="p-3">Actions</div></th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(proj => (
            <tr key={proj.id}>
              <td><div className="p-3">{proj.title}</div></td>
              <td><div className="p-3">{proj.type}</div></td>
              {/* <td>
                {proj.thumbnail?.desktop && (
                  <Image src={proj.thumbnail.desktop} alt="desktop" thumbnail width={60} />
                )}
                {proj.thumbnail?.mobile && (
                  <Image src={proj.thumbnail.mobile} alt="mobile" thumbnail width={60} className="ms-2" />
                )}
              </td> */}
              <td>
             
                <div className="p-3"><div className='cursor-pointer d-inline-block' onClick={() => handleEdit(proj)}>
                  <PencilSquare className='text-xl text-color-icon'/>
                </div>{' '}
                <div className='cursor-pointer d-inline-block ms-3' onClick={() => {
  setProjectToDelete(proj.id);
  setShowDeleteModal(true);
}}><Trash className='text-xl text-danger'/>
                  
                </div></div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <div className="d-flex justify-content-center align-items-center">
        <ReactPaginate
          pageCount={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          previousLabel={<ChevronLeft/>}
          nextLabel={<ChevronRight/>}
          breakLabel={'...'}
          pageClassName={'page-item'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          breakClassName={'page-item'}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl" className='z-infinite custom-radius'>
<div className=" rounded overflow-hidden">
<header className='p-4 d-flex justify-content-between align-items-center'>
  {
    editingProject && (<h4 className="text-2xl font-semibold">Edit {editingProject.title} </h4>)
  }
          
          <div onClick={() => setShowModal(false)} className='cursor-pointer'>
            <XCircleFill className='text-6xl text-danger'/>
            </div>        
        </header>

        <Modal.Body>
          {editingProject && (
            <Form className='d-flex flex-column gap-4'>
              <Form.Group>
                <Form.Label className='text-lg font-semibold'>Title</Form.Label>
                <Form.Control
               
                  value={editingProject.title}
                  onChange={e =>
                    setEditingProject(p => ({ ...p, title: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group className="">
                <Form.Label className='text-lg font-semibold'>Type</Form.Label>
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

              <Form.Group className="">
                <Form.Label className='text-lg font-semibold'>Desktop Thumbnail</Form.Label>
<Row>
  <Col md={6}>
  <div className="position-relative mb-2">
                  {editingProject.thumbnail?.desktop && (
                    <>
                      <div className='position-relative rounded overflow-hidden' style={{height:"350px"}}>
                      <img src={editingProject.thumbnail.desktop} alt="" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top:"-20px", right:"-20px", height:'40px',width:'40px', borderRadius:"50%" }}
                        
                        onClick={() => handleThumbRemove('desktop')}
                      >
                       <XLg className='text-xl text-white'/>
                      </Button>
                    </>
                  )}
                </div>
  </Col>
  
              <Col md={6}>
              <Form.Control
                  type="file"
                  onChange={e => handleThumbUpload(e.target.files[0], 'desktop')}
                />
              </Col>
</Row>
              </Form.Group>

              <Form.Group className="">
                <Form.Label className='text-lg font-semibold'>Mobile Thumbnail</Form.Label>
                <Row>
                  <Col md={6} >
                  <div className="position-relative mb-2">
                  {editingProject.thumbnail?.mobile && (
                    <>
                     
                      <div className='position-relative rounded overflow-hidden' style={{height:"350px"}}>
                      <img src={editingProject.thumbnail.mobile} alt="" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
                      </div>
                      
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top:"-20px", right:"-20px", height:'40px',width:'40px', borderRadius:"50%" }}
                        
                        onClick={() => handleThumbRemove('mobile')}
                      >
                       <XLg className='text-xl text-white'/>
                      </Button>
                    </>
                  )}
                </div></Col>
                  <Col md={6}>
                  <Form.Control
                  type="file"
                  onChange={e => handleThumbUpload(e.target.files[0], 'mobile')}
                />
                  </Col>
                </Row>
                
                
              </Form.Group>

              <Form.Group className="">
                <Form.Label className='text-lg font-semibold'>Images</Form.Label>
                <div className="d-flex flex-wrap gap-4">
                  {editingProject.images?.map((img, i) => (
                   <div key={i} className="position-relative">
                     <div  className="position-relative rounded overflow-hidden" style={{height:"120px",width:"120px"}}>
                      <img src={img} className='h-100 w-100 object-fit-contain bg-secondary' />
                      
                    </div>
                    <Button
                         variant="danger"
                         size="sm"
                         style={{ position: 'absolute', top:"-10px", right:"-10px", height:'30px',width:'30px', borderRadius:"50%" }}
                        onClick={() => handleImageRemove(i)}
                      >
                        <XLg className='text-sm text-white'/>
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
          <button className="create-btn text-white px-8 py-3 bg-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button variant="success" className='create-btn bg-success text-white px-8 py-3' onClick={handleSave} disabled={uploading}>
            Save Changes
          </button>
        </Modal.Footer>
</div>
      </Modal>

      <AnimatePresence>
  {showDeleteModal && (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: '#fff',
          borderRadius: '12px',
          padding: '2rem',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <h5>Are you sure?</h5>
        <p>This action will permanently delete the project.</p>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await handleDelete(projectToDelete);
              setShowDeleteModal(false);
              setProjectToDelete(null);
            }}
          >
            Delete
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </Container>
  </>
    
  );
}

