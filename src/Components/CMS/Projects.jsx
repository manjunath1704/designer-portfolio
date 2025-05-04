import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast, Row, Col, Image, Container, Table } from 'react-bootstrap';
import { db, storage } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight, PencilSquare, Plus, Trash, XLg } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../Layout/LayoutAdmin';
import { motion } from 'framer-motion';
function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    description: '', // Added description field
    type: [],
    thumbnail: { desktop: '', mobile: '' },
    images: [],
    videos: []
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileType, setUploadFileType] = useState(''); // To track 'image' or 'video'

  const projectTypes = ['All', 'UI/UX Design Projects', 'My Recent Creatives', 'Emailers and Social Media Marketing'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const projectSnapshot = await getDocs(query(projectsCollection, orderBy('createdAt', 'desc'))); // Order by createdAt, descending
        const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
        setFilteredProjects(projectList);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setToastMessage('Error loading projects.');
      }
    };
    fetchProjects();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || project.type.includes(selectedType);
      return matchesSearch && matchesType;
    });
    setFilteredProjects(filtered);
    setCurrentPage(0);
  }, [searchQuery, selectedType, projects]);

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const displayedProjects = filteredProjects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    setEditForm({
      title: project.title,
      description: project.description, // Load description
      type: [...project.type],
      thumbnail: { ...project.thumbnail },
      images: project.images ? project.images.map(img => ({ ...img, order: img.order })) : [],
      videos: project.videos ? project.videos.map(vid => ({ ...vid, order: vid.order })) : [],
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!projectToEdit) {
      setToastMessage("No project to update.");
      return;
    }
    try {
      const projectRef = doc(db, 'projects', projectToEdit.id);

      // Identify and delete removed images from Firebase Storage
      const originalImages = projectToEdit.images || [];
      const currentImages = editForm.images || [];
      const removedImages = originalImages.filter(
        (oldImage) => !currentImages.some((newImage) => newImage.url === oldImage.url)
      );
      for (const image of removedImages) {
        try {
          const imageRef = ref(storage, image.url);
          await deleteObject(imageRef);
          console.log(`Deleted image: ${image.url}`);
        } catch (error) {
          console.error('Error deleting removed image:', error);
          setToastMessage('Error deleting some images.');
        }
      }

      // Identify and delete removed videos from Firebase Storage
      const originalVideos = projectToEdit.videos || [];
      const currentVideos = editForm.videos || [];
      const removedVideos = originalVideos.filter(
        (oldVideo) => !currentVideos.some((newVideo) => newVideo.url === oldVideo.url)
      );
      for (const video of removedVideos) {
        try {
          const videoRef = ref(storage, video.url);
          await deleteObject(videoRef);
          console.log(`Deleted video: ${video.url}`);
        } catch (error) {
          console.error('Error deleting removed video:', error);
          setToastMessage('Error deleting some videos.');
        }
      }

      // Identify and delete removed thumbnails from Firebase Storage
      if (
        projectToEdit.thumbnail?.desktop &&
        editForm.thumbnail?.desktop !== projectToEdit.thumbnail?.desktop
      ) {
        try {
          const desktopRef = ref(storage, projectToEdit.thumbnail.desktop);
          await deleteObject(desktopRef);
          console.log(`Deleted desktop thumbnail: ${projectToEdit.thumbnail.desktop}`);
        } catch (error) {
          console.error('Error deleting removed desktop thumbnail:', error);
          setToastMessage('Error deleting desktop thumbnail.');
        }
      }
      if (
        projectToEdit.thumbnail?.mobile &&
        editForm.thumbnail?.mobile !== projectToEdit.thumbnail?.mobile
      ) {
        try {
          const mobileRef = ref(storage, projectToEdit.thumbnail.mobile);
          await deleteObject(mobileRef);
          console.log(`Deleted mobile thumbnail: ${projectToEdit.thumbnail.mobile}`);
        } catch (error) {
          console.error('Error deleting removed mobile thumbnail:', error);
          setToastMessage('Error deleting mobile thumbnail.');
        }
      }

      // Update the Firestore document with the edited form data
      await updateDoc(projectRef, { ...editForm });
      setToastMessage('Project updated successfully');
      setShowEditModal(false);
      setProjects(prevProjects =>
        prevProjects.map(p => {
          if (p.id === projectToEdit.id) {
            const sortedImages = [...editForm.images].sort((a, b) => a.order - b.order);
            const sortedVideos = [...editForm.videos].sort((a, b) => a.order - b.order);
            return { ...p, images: sortedImages, videos: sortedVideos, ...editForm };
          }
          return p;
        })
      );

    } catch (error) {
      setToastMessage('Error updating project');
      console.error('Error during save:', error);
    }
  };

  const handleDeleteClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowDeleteModal(true);
  };

  const handleDeleteProject = async () => {
    try {
      const projectRef = doc(db, 'projects', selectedProjectId);
      const projectToDelete = projects.find(p => p.id === selectedProjectId);

      if (projectToDelete) {
        // Delete associated files from storage
        if (projectToDelete.thumbnail?.desktop) {
          try {
            await deleteObject(ref(storage, projectToDelete.thumbnail.desktop));
            console.log(`Deleted desktop thumbnail: ${projectToDelete.thumbnail.desktop}`);
          } catch (error) {
            console.error('Error deleting desktop thumbnail:', error);
            setToastMessage('Error deleting desktop thumbnail.');
          }
        }
        if (projectToDelete.thumbnail?.mobile) {
          try {
            await deleteObject(ref(storage, projectToDelete.thumbnail.mobile));
            console.log(`Deleted mobile thumbnail: ${projectToDelete.thumbnail.mobile}`);
          } catch (error) {
            console.error('Error deleting mobile thumbnail:', error);
            setToastMessage('Error deleting mobile thumbnail.');
          }
        }
        if (projectToDelete.images) {
          for (const image of projectToDelete.images) {
            try {
              await deleteObject(ref(storage, image.url));
              console.log(`Deleted image: ${image.url}`);
            } catch (error) {
              console.error('Error deleting image:', error);
              setToastMessage('Error deleting some images.');
            }
          }
        }
        if (projectToDelete.videos) {
          for (const video of projectToDelete.videos) {
            try {
              await deleteObject(ref(storage, video.url));
              console.log(`Deleted video: ${video.url}`);
            } catch (error) {
              console.error('Error deleting video:', error);
              setToastMessage('Error deleting some videos.');
            }
          }
        }
      }

      await deleteDoc(projectRef);
      setProjects(projects.filter(project => project.id !== selectedProjectId));
      setFilteredProjects(filteredProjects.filter(project => project.id !== selectedProjectId));
      setToastMessage('Project deleted successfully');
      setShowDeleteModal(false);
    } catch (error) {
      setToastMessage('Error deleting project');
      console.error('Error deleting project:', error);
    }
  };


  const handleFileChange = async (e, type, index) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `projects/${file.name}-${Date.now()}`);
      setIsUploading(true);
      setUploadFileType(type);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          setIsUploading(false);
          setUploadFileType('');
          console.error('Error uploading file:', error);
          setToastMessage('Error uploading file.');
        },
        async () => {
          setIsUploading(false);
          setUploadFileType('');
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setEditForm((prevEditForm) => {
            const updatedForm = { ...prevEditForm };
            if (type === 'thumbnail') {
              updatedForm.thumbnail = { ...updatedForm.thumbnail, [index]: downloadURL };
            } else if (type === 'images') {
              const newImages = [...updatedForm.images];
              newImages[index] = { url: downloadURL, order: index };
              updatedForm.images = newImages;
            } else if (type === 'videos') {
              const newVideos = [...updatedForm.videos];
              newVideos[index] = { url: downloadURL, order: index };
              updatedForm.videos = newVideos;
            }
            return updatedForm;
          });
        }
      );
    }
  };

  const handleRemoveFile = (type, index) => {
    setEditForm((prevEditForm) => {
      const updatedForm = { ...prevEditForm };
      if (type === 'thumbnail') {
        updatedForm.thumbnail = { ...updatedForm.thumbnail, [index]: '' };
      } else if (type === 'images') {
        updatedForm.images = prevEditForm.images.filter((_, i) => i !== index);
      } else if (type === 'videos') {
        updatedForm.videos = prevEditForm.videos.filter((_, i) => i !== index);
      }
      return updatedForm;
    });
  };

  const handleFileDelete = (fileUrl, fileType) => {
    setEditForm((prevEditForm) => {
      const updatedForm = { ...prevEditForm };
      if (fileType === 'images') {
        updatedForm.images = prevEditForm.images.filter(img => img.url !== fileUrl);
      } else if (fileType === 'videos') {
        updatedForm.videos = prevEditForm.videos.filter(vid => vid.url !== fileUrl);
      }
      return updatedForm;
    });
  };

  const handleOrderChange = (e, type, index) => {
    const newOrder = parseInt(e.target.value, 10);
    if (!isNaN(newOrder)) {
      setEditForm(prevEditForm => {
        const updatedForm = { ...prevEditForm };
        if (type === 'images') {
          const newImages = [...updatedForm.images];
          newImages[index] = { ...newImages[index], order: newOrder };
          updatedForm.images = newImages;
        } else if (type === 'videos') {
          const newVideos = [...updatedForm.videos];
          newVideos[index] = { ...newVideos[index], order: newOrder };
          updatedForm.videos = newVideos;
        }
        return updatedForm;
      });
    }
  };

  const renderFileInput = (type, existingFilesLength) => {
    return (
      <>
        <Form.Control
          type="file"
          onChange={(e) => handleFileChange(e, type, existingFilesLength)}
        />
      </>
    );
  };

  return (
    <LayoutAdmin>
      <motion.div      initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}>
 <Container className="my-20 pt-20 ">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h3 className='text-4xl font-bold'>Manage projects</h3>
          <Link to="/admin/create-project" className='create-btn bg-success text-white px-8 py-3'><Plus className='text-3xl' />Create project</Link>
        </div>
        <Row className='mb-4'>
          <Col md={7}>
            {/* Search */}
            <Form.Control
              type="text"
              placeholder="Search by project title..."
              value={searchQuery}
              onChange={handleSearch}
              className="mb-3"
            />

          </Col>
          <Col md={5}>
            {/* Filter */}
            <Form.Group controlId="filterType" className="mb-3">
              <Form.Control as="select" value={selectedType} onChange={handleFilterChange}>
                {projectTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group></Col>
        </Row>



        {filteredProjects.length === 0 ? (
          <p>No projects found matching your criteria.</p>
        ) : (
          <>
            <Table striped bordered hover responsive variant='dark' className="custom-rounded-table">
              <thead>
                <tr>
                  <th><div className="p-3">S.No</div>  </th> {/* Added Serial Number column */}
                  <th><div className="p-3">Title</div> </th>
                  <th><div className="p-3">Type</div> </th>
                  <th><div className="p-3">Actions</div> </th>
                </tr>
              </thead>
              <tbody>
                {displayedProjects.map((project, index) => (
                  <tr key={project.id}>
                    <td><div className="p-3">{currentPage * projectsPerPage + index + 1}</div> </td> {/* Calculate and display S.No */}
                    <td><div className="p-3 " style={{ width: "250px" }}>{project.title}</div> </td>
                    <td><div className="p-3 " style={{ width: "400px" }}>{project.type.join(', ')}</div> </td>

                    <td>
                      <div className="p-3">
                        <div className="mr-3 cursor-pointer d-inline-block" onClick={() => handleEditClick(project)}><PencilSquare className='resume-link text-xl' /></div>
                        <div className=" cursor-pointer d-inline-block" onClick={() => handleDeleteClick(project.id)}><Trash className='text-danger text-xl' /></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <ReactPaginate
              previousLabel={<ChevronLeft />}
              nextLabel={<ChevronRight />}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
              previousClassName={'page-item'}
              nextClassName={'page-item'}
              pageClassName={'page-item'}
              linkClassName={'page-link'}
              activeLinkClassName={'active'}
              disabledClassName={'disabled'}

            />
          </>
        )}
      </Container>
      </motion.div>
     

      {/* Edit Modal */}
      <Modal size='xl' className='z-infinite' show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <div className="d-flex justify-content-between align-items-center px-10 pt-10 pb-6">
            <h3 className='text-4xl font-bold'>Edit <span className='resume-link font-normal'>{editForm.title}</span></h3>
            <Button  variant="danger"
                          size="sm"
                          style={{
                            height: '40px',
                            width: '40px',
                            borderRadius: "50%"
                          }}  onClick={() => setShowEditModal(false)}><XLg className="text-xl text-white" /></Button>
          
        </div>
        <Modal.Body className='px-10'>
          <Form>
            <Row className='g-5'>
              <Col md={6}>
                <Form.Group controlId="type" >
                  <Form.Label className="text-lg font-semibold">Project Type</Form.Label>
                  <Row className='flex-column g-4'>
                    {projectTypes.map((type) => (
                      <Col key={type}>
                        {/* <Form.Check
                          type="checkbox"
                          label={<div className="ms-3 mt-1">{type}</div>}
                          className={`${type === "All" ? "d-none" : ""}`}
                          value={type}
                          checked={editForm.type.includes(type)}
                          onChange={() => {
                            const newTypes = editForm.type.includes(type)
                              ? editForm.type.filter((t) => t !== type)
                              : [...editForm.type, type];
                            setEditForm({ ...editForm, type: newTypes });
                          }}
                        /> */}
                        <Form.Check
  type="checkbox"
  label={<div className="ms-3 mt-1">{type}</div>}
  className={`${type === "All" ? "d-none" : ""}`}
  value={type}
  checked={editForm.type.includes(type)}
  onChange={() => {
    let newTypes = [...editForm.type]; // Create a copy to avoid mutating state directly
    if (newTypes.includes(type)) {
      newTypes = newTypes.filter((t) => t !== type); // Remove the type
    } else {
      newTypes.push(type); // Add the type
    }
    setEditForm({ ...editForm, type: newTypes.length > 0 ? newTypes : [] }); // Ensure empty array if no types selected
  }}
/>
                      </Col>
                    ))}
                  </Row>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="title">

                  <Form.Label className="text-lg font-semibold">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="description">
                  <Form.Label className="text-lg font-semibold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="thumbnailDesktop">
                  <Form.Label className="text-lg font-semibold">Desktop Thumbnail</Form.Label>
                  {editForm.thumbnail?.desktop && (
                    <div className="position-relative  my-4">
                      <div className='position-relative rounded overflow-hidden' style={{ height: "350px" }}>
                        <img src={editForm.thumbnail.desktop} alt="Desktop Thumbnail" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
                      </div>
                      <Button variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: "-20px", right: "-20px", height: '40px', width: '40px', borderRadius: "50%" }} onClick={() => handleRemoveFile('thumbnail', 'desktop')}><XLg className='text-xl text-white' /></Button>
                    </div>

                  )}
                  {renderFileInput('thumbnail', 'desktop')}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="thumbnailMobile">
                  <Form.Label className="text-lg font-semibold">Mobile Thumbnail (optional)</Form.Label>
                  {editForm.thumbnail?.mobile && (
                    <div className="position-relative  my-4">
                      <div className='position-relative rounded overflow-hidden' style={{ height: "350px" }}>
                        <img src={editForm.thumbnail.mobile} alt="Desktop Thumbnail" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
                      </div>
                      <Button variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: "-20px", right: "-20px", height: '40px', width: '40px', borderRadius: "50%" }} onClick={() => handleRemoveFile('thumbnail', 'mobile')}><XLg className='text-xl text-white' /></Button>
                    </div>
                  )}
                  {renderFileInput('thumbnail', 'mobile')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="thumbnailAlternate">
                  <Form.Label className="text-lg font-semibold">Alternate Thumbnail (optional)</Form.Label>
                  {editForm.thumbnail?.alternate && (
                    <div className="position-relative  my-4">
                      <div className='position-relative rounded overflow-hidden' style={{ height: "350px" }}>
                        <img src={editForm.thumbnail.alternate} alt="Desktop Thumbnail" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
                      </div>
                      <Button variant="danger"
                        size="sm"
                        style={{ position: 'absolute', top: "-20px", right: "-20px", height: '40px', width: '40px', borderRadius: "50%" }} onClick={() => handleRemoveFile('thumbnail', 'alternate')}><XLg className='text-xl text-white' /></Button>
                    </div>
                  )}
                  {renderFileInput('thumbnail', 'alternate')}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="images">

                  <Form.Label className="text-lg font-semibold">Images</Form.Label>
                  {editForm.images?.map((image, index) => (
                    
                    <div>
                      <Row className='g-5'>
                        <Col md={3}>
                          <Form.Control
                            type="number"
                            value={image.order}
                            onChange={(e) => handleOrderChange(e, 'images', index)}
                            min="1"
                          />
                        </Col>
                        <Col md={6}>
                          <div className="position-relative mb-10">
                            <div className='position-relative rounded overflow-hidden' style={{ height: "200px" }}>
                              <img src={image.url} alt={`Image ${index}`} className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />


                            </div>
                            <Button variant="danger"
                              size="sm"
                              style={{ position: 'absolute', top: "-20px", right: "-20px", height: '40px', width: '40px', borderRadius: "50%" }} onClick={() => handleFileDelete(image.url, 'images')}><XLg className='text-xl text-white' /></Button>
                          </div>
                        </Col>
                      </Row>

                    </div>
                    
                  ))}
                  <Row>
                    <Col md={9}>
                      {renderFileInput('images', editForm.images?.length || 0)}
                    </Col>
                  </Row>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="videos">
                  <Form.Label className="text-lg font-semibold">Videos</Form.Label>
                  {editForm.videos?.map((video, index) => (
                    <>
                    <Row key={index} className='g-5 mb-10'>
                      <Col md={3}>
                      <Form.Control
                        type="number"
                        value={video.order}
                        onChange={(e) => handleOrderChange(e, 'videos', index)}
                       
                        min="1"
                      />
                      </Col>
                      <Col md={6}>
                      <div className="position-relative">
                      <video  controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <Button  variant="danger"
                          size="sm"
                          style={{
                            position: 'absolute',
                            top: "-20px",
                            right: "-20px",
                            height: '40px',
                            width: '40px',
                            borderRadius: "50%"
                          }}  onClick={() => handleFileDelete(video.url, 'videos')}><XLg className="text-xl text-white" /></Button>
            
                      </div>

                   </Col>
                    </Row>
                    </>
                  ))}
                 <Row >
                  <Col md={9}>
                  {renderFileInput('videos', editForm.videos?.length || 0)}
                  </Col>
                 </Row>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='create-btn text-white px-8 py-3' onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className='create-btn bg-success text-white px-8 py-3' onClick={handleSaveEdit} disabled={isUploading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want todelete this project?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      <Toast
       bg="success"
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 99999999999999999 }}
        show={toastMessage.length > 0}
        onClose={() => setToastMessage('')}
        delay={6000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto text-black">Update Complete</strong>
        </Toast.Header>
        <Toast.Body className='text-white'>{toastMessage}</Toast.Body>
      </Toast>
     
    </LayoutAdmin>
  );
}

export default Projects;