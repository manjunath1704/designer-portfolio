import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../../../firebase";
import { storage } from "../../../firebase";
import db from "../../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  snapshot,
} from "firebase/firestore";
function Cfff() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectThumbnail: null,
    mobileThumbnail: null,
    coverImage: null,
    projectImages: [],
    projectVideos: [],
    categories: {
      UiUxDesignProjects: false,
      EmailersSocialMedia: false,
      MyRecentCreatives: false,
    },
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    projectNameError: false,
    projectThumbnailError: false,
    mobileThumbnailError: false,
    coverImageError: false,
    projectImagesError: false,
    projectVideosError: false, // Removed the required flag
    categoriesError: false,
  });

  const handleInputChange = (e) => {
    const { name, type, files } = e.target;
    let fieldValue = type === "file" ? Array.from(files) : e.target.value;

    if (name === "projectImages") {
      fieldValue = [...formData.projectImages, ...fieldValue];
    } else if (name === "projectVideos") {
      fieldValue = [...formData.projectVideos, ...fieldValue];
    }

    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleThumbnailRemove = (field) => {
    setFormData({ ...formData, [field]: null });
  };

  const handleDeselectFile = (field, identifier) => {
    const updatedFiles = formData[field].filter((file) => file !== identifier);
    setFormData({ ...formData, [field]: updatedFiles });
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      categories: {
        ...prevData.categories,
        [name]: checked,
      },
    }));
  };
  const projectsCollectionRef = collection(db, "projects");

  const onSubmitProject = async () => {
    try {
      await addDoc(projectsCollectionRef, {
        title: formData.projectName,
        createdAt: serverTimestamp,
        description: formData.description,
        coverImage: uploadFiles(formData.coverImage)
          .then((downloadURL) => {
            console.log(
              "File uploaded successfully. Download URL:",
              downloadURL
            );
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          }),
        thumbnail: uploadFiles(formData.thumbnail)
          .then((downloadURL) => {
            console.log(
              "File uploaded successfully. Download URL:",
              downloadURL
            );
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          }),
        mobileThumbnail: uploadFiles(formData.mobileThumbnail)
          .then((downloadURL) => {
            console.log(
              "File uploaded successfully. Download URL:",
              downloadURL
            );
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          }),
        projectImages: uploadMultipleFiles(formData.projectImages)
          .then((urls) => {
            // `urls` is an array of download URLs for all uploaded images
            console.log(urls);
          })
          .catch((error) => {
            // Handle any errors that occurred during the upload process
            console.error(error);
          }),
        projectVideos: uploadMultipleFiles(formData.projectVideos)
          .then((urls) => {
            // `urls` is an array of download URLs for all uploaded images
            console.log(urls);
          })
          .catch((error) => {
            // Handle any errors that occurred during the upload process
            console.error(error);
          }),
          category:formData.categories
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      projectName,
      projectThumbnail,
      mobileThumbnail,
      coverImage,
      projectImages,
      projectVideos,
      categories,
      description,  
    } = formData;

    const atLeastOneCategorySelected = Object.values(categories).some(
      (value) => value
    );

    // Check if at least one category is selected
    if (
      !projectName ||
      !projectThumbnail ||
      !coverImage ||
      projectImages.length === 0 ||
      (!projectVideos.length && !description) || // Optional: Project Videos or Description
      !atLeastOneCategorySelected
    ) {
      setFormErrors({
        projectNameError: !projectName,
        projectThumbnailError: !projectThumbnail,
        mobileThumbnailError: false,
        coverImageError: !coverImage,
        projectImagesError: projectImages.length === 0,
        // projectVideosError: !projectVideos.length && !description, // Modified condition
        projectVideosError: false,
        categoriesError: !atLeastOneCategorySelected,
      });
    } else {
      console.log(formData);
    }
  };

  // const [progress, setProgress] = useState(0);
  // const uploadFiles = (file) => {
  //   if (!file) return;
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const prog = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(prog);
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
  //     }
  //   );
  // };

  const uploadFiles = (file) => {
    if (!file) return Promise.reject("No file provided");

    const storageRef = ref(storage, `/projectFiles/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can optionally provide progress updates here if needed.
        },
        (err) => {
          reject(err); // Reject the promise if there's an error.
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              resolve(url); // Resolve the promise with the download URL.
            })
            .catch((error) => {
              reject(error); // Reject the promise if there's an error getting the URL.
            });
        }
      );
    });
  };
  const uploadMultipleFiles = (files) => {
    if (!files || files.length === 0) return Promise.resolve([]);

    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        if (!file) {
          reject("Invalid file");
          return;
        }

        const storageRef = ref(storage, `/projectFiles/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // You can add progress tracking here if needed
          },
          (err) => {
            console.log(err);
            reject(err);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((url) => {
                resolve(url);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  };

  return (
    <div className="container">
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            className="form-control"
          />
          {formErrors.projectNameError && (
            <span className="error">This field is required</span>
          )}
        </div>
        <div>
          <label>Description (optional):</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div>
          <label>Project Thumbnail:</label>
          <input
            type="file"
            name="projectThumbnail"
            onChange={handleInputChange}
            accept="image/*"
          />
          {formData.projectThumbnail && (
            <div>
              <img
                src={URL.createObjectURL(formData.projectThumbnail[0])}
                alt="Project Thumbnail"
              />
              <button
                type="button"
                onClick={() => handleThumbnailRemove("projectThumbnail")}
              >
                Deselect
              </button>
            </div>
          )}
          {formErrors.projectThumbnailError && (
            <span className="error">This field is required</span>
          )}
        </div>
        <div>
          <label>Mobile Thumbnail (optional):</label>
          <input
            type="file"
            name="mobileThumbnail"
            onChange={handleInputChange}
            accept="image/*"
          />
          {formData.mobileThumbnail && (
            <div>
              <img
                src={URL.createObjectURL(formData.mobileThumbnail[0])}
                alt="Mobile Thumbnail"
              />
              <button
                type="button"
                onClick={() => handleThumbnailRemove("mobileThumbnail")}
              >
                Deselect
              </button>
            </div>
          )}
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleInputChange}
            accept="image/*"
          />
          {formData.coverImage && (
            <div>
              <img
                src={URL.createObjectURL(formData.coverImage[0])}
                alt="Cover Image"
              />
              <button
                type="button"
                onClick={() => handleThumbnailRemove("coverImage")}
              >
                Deselect
              </button>
            </div>
          )}
          {formErrors.coverImageError && (
            <span className="error">This field is required</span>
          )}
        </div>
        <div>
          <label>Project Images (required):</label>
          <input
            type="file"
            name="projectImages"
            onChange={handleInputChange}
            accept="image/*"
            multiple
          />
          {formData.projectImages.length > 0 && (
            <div>
              {formData.projectImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeselectFile("projectImages", image)}
                  >
                    Deselect
                  </button>
                </div>
              ))}
            </div>
          )}
          {formErrors.projectImagesError && (
            <span className="error">This field is required</span>
          )}
        </div>
        <div>
          <label>Project Videos (required):</label>
          <input
            type="file"
            name="projectVideos"
            onChange={handleInputChange}
            accept="video/*"
            multiple
          />
          {formData.projectVideos.length > 0 && (
            <div className="row">
              {formData.projectVideos.map((video, index) => (
                <div key={index} className="col-lg-4">
                  <video controls width="200">
                    <source src={URL.createObjectURL(video)} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    onClick={() => handleDeselectFile("projectVideos", video)}
                  >
                    Deselect
                  </button>
                </div>
              ))}
            </div>
          )}
          {formErrors.projectVideosError && (
            <span className="error">This field is required</span>
          )}
        </div>
        <div>
          <label>Categories (Select at least one):</label>
          <div>
            <label>
              <input
               type="radio"
               name="selectedCategory"
                // name="UiUxDesignProjects"
                checked={formData.categories.UiUxDesignProjects}
                onChange={handleCategoryChange}
              />
              UI Ux Design Projects
            </label>
            <label>
              <input
                 type="radio"
                 name="selectedCategory"
                checked={formData.categories.EmailersSocialMedia}
                onChange={handleCategoryChange}
              />
              Emailers and Social Media
            </label>
            <label>
              <input
                type="radio"
                name="selectedCategory"
                checked={formData.categories.MyRecentCreatives}
                onChange={handleCategoryChange}
              />
              My Recent Creatives
            </label>
          </div>
          {formErrors.categoriesError && (
            <span className="error">Select at least one category</span>
          )}
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Cfff;