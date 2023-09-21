import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {XCircleFill, PlusCircle,CloudArrowUpFill,Upload} from 'react-bootstrap-icons';
function CreateProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control, setValue
  } = useForm();

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
        setValue('images', newImages);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setValue('images', newImages);
  };
  // images : End
  const onSubmit = (data) => {
    console.log(data, "data");
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },

  };

  return (
    <Container className="py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-4">
        <Col xs={12}>
            <input
              className="dashboard-input"
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
          <Col md={4}>
            <div className="thumbnail-container hover-unset">
            <article className="sid-card position-relative hover-unset">
                 {
                  thumbnailUrl &&  <button
                  type="button"
                  className="position-absolute  close-button bg-transparent"
                  onClick={handleClearThumbnail}
                >
                  
                  <XCircleFill className="text-danger text-4xl"/>
                </button>
                 }
                  <figure className={`sid-card__wrap overflow-hidden position-relative d-flex align-items-center justify-content-center ${thumbnailUrl ? "" : "border-dashed"}`} >
                   
                    {
                      thumbnailUrl ?  <motion.img
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={animationVariants}
                      className="sid-card__thumbnail h-100 w-100"
                      src={thumbnailUrl}
                      alt="Thumbnail Preview"
                    /> : <div className="text-center">
                      <Upload className="cms-app-color text-5xl"/>
                    <p className="text-xl mt-2">Upload Thumbnail</p>
                  </div>
                    }
                   
                    
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
         
<Col md={8}>
       <div className="image-uploads-muliple position-relative border-dashed d-flex align-items-center justify-content-center">
       <div className="text-center">
                      <Upload className="cms-app-color text-5xl"/>
                    <p className="text-xl mt-2">Add Images  </p >
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
       <div className="d-flex flex-wrap">
       {images.map((image, index) => (
          <div key={index} className="image-preview overflow-hidden position-relative me-2 mb-2">
            <img src={image} thumbnail className="image-preview__img w-100 h-100" />
            <button
              onClick={() => handleDeleteImage(index)}
              className="position-absolute  close-button bg-transparent"
            >
               <XCircleFill className="text-danger text-xl"/>
            </button>
          </div>
        ))}
       </div>
      </div>
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
  );
}

export default CreateProject;
