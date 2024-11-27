import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FileUploader } from "react-drag-drop-files";
import { Modal } from "react-bootstrap";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import LayoutSecondary from "../Components/Layout/LayoutSecondary";

const fileTypes = ["PDF", "DOC", "DOCX"];

function UploadResume() {
  const [resumeUpload, setResumeUpload] = useState(null);
  const [resumeUrls, setResumeUrls] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const resumesListRef = ref(storage, "resumes/");

  const handleFileUpload = (file) => {
    setResumeUpload(file);
    setUploadStatus("uploading");

    const fileExtension = file.name.split(".").pop();
    const originalFileName = file.name.replace(`.${fileExtension}`, '');
    const uniqueFileName = `resumes/${originalFileName}-${uuidv4()}.${fileExtension}`;
    const resumeRef = ref(storage, uniqueFileName);
    const metadata = {
      contentType: file.type,
    };

    const uploadTask = uploadBytesResumable(resumeRef, file, metadata);


    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.error("Error uploading file:", error);
        setUploadStatus("idle");
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setResumeUrls((prev) => [...new Set([...prev, { url, name: file.name }])]);
          setUploadProgress(0);
          setUploadStatus("done");
          setTimeout(() => setUploadStatus("idle"), 2000); // Reset to "idle" after 2 seconds
          setResumeUpload(null);
        });
      }
    );
  };

  const deleteFile = () => {
    if (fileToDelete) {

      const fileRef = ref(storage, `resumes/${fileToDelete.name}`);
      deleteObject(fileRef)
        .then(() => {

          setResumeUrls((prev) => prev.filter((file) => file.url !== fileToDelete.url));


          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    }
  };

  const handleDeleteClick = (file) => {
    setFileToDelete(file);
    setShowModal(true);
  };

  useEffect(() => {

    listAll(resumesListRef)
      .then((response) => {
        const urlPromises = response.items.map((item) => getDownloadURL(item));
        return Promise.all(urlPromises).then((urls) => {
          const filesWithNames = urls.map((url, index) => ({
            url,
            name: response.items[index].name,
          }));


          setResumeUrls(filesWithNames);
        });
      })
      .catch((error) => console.error("Error fetching resume URLs:", error));
  }, []);

  return (
    <LayoutSecondary>
      <section className="pt-5 bg-black pb-0">
        <Container>
          <Row className="align-items-center pb-0">
            <Col md={8}>
              <h1 className="text-4xl text-white pb-5 my-8 my-md-0">Resume Manager</h1>
            </Col>
            <Col md={4}>
              <img src="/assets/docs/resume_manager.svg" className="img-fluid" alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-8 mt-8">
        <Container>
          <Row>
            <Col md={4}>
              <div>
                <FileUploader
                  handleChange={handleFileUpload}
                  name="resume"
                  types={fileTypes}
                  maxSize={10}
                  multiple={false}
                  children={
                    <div className="drag-drop-area d-flex flex-column align-items-center justify-content-center">
                      <img src="/assets/docs/icons-upload.png" alt="" />
                      <p className="text-md mt-3 font-semibold">Drag & drop your file here, or click to browse.</p>
                    </div>
                  }
                />
                {uploadStatus === "uploading" && (
                  <div className="position-relative w-100 rounded mt-5" style={{ height: "8px", backgroundColor: "#F5F5F5" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="progress-bar position-absolute start-0 end-0 top-0"
                      style={{ transition: "width 0.2s ease" }}
                    ></motion.div>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: uploadStatus === "idle" ? 0 : 1 }}
                  className="upload-status"
                >
                  {uploadStatus === "uploading" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="status-text uploading"
                    >
                      Uploading {uploadProgress}%
                    </motion.div>
                  )}
                  {uploadStatus === "done" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="status-text done text-md font-semibold"
                    >
                      Uploaded
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </Col>
            {/* <Col md={8}>
              <div className="resume-list">
                {resumeUrls.length > 0 ? <h4 className="text-2xl font-semibold text-black mb-3">Resume History</h4> : ""}
                {resumeUrls.length > 0 ? (
                  resumeUrls.map((file, index) => (
                    <div key={index} className="resume-item d-flex justify-content-between align-items-center py-6 border-bottom">
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="resume-link">
                        {file.name}
                      </a>
                      <button onClick={() => handleDeleteClick(file)} className="sid-button__delete text-md px-6 py-2">
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-2xl font-semibold text-black">No resumes uploaded yet.</p>
                )}
              </div>
            </Col> */}
            <Col md={8}>
  <div className="resume-list">
    {resumeUrls.length > 0 ? <h4 className="text-2xl font-semibold text-black mb-3">Resume History</h4> : ""}
    {resumeUrls.length > 0 ? (
      resumeUrls.map((file, index) => (
        <div
          key={index}
          className={`resume-item d-flex justify-content-between align-items-center py-6 border-bottom ${
            index === resumeUrls.length - 1 ? "bg-red-500" : ""
          }`}
        >
          
          <a href={file.url} target="_blank" rel="noopener noreferrer" className="resume-link">
            {file.name} {index === resumeUrls.length - 1 ? <Badge bg="danger">I am on Navbar</Badge> : ""}
          </a>
          <button onClick={() => handleDeleteClick(file)} className="sid-button__delete text-md px-6 py-2">
            Delete
          </button>
        </div>
      ))
    ) : (
      <p className="text-2xl font-semibold text-black">No resumes uploaded yet.</p>
    )}
  </div>
</Col>

          </Row>
        </Container>
      </section>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div className="p-6">
          <h1 className="text-lg text-center mt-3">Are you sure you want to delete this resume?</h1>
          <div className="mt-8 d-flex justify-content-center">
            <button className="sid-button__outlined text-md px-8" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="bg-transparent sid-button__login color-white text-md px-8 ms-3" onClick={deleteFile}>
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </LayoutSecondary>
  );
}

export default UploadResume;