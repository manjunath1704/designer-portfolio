// // ResumeManager.js
// import { useEffect, useState } from 'react';
// import { db, storage } from '../../firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   updateDoc,
// } from 'firebase/firestore';
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject,
// } from 'firebase/storage';
// import {
//   Container,
//   Form,
//   Button,
//   Table,
//   Modal,
// } from 'react-bootstrap';

// export default function ResumeManager() {
//   const [resumes, setResumes] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [editing, setEditing] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fetchResumes = async () => {
//     const snapshot = await getDocs(collection(db, 'resumes'));
//     const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
//     setResumes(data);
//   };

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     const fileRef = ref(storage, `resumes/${selectedFile.name}`);
//     await uploadBytes(fileRef, selectedFile);
//     const url = await getDownloadURL(fileRef);

//     await addDoc(collection(db, 'resumes'), {
//       name: selectedFile.name,
//       url,
//     });
//     setSelectedFile(null);
//     fetchResumes();
//   };

//   const handleDelete = async (id, name) => {
//     if (!window.confirm('Delete this resume?')) return;
//     await deleteDoc(doc(db, 'resumes', id));
//     await deleteObject(ref(storage, `resumes/${name}`));
//     fetchResumes();
//   };

//   const handleEdit = resume => {
//     setEditing(resume);
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!editing) return;
//     await updateDoc(doc(db, 'resumes', editing.id), {
//       name: editing.name,
//     });
//     setShowModal(false);
//     fetchResumes();
//   };

//   return (
//     <Container className="my-5">
//       <h3>Resume Manager</h3>

//       <Form className="d-flex gap-2 align-items-center mb-4">
//         <Form.Control
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={e => setSelectedFile(e.target.files[0])}
//         />
//         <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
//           Upload Resume
//         </Button>
//       </Form>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Link</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {resumes.map(resume => (
//             <tr key={resume.id}>
//               <td>{resume.name}</td>
//               <td>
//                 <a href={resume.url} target="_blank" rel="noreferrer">
//                   View
//                 </a>
//               </td>
//               <td>
//                 <Button size="sm" variant="warning" onClick={() => handleEdit(resume)}>
//                   Edit
//                 </Button>{' '}
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleDelete(resume.id, resume.name)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Resume</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editing && (
//             <Form>
//               <Form.Group>
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   value={editing.name}
//                   onChange={e => setEditing({ ...editing, name: e.target.value })}
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }
// ResumeManager.js
// ResumeManager.js
// ---- start ----//
// import { useEffect, useState } from 'react';
// import { db, storage } from '../../firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   updateDoc,
//   query,
//   orderBy,
// } from 'firebase/firestore';
// import {
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
//   deleteObject,
// } from 'firebase/storage';
// import {
//   Container,
//   Form,
//   Button,
//   Table,
//   Modal,
//   ProgressBar,
// } from 'react-bootstrap';

// export default function ResumeManager() {
//   const [resumes, setResumes] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [editing, setEditing] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fetchResumes = async () => {
//     const q = query(collection(db, 'resumes'), orderBy('timestamp', 'desc'));
//     const snapshot = await getDocs(q);
//     const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
//     setResumes(data);
//   };

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     const fileRef = ref(storage, `resumes/${Date.now()}_${selectedFile.name}`);
//     const uploadTask = uploadBytesResumable(fileRef, selectedFile);

//     uploadTask.on('state_changed',
//       snapshot => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       error => {
//         console.error('Upload error:', error);
//       },
//       async () => {
//         const url = await getDownloadURL(uploadTask.snapshot.ref);
//         await addDoc(collection(db, 'resumes'), {
//           name: selectedFile.name,
//           url,
//           timestamp: Date.now(),
//         });
//         setSelectedFile(null);
//         setUploadProgress(0);
//         fetchResumes();
//       }
//     );
//   };

//   const handleDelete = async (id, name, url) => {
//     if (!window.confirm('Delete this resume?')) return;
//     await deleteDoc(doc(db, 'resumes', id));
//     const fileRef = ref(storage, url);
//     await deleteObject(fileRef).catch(() => {}); // in case not found
//     fetchResumes();
//   };

//   const handleEdit = resume => {
//     setEditing(resume);
//     setShowModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!editing) return;
//     await updateDoc(doc(db, 'resumes', editing.id), {
//       name: editing.name,
//     });
//     setShowModal(false);
//     fetchResumes();
//   };

//   return (
//     <Container className="my-5">
//       <h3>Resume Manager</h3>

//       <Form className="d-flex flex-column gap-3 mb-4">
//         <div
//           onDragOver={e => e.preventDefault()}
//           onDrop={e => {
//             e.preventDefault();
//             if (e.dataTransfer.files.length > 0) {
//               setSelectedFile(e.dataTransfer.files[0]);
//             }
//           }}
//           className="p-4 border border-dashed rounded text-center"
//           style={{ borderStyle: 'dashed', cursor: 'pointer' }}
//           onClick={() => document.getElementById('fileInput').click()}
//         >
//           {selectedFile ? selectedFile.name : 'Drag & drop or click to select a resume file'}
//         </div>
//         <Form.Control
//           type="file"
//           id="fileInput"
//           accept=".pdf,.doc,.docx"
//           style={{ display: 'none' }}
//           onChange={e => setSelectedFile(e.target.files[0])}
//         />
//         <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
//           Upload Resume
//         </Button>
//         {uploadProgress > 0 && <ProgressBar now={uploadProgress} label={`${Math.round(uploadProgress)}%`} />}
//       </Form>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Link</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {resumes.map(resume => (
//             <tr key={resume.id}>
//               <td>{resume.name}</td>
//               <td>
//                 <a href={resume.url} target="_blank" rel="noreferrer">
//                   View
//                 </a>
//               </td>
//               <td>
//                 <Button size="sm" variant="warning" onClick={() => handleEdit(resume)}>
//                   Edit
//                 </Button>{' '}
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleDelete(resume.id, resume.name, resume.url)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Resume</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editing && (
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>File Name</Form.Label>
//                 <Form.Control
//                   value={editing.name}
//                   onChange={e => setEditing({ ...editing, name: e.target.value })}
//                 />
//               </Form.Group>
//               <div>
//                 <strong>Current File:</strong>{' '}
//                 <a href={editing.url} target="_blank" rel="noreferrer">
//                   Open File
//                 </a>
//               </div>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }
//------End-----//
// ResumeManager.js
import { useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  Container,
  Button,
  Table,
  ProgressBar,
  Badge,
} from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchResumes = async () => {
    const q = query(collection(db, 'resumes'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    setResumes(data);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    const fileRef = ref(storage, `resumes/${Date.now()}_${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(fileRef, selectedFile);

    uploadTask.on('state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        console.error('Upload error:', error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'resumes'), {
          name: selectedFile.name,
          url,
          timestamp: Date.now(),
        });
        setSelectedFile(null);
        setUploadProgress(0);
        fetchResumes();
      }
    );
  };

  const handleDelete = async (id, url) => {
    if (!window.confirm('Delete this resume?')) return;
    await deleteDoc(doc(db, 'resumes', id));
    const fileRef = ref(storage, url);
    await deleteObject(fileRef).catch(() => {}); // in case not found
    fetchResumes();
  };

  return (
    <Container className="my-5">
      <h3>Resume Manager</h3>

      <div className="mb-4">
        <FileUploader
          handleChange={setSelectedFile}
          name="file"
          types={["PDF", "DOC", "DOCX"]}
          multiple={false}
          label="Drag & drop or click to upload resume"
        />
        <div className="mt-3 d-flex gap-2 align-items-center">
          <Button variant="primary" onClick={handleUpload} disabled={!selectedFile}>
            Upload Resume
          </Button>
          {selectedFile && <span>{selectedFile.name}</span>}
        </div>
        {uploadProgress > 0 && (
          <ProgressBar className="mt-2" now={uploadProgress} label={`${Math.round(uploadProgress)}%`} />
        )}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume, index) => (
            <tr key={resume.id}>
              <td>
                {resume.name}{' '}
                {index === 0 && <Badge bg="success">Latest</Badge>}
              </td>
              <td>
                <a href={resume.url} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(resume.id, resume.url)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

