import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { X, Film, Image, Images } from "react-bootstrap-icons";
function CreateProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      UiUxProjects: false,
      EmailersSocialMedia: false,
      MyRecentCreatives: false,
    },
  });

  const [thumbnailUrl, setThumbnailUrl] = useState(""); // State to store the selected thumbnail URL

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearThumbnail = () => {
    setThumbnailUrl("");
  };

  // images : Start
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const newImages = [...images];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        newImages.push(event.target.result);
        setImages(newImages);
        setValue("images", newImages);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setValue("images", newImages);
  };
  // images : End

  // Videos : Start
  const [selectedVideos, setSelectedVideos] = useState([]);
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      const videoObject = {
        file,
        previewUrl: URL.createObjectURL(file),
      };

      setSelectedVideos([...selectedVideos, videoObject]);
    }
  };
  const handleDeselectVideo = (index) => {
    const updatedVideos = [...selectedVideos];
    updatedVideos.splice(index, 1);
    setSelectedVideos(updatedVideos);
  };

  // Videos : End

  const onSubmit = (data) => {
    console.log(data,selectedVideos, "data");
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="sid-db-bg py-5">
      <Container className="py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="g-4">
            <Col lg={4}>
              <h4 className="text-xl text-lg-3xl text-light mb-3">
                Project Title
              </h4>
              <input
                className="dashboard-input bg-transparent text-light"
                type="text"
                {...register("project_name", {
                  required: "Project Name is required",
                })}
                placeholder="Project Name"
              />
              {errors.project_name && (
                <p className="text-sm text-danger mt-1 font-body">
                  {errors.project_name.message}
                </p>
              )}
            </Col>
            <Col lg={4}>
              <h4 className="text-xl text-lg-3xl text-light mb-3">
                Desktop Thumbnail
              </h4>
              <div className="thumbnail-container hover-unset">
                <article className="sid-card position-relative hover-unset">
                  {thumbnailUrl && (
                    <button
                      type="button"
                      className="position-absolute  close-button rounded-circle bg-danger"
                      onClick={handleClearThumbnail}
                    >
                      <X className="text-light text-4xl" />
                    </button>
                  )}
                  <figure
                    className={`sid-card__wrap overflow-hidden position-relative d-flex align-items-center justify-content-center ${
                      thumbnailUrl ? "" : "border-dashed"
                    }`}
                  >
                    {thumbnailUrl ? (
                      <motion.img
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                        className="sid-card__thumbnail h-100 w-100"
                        src={thumbnailUrl}
                        alt="Thumbnail Preview"
                      />
                    ) : (
                      <div className="text-center">
                        <Image className="cms-app-color text-5xl" />
                        <p className="text-xl mt-2 text-light">
                          Upload Desktop Thumbnail
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="image-upload position-absolute w-100 h-100 opacity-0"
                    />
                  </figure>
                </article>
              </div>
            </Col>
            <Col lg={4}>
              <h4 className="text-xl text-lg-3xl text-light mb-3">
                Mobile Thumbnail
              </h4>
              <div className="thumbnail-container hover-unset">
                <article className="sid-card position-relative hover-unset">
                  {thumbnailUrl && (
                    <button
                      type="button"
                      className="position-absolute  close-button rounded-circle bg-danger"
                      onClick={handleClearThumbnail}
                    >
                      <X className="text-light text-4xl" />
                    </button>
                  )}
                  <figure
                    className={`sid-card__wrap overflow-hidden position-relative d-flex align-items-center justify-content-center ${
                      thumbnailUrl ? "" : "border-dashed"
                    }`}
                  >
                    {thumbnailUrl ? (
                      <motion.img
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                        className="sid-card__thumbnail h-100 w-100"
                        src={thumbnailUrl}
                        alt="Thumbnail Preview"
                      />
                    ) : (
                      <div className="text-center">
                        <Image className="cms-app-color text-5xl" />
                        <p className="text-xl mt-2 text-light">
                          Upload Mobile Thumbnail
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="image-upload position-absolute w-100 h-100 opacity-0"
                    />
                  </figure>
                </article>
              </div>
            </Col>
            <Col lg={12}>
              <h4 className="text-xl text-lg-3xl text-light mb-3">Images</h4>
              <div className="image-uploads-muliple position-relative border-dashed d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <Images className="cms-app-color text-5xl" />
                  <p className="text-xl mt-2 text-light">Add Images </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-100 h-100 position-absolute opacity-0"
                />
              </div>
              <div>
                <div className="d-flex flex-wrap mt-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="image-preview overflow-hidden position-relative me-2 mb-2"
                    >
                      <motion.img
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                        src={image}
                        thumbnail
                        className="image-preview__img w-100 h-100"
                      />
                      <motion.button
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                        onClick={() => handleDeleteImage(index)}
                        className="position-absolute  close-button rounded-circle bg-danger"
                      >
                        <X className="text-light text-3xl" />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <h4 className="text-xl text-lg-3xl text-light mb-3">Videos</h4>
              <div className="image-uploads-muliple position-relative border-dashed d-flex align-items-center justify-content-center">
                <div className="text-center">
                  <Film className="cms-app-color text-5xl" />
                  <p className="text-xl mt-2 text-light">Add Videos </p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="w-100 h-100 position-absolute opacity-0"
                  multiple
                />
              </div>
            </Col>
            <Col lg={12}>
              <Row className="g-3 video-preview">
                {selectedVideos.map((video, index) => (
                  <Col
                    xs={6}
                    lg={4}
                    key={index}
                    className="video-item position-relative rounded"
                  >
                    <video
                      src={video.previewUrl}
                      controls
                      autoPlay
                      playsInline
                      style={{ borderRadius: "15px" }}
                    />
                    <motion.button
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={animationVariants}
                      onClick={() => handleDeselectVideo(index)}
                      className="position-absolute  close-button rounded-circle bg-danger"
                    >
                      <X className="text-light text-3xl" />
                    </motion.button>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={12}>
              <Row className="g-5">
                <Col xs={12}>
                  <h4 className="text-xl text-lg-3xl text-light">Categories</h4>
                </Col>
                <Col xl={4}>
                  <div className="check-box d-flex align-items-center">
                    <label className="text-lg text-lg-xl text-light me-5 mb-0">
                      UI Ux Design Projects
                    </label>
                    <input
                      type="checkbox"
                      {...register("UiUxProjects", { required: true })}
                    />
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="check-box d-flex align-items-center">
                    <label className="text-lg text-lg-xl text-light me-5 mb-0">
                      Emailers and Social Media
                    </label>
                    <input
                      type="checkbox"
                      {...register("EmailersSocialMedia", { required: true })}
                    />
                  </div>
                </Col>
                <Col xl={4}>
                  <div className="check-box d-flex align-items-center">
                    <label className="text-lg text-lg-xl text-light me-5 mb-0">
                      My Recent Creatives
                    </label>
                    <input
                      type="checkbox"
                      {...register("MyRecentCreatives", { required: true })}
                    />
                  </div>
                </Col>
              </Row>

              {errors.UiUxProjects &&
                errors.EmailersSocialMedia &&
                errors.MyRecentCreatives && (
                  <p>Please select at least one checkbox.</p>
                )}
            </Col>
            <Col xs={12}>
              <Button variant="success" type="submit">
                Submit
              </Button>
                <Button variant="danger" className="ms-3">
                  Cancel
                </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
}
export default CreateProject;