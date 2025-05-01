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
  Badge,
  Row, Col
} from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { motion, AnimatePresence } from 'framer-motion';
import AdminHeader from '../Layout/AdminHeader';

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null); // resume to delete

  const fetchResumes = async () => {
    const q = query(collection(db, 'resumes'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    setResumes(data);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleFileDrop = (file) => {
    setSelectedFile(file);
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const fileRef = ref(storage, `resumes/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
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
          name: file.name,
          url,
          timestamp: Date.now(),
        });
        setSelectedFile(null);
        setUploadProgress(0);
        fetchResumes();
      }
    );
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id, url } = deleteTarget;
    await deleteDoc(doc(db, 'resumes', id));
    const fileRef = ref(storage, url);
    await deleteObject(fileRef).catch(() => { });
    setDeleteTarget(null);
    fetchResumes();
  };

  return (
    <>
      <AdminHeader />
      <Container className="mt-20 pt-10">
        <h3 className='text-4xl font-bold mb-5'>Manage resume</h3>
        <Row className='flex justify-content-center mb-5'>
          <Col xs={12} md={12}>
            <div className="mb-4 sid-file-uploader">
              <FileUploader
                handleChange={handleFileDrop}
                name="file"
                types={["PDF", "DOC", "DOCX"]}
                containerClassName="ile-uploader-container"
                multiple={false}

                children={
                  <div className="drag-drop-area d-flex flex-column align-items-center justify-content-center w-100">
                    <img src="/assets/docs/icons-upload.png" alt="" />
                    <p className="text-md mt-3 font-semibold">Drag & drop your file here, or click to browse.</p>
                  </div>
                }
              />
              {uploadProgress > 0 && <CustomProgressBar progress={uploadProgress} />}
            </div>
          </Col>
        </Row>
        <h3 className='text-2xl font-bold mb-5'>Resume history</h3>
        <Table striped bordered hover variant='dark' className="custom-rounded-table">
          <thead >
            <tr >
              <th><div className="p-3">Name</div></th>
              <th><div className="p-3">Link</div></th>
              <th><div className="p-3">Actions</div></th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume, index) => (
              <tr key={resume.id}>
                <td>
                  <div className="p-3">   <span className="me-3 mb-0">{resume.name}</span>
                    {index === 0 && <Badge bg="success">Latest</Badge>}</div>
                </td>
                <td>
                  <div className="p-3"><a href={resume.url} target="_blank" rel="noreferrer">
                    View
                  </a></div>
                </td>
                <td>
                  <div className="p-3"> <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteTarget(resume)}
                  >
                    <i className="bi bi-trash me-1"></i> Delete
                  </Button></div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <AnimatePresence>
          {deleteTarget && (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1050,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.div
                className="bg-white p-4 rounded shadow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ width: 400, maxWidth: '90%' }}
              >
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-exclamation-triangle-fill text-danger fs-3 me-2"></i>
                  <h5 className="mb-0">Confirm Deletion</h5>
                </div>
                <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>?</p>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
                    <i className="bi bi-x me-1" /> Cancel
                  </Button>
                  <Button variant="danger" onClick={confirmDelete}>
                    <i className="bi bi-check-circle me-1" /> Yes, Delete
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

// Custom animated progress bar
function CustomProgressBar({ progress }) {
  return (
    <div
      style={{
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        height: '20px',
        width: '100%',
        overflow: 'hidden',
        marginTop: '1rem',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        style={{
          height: '100%',
          background: '#6B62FF',
          borderRadius: '8px',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
        }}
      >
        {Math.round(progress)}%
      </motion.div>
    </div>
  );
}
