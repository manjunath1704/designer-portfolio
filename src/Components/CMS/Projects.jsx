// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Toast, Row, Col, Image, ProgressBar } from 'react-bootstrap';
// import { db, storage } from '../../firebase';
// import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
// import ReactPaginate from 'react-paginate';

// function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [projectToEdit, setProjectToEdit] = useState(null);
//   const [toastMessage, setToastMessage] = useState('');
//   const [editForm, setEditForm] = useState({
//     title: '',
//     type: [],
//     thumbnail: { desktop: '', mobile: '' },
//     images: [],
//     videos: []
//   });
//   const [selectedProjectId, setSelectedProjectId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [projectsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedType, setSelectedType] = useState('All');
//   const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadFileType, setUploadFileType] = useState(''); // To track 'image' or 'video'

//   const projectTypes = ['All', 'UI/UX Design Projects', 'My Recent Creatives', 'Emailers', 'Social Media Marketing'];

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const projectsCollection = collection(db, 'projects');
//         const projectSnapshot = await getDocs(projectsCollection);
//         const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setProjects(projectList);
//         setFilteredProjects(projectList);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//         setToastMessage('Error loading projects.');
//       }
//     };
//     fetchProjects();
//   }, []);

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleFilterChange = (e) => {
//     setSelectedType(e.target.value);
//   };

//   useEffect(() => {
//     let filtered = projects.filter((project) => {
//       const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesType = selectedType === 'All' || project.type.includes(selectedType);
//       return matchesSearch && matchesType;
//     });
//     setFilteredProjects(filtered);
//     setCurrentPage(0); // Reset to the first page when filters change
//   }, [searchQuery, selectedType, projects]);

//   const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
//   const displayedProjects = filteredProjects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

//   const handleEditClick = (project) => {
//     setProjectToEdit(project);
//     setEditForm({
//       title: project.title,
//       type: [...project.type],
//       thumbnail: { ...project.thumbnail },
//       images: project.images ? [...project.images] : [],
//       videos: project.videos ? [...project.videos] : [],
//     });
//     setShowEditModal(true);
//   };

//   const handleSaveEdit = async () => {
//     if (!projectToEdit) {
//       setToastMessage("No project to update.");
//       return;
//     }
//     try {
//       const projectRef = doc(db, 'projects', projectToEdit.id);

//       // Identify and delete removed images from Firebase Storage
//       const originalImages = projectToEdit.images || [];
//       const currentImages = editForm.images || [];
//       const removedImages = originalImages.filter(
//         (oldImage) => !currentImages.some((newImage) => newImage.url === oldImage.url)
//       );
//       for (const image of removedImages) {
//         try {
//           const imageRef = ref(storage, image.url);
//           await deleteObject(imageRef);
//           console.log(`Deleted image: ${image.url}`);
//         } catch (error) {
//           console.error('Error deleting removed image:', error);
//           setToastMessage('Error deleting some images.');
//         }
//       }

//       // Identify and delete removed videos from Firebase Storage
//       const originalVideos = projectToEdit.videos || [];
//       const currentVideos = editForm.videos || [];
//       const removedVideos = originalVideos.filter(
//         (oldVideo) => !currentVideos.some((newVideo) => newVideo.url === oldVideo.url)
//       );
//       for (const video of removedVideos) {
//         try {
//           const videoRef = ref(storage, video.url);
//           await deleteObject(videoRef);
//           console.log(`Deleted video: ${video.url}`);
//         } catch (error) {
//           console.error('Error deleting removed video:', error);
//           setToastMessage('Error deleting some videos.');
//         }
//       }

//       // Identify and delete removed thumbnails from Firebase Storage
//       if (
//         projectToEdit.thumbnail?.desktop &&
//         editForm.thumbnail?.desktop !== projectToEdit.thumbnail?.desktop
//       ) {
//         try {
//           const desktopRef = ref(storage, projectToEdit.thumbnail.desktop);
//           await deleteObject(desktopRef);
//           console.log(`Deleted desktop thumbnail: ${projectToEdit.thumbnail.desktop}`);
//         } catch (error) {
//           console.error('Error deleting removed desktop thumbnail:', error);
//           setToastMessage('Error deleting desktop thumbnail.');
//         }
//       }
//       if (
//         projectToEdit.thumbnail?.mobile &&
//         editForm.thumbnail?.mobile !== projectToEdit.thumbnail?.mobile
//       ) {
//         try {
//           const mobileRef = ref(storage, projectToEdit.thumbnail.mobile);
//           await deleteObject(mobileRef);
//           console.log(`Deleted mobile thumbnail: ${projectToEdit.thumbnail.mobile}`);
//         } catch (error) {
//           console.error('Error deleting removed mobile thumbnail:', error);
//           setToastMessage('Error deleting mobile thumbnail.');
//         }
//       }

//       // Update the Firestore document with the edited form data
//       await updateDoc(projectRef, { ...editForm });
//       setToastMessage('Project updated successfully');
//       setShowEditModal(false);
//       setProjects(prevProjects =>
//         prevProjects.map(p => (p.id === projectToEdit.id ? { ...p, ...editForm } : p))
//       );

//     } catch (error) {
//       setToastMessage('Error updating project');
//       console.error('Error during save:', error);
//     }
//   };

//   const handleDeleteClick = (projectId) => {
//     setSelectedProjectId(projectId);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteProject = async () => {
//     try {
//       const projectRef = doc(db, 'projects', selectedProjectId);
//       const projectToDelete = projects.find(p => p.id === selectedProjectId);

//       if (projectToDelete) {
//         // Delete associated files from storage
//         if (projectToDelete.thumbnail?.desktop) {
//           try {
//             await deleteObject(ref(storage, projectToDelete.thumbnail.desktop));
//             console.log(`Deleted desktop thumbnail: ${projectToDelete.thumbnail.desktop}`);
//           } catch (error) {
//             console.error('Error deleting desktop thumbnail:', error);
//             setToastMessage('Error deleting desktop thumbnail.');
//           }
//         }
//         if (projectToDelete.thumbnail?.mobile) {
//           try {
//             await deleteObject(ref(storage, projectToDelete.thumbnail.mobile));
//             console.log(`Deleted mobile thumbnail: ${projectToDelete.thumbnail.mobile}`);
//           } catch (error) {
//             console.error('Error deleting mobile thumbnail:', error);
//             setToastMessage('Error deleting mobile thumbnail.');
//           }
//         }
//         if (projectToDelete.images) {
//           for (const image of projectToDelete.images) {
//             try {
//               await deleteObject(ref(storage, image.url));
//               console.log(`Deleted image: ${image.url}`);
//             } catch (error) {
//               console.error('Error deleting image:', error);
//               setToastMessage('Error deleting some images.');
//             }
//           }
//         }
//         if (projectToDelete.videos) {
//           for (const video of projectToDelete.videos) {
//             try {
//               await deleteObject(ref(storage, video.url));
//               console.log(`Deleted video: ${video.url}`);
//             } catch (error) {
//               console.error('Error deleting video:', error);
//               setToastMessage('Error deleting some videos.');
//             }
//           }
//         }
//       }

//       await deleteDoc(projectRef);
//       setProjects(projects.filter(project => project.id !== selectedProjectId));
//       setFilteredProjects(filteredProjects.filter(project => project.id !== selectedProjectId));
//       setToastMessage('Project deleted successfully');
//       setShowDeleteModal(false);
//     } catch (error) {
//       setToastMessage('Error deleting project');
//       console.error('Error deleting project:', error);
//     }
//   };


//   const handleFileChange = async (e, type, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const storageRef = ref(storage, `projects/${file.name}-${Date.now()}`);
//       setIsUploading(true);
//       setUploadFileType(type); // Set the file type
//       setUploadProgress(0); // Reset progress

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           // Track the upload progress.
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setUploadProgress(progress);
//         },
//         (error) => {
//           // Handle errors during upload.
//           setIsUploading(false);
//           setUploadFileType('');
//           console.error('Error uploading file:', error);
//           setToastMessage('Error uploading file.');
//           setUploadProgress(0);
//         },
//         async () => {
//           // Get the download URL after the upload is complete.
//           setIsUploading(false);
//           setUploadFileType('');
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           setUploadProgress(0);
//           setEditForm((prevEditForm) => {
//             const updatedForm = { ...prevEditForm };
//             if (type === 'thumbnail') {
//               updatedForm.thumbnail = { ...updatedForm.thumbnail, [index]: downloadURL };
//             } else if (type === 'images') {
//               const newImages = [...updatedForm.images];
//               newImages[index] = { url: downloadURL, order: index };
//               updatedForm.images = newImages;
//             } else if (type === 'videos') {
//               const newVideos = [...updatedForm.videos];
//               newVideos[index] = { url: downloadURL, order: index };
//               updatedForm.videos = newVideos;
//             }
//             return updatedForm;
//           });
//         }
//       );
//     }
//   };

//   const handleRemoveFile = (type, index) => {
//     setEditForm((prevEditForm) => {
//       const updatedForm = { ...prevEditForm };
//       if (type === 'thumbnail') {
//         updatedForm.thumbnail = { ...updatedForm.thumbnail, [index]: '' };
//       } else if (type === 'images') {
//         updatedForm.images = prevEditForm.images.filter((_, i) => i !== index);
//       } else if (type === 'videos') {
//         updatedForm.videos = prevEditForm.videos.filter((_, i) => i !== index);
//       }
//       return updatedForm;
//     });
//   };

//   const handleFileDelete = (fileUrl, fileType) => {
//     setEditForm((prevEditForm) => {
//       const updatedForm = { ...prevEditForm };
//       if (fileType === 'images') {
//         updatedForm.images = prevEditForm.images.filter(img => img.url !== fileUrl);
//       } else if (fileType === 'videos') {
//         updatedForm.videos = prevEditForm.videos.filter(vid => vid.url !== fileUrl);
//       }
//       return updatedForm;
//     });
//   };

//   const renderFileInput = (type, existingFilesLength) => {
//     return (
//       <>
//         <Form.Control
//           type="file"
//           onChange={(e) => handleFileChange(e, type, existingFilesLength)}
//         />
//         {isUploading && uploadFileType === type && <ProgressBar now={uploadProgress} label={`${Math.round(uploadProgress)}%`} />}
//       </>
//     );
//   };

//   return (
//     <div>
//       <h1>Projects</h1>

//       {/* Search */}
//       <Form.Control
//         type="text"
//         placeholder="Search by project title..."
//         value={searchQuery}
//         onChange={handleSearch}
//         className="mb-3"
//       />

//       {/* Filter */}
//       <Form.Group controlId="filterType" className="mb-3">
//         <Form.Label>Filter by Type</Form.Label>
//         <Form.Control as="select" value={selectedType} onChange={handleFilterChange}>
//           {projectTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </Form.Control>
//       </Form.Group>

//       {filteredProjects.length === 0 ? (
//         <p>No projects found matching your criteria.</p>
//       ) : (
//         <>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Type</th>
//                 <th>Thumbnail</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedProjects.map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.title}</td>
//                   <td>{project.type.join(', ')}</td>
//                   <td>
//                     {project.thumbnail?.desktop && <img src={project.thumbnail.desktop} alt="Desktop Thumbnail" width="80" className="mr-2" />}
//                     {project.thumbnail?.mobile && <img src={project.thumbnail.mobile} alt="Mobile Thumbnail" width="60" />}
//                   </td>
//                   <td>
//                     <Button variant="warning" size="sm" className="mr-2" onClick={() => handleEditClick(project)}>Edit</Button>
//                     <Button variant="danger" size="sm" onClick={() => handleDeleteClick(project.id)}>Delete</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <ReactPaginate
//             previousLabel={'Previous'}
//             nextLabel={'Next'}
//             pageCount={pageCount}
//             onPageChange={handlePageChange}
//             containerClassName={'pagination'}
//             activeClassName={'active'}
//             previousClassName={'page-item'}
//             nextClassName={'page-item'}
//             pageClassName={'page-item'}
//             linkClassName={'page-link'}
//             activeLinkClassName={'active'}
//             disabledClassName={'disabled'}
//           />
//         </>
//       )}

//       {/* Edit Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Project</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="title">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={editForm.title}
//                 onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//               />
//             </Form.Group>

//             <Form.Group controlId="type">
//               <Form.Label>Type</Form.Label>
//               <Row>
//                 {projectTypes.map((type) => (
//                   <Col key={type}>
//                     <Form.Check
//                       type="checkbox"
//                       label={type}
//                       value={type}
//                       checked={editForm.type.includes(type)}
//                       onChange={() => {
//                         const newTypes = editForm.type.includes(type)
//                           ? editForm.type.filter((t) => t !== type)
//                           : [...editForm.type, type];
//                         setEditForm({ ...editForm, type: newTypes });
//                       }}
//                     />
//                   </Col>
//                 ))}
//               </Row>
//             </Form.Group>

//             <Form.Group controlId="thumbnailDesktop">
//               <Form.Label>Thumbnail (Desktop)</Form.Label>
//               {editForm.thumbnail?.desktop && (
//                 <div className="mb-2">
//                   <Image src={editForm.thumbnail.desktop} alt="Desktop Thumbnail" width="100" />
//                   <Button variant="outline-danger" size="sm" className="ml-2" onClick={() => handleRemoveFile('thumbnail', 'desktop')}>Remove</Button>
//                 </div>
//               )}
//               {renderFileInput('thumbnail', 'desktop')}
//             </Form.Group>

//             <Form.Group controlId="thumbnailMobile">
//               <Form.Label>Thumbnail (Mobile)</Form.Label>
//               {editForm.thumbnail?.mobile && (
//                 <div className="mb-2">
//                   <Image src={editForm.thumbnail.mobile} alt="Mobile Thumbnail" width="100" />
//                   <Button variant="outline-danger" size="sm" className="ml-2" onClick={() => handleRemoveFile('thumbnail', 'mobile')}>Remove</Button>
//                 </div>
//               )}
//               {renderFileInput('thumbnail', 'mobile')}
//             </Form.Group>

//             <Form.Group controlId="images">
//               <Form.Label>Images</Form.Label>
//               {editForm.images?.map((image, index) => (
//                 <div key={index} className="mb-2">
//                   <Image src={image.url} alt={`Image ${index}`} width="100" className="mr-2" />
//                   <Button variant="outline-danger" size="sm" onClick={() => handleFileDelete(image.url, 'images')}>Remove</Button>
//                 </div>
//               ))}
//               {renderFileInput('images', editForm.images?.length || 0)}
//             </Form.Group>

//             <Form.Group controlId="videos">
//               <Form.Label>Videos</Form.Label>
//               {editForm.videos?.map((video, index) => (
//                 <div key={index} className="mb-2">
//                   <video width="100" controls className="mr-2">
//                     <source src={video.url} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                   <Button variant="outline-danger" size="sm" onClick={() => handleFileDelete(video.url, 'videos')}>Remove</Button>
//                 </div>
//               ))}
//               {renderFileInput('videos', editForm.videos?.length || 0)}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSaveEdit} disabled={isUploading}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Modal */}
//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Project</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to delete this project?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDeleteProject}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Toast */}
//       <Toast
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//           zIndex: 9999
//         }}
//         show={toastMessage.length > 0}
//         onClose={() => setToastMessage('')}
//       >
//         <Toast.Body>{toastMessage}</Toast.Body>
//       </Toast>
//     </div>
//   );
// }

// export default Projects;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast, Row, Col, Image, ProgressBar } from 'react-bootstrap';
import { db, storage } from '../../firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import ReactPaginate from 'react-paginate';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
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
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isUploading, setIsUploading]  = useState(false);
  const [uploadFileType, setUploadFileType] = useState(''); // To track 'image' or 'video'

  const projectTypes = ['All', 'UI/UX Design Projects', 'My Recent Creatives', 'Emailers', 'Social Media Marketing'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const projectSnapshot = await getDocs(projectsCollection);
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
    setCurrentPage(0); // Reset to the first page when filters change
  }, [searchQuery, selectedType, projects]);

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);
  const displayedProjects = filteredProjects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

  const handleEditClick = (project) => {
    setProjectToEdit(project);
    // When setting the edit form, ensure we use the order from the database
    setEditForm({
      title: project.title,
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
            // Sort images and videos by their order
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
      setUploadFileType(type); // Set the file type
      setUploadProgress(0); // Reset progress

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track the upload progress.
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          // Handle errors during upload.
          setIsUploading(false);
          setUploadFileType('');
          console.error('Error uploading file:', error);
          setToastMessage('Error uploading file.');
          setUploadProgress(0);
        },
        async () => {
          // Get the download URL after the upload is complete.
          setIsUploading(false);
          setUploadFileType('');
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadProgress(0);
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
        {isUploading && uploadFileType === type && <ProgressBar now={uploadProgress} label={`${Math.round(uploadProgress)}%`} />}
      </>
    );
  };

  return (
    <div>
      <h1>Projects</h1>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="Search by project title..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-3"
      />

      {/* Filter */}
      <Form.Group controlId="filterType" className="mb-3">
        <Form.Label>Filter by Type</Form.Label>
        <Form.Control as="select" value={selectedType} onChange={handleFilterChange}>
          {projectTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {filteredProjects.length === 0 ? (
        <p>No projects found matching your criteria.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Thumbnail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.type.join(', ')}</td>
                  <td>
                    {project.thumbnail?.desktop && <img src={project.thumbnail.desktop} alt="Desktop Thumbnail" width="80" className="mr-2" />}
                    {project.thumbnail?.mobile && <img src={project.thumbnail.mobile} alt="Mobile Thumbnail" width="60" />}
                  </td>
                  <td>
                    <Button variant="warning" size="sm" className="mr-2" onClick={() => handleEditClick(project)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(project.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
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

      {/* Edit Modal */}
      <Modal show={showEditModal} size='xl' onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Row>
                {projectTypes.map((type) => (
                  <Col key={type}>
                    <Form.Check
                      type="checkbox"
                      label={type}
                      value={type}
                      checked={editForm.type.includes(type)}
                      onChange={() => {
                        const newTypes = editForm.type.includes(type)
                          ? editForm.type.filter((t) => t !== type)
                          : [...editForm.type, type];
                        setEditForm({ ...editForm, type: newTypes });
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            <Form.Group controlId="thumbnailDesktop">
              <Form.Label>Thumbnail (Desktop)</Form.Label>
              {editForm.thumbnail?.desktop && (
                <div className="mb-2 d-flex align-items-center">
                  <Image src={editForm.thumbnail.desktop} alt="Desktop Thumbnail" width="100" className="mr-2" />
                  <span className="mr-2">Desktop</span>
                  <Button variant="outline-danger" size="sm" className="ml-2" onClick={() => handleRemoveFile('thumbnail', 'desktop')}>Remove</Button>
                </div>
              )}
              {renderFileInput('thumbnail', 'desktop')}
            </Form.Group>

            <Form.Group controlId="thumbnailMobile">
              <Form.Label>Thumbnail (Mobile)</Form.Label>
              {editForm.thumbnail?.mobile && (
                <div className="mb-2 d-flex align-items-center">
                  <Image src={editForm.thumbnail.mobile} alt="Mobile Thumbnail" width="100" className="mr-2" />
                  <span className="mr-2">Mobile</span>
                  <Button variant="outline-danger" size="sm" className="ml-2" onClick={() => handleRemoveFile('thumbnail', 'mobile')}>Remove</Button>
                </div>
              )}
              {renderFileInput('thumbnail', 'mobile')}
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              {editForm.images?.map((image, index) => (
                <div key={index} className="mb-2 d-flex align-items-center">
                  <Image src={image.url} alt={`Image ${index}`} width="100" className="mr-2" />
                  <Form.Control
                    type="number"
                    value={image.order}
                    onChange={(e) => handleOrderChange(e, 'images', index)}
                    className="w-25 ml-2"
                    min="1"
                  />
                  <Button variant="outline-danger" size="sm" className="ml-2" onClick={() => handleFileDelete(image.url, 'images')}>Remove</Button>
                </div>
              ))}
              {renderFileInput('images', editForm.images?.length || 0)}
            </Form.Group>

            <Form.Group controlId="videos">
              <Form.Label>Videos</Form.Label>
              {editForm.videos?.map((video, index) => (
                <div key={index} className="mb-2 d-flex align-items-center">
                  <video width="100" controls className="mr-2">
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Form.Control
                    type="number"
                    value={video.order}
                    onChange={(e) => handleOrderChange(e, 'videos', index)}
                    className="w-25 ml-2"
                    min="1"
                  />
                  <Button variant="outline-danger" size="sm" onClick={() => handleFileDelete(video.url, 'videos')}>Remove</Button>
                </div>
              ))}
              {renderFileInput('videos', editForm.videos?.length || 0)}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit} disabled={isUploading}>
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
          <p>Are you sure you want to delete this project?</p>
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
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999
        }}
        show={toastMessage.length > 0}
        onClose={() => setToastMessage('')}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Projects;

