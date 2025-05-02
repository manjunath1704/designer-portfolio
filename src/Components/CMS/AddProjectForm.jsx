import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, Button, Container, Row, Col, Image, Toast } from 'react-bootstrap';
import { db, storage } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { XLg } from 'react-bootstrap-icons';
import { useRef } from 'react';

const uploadFile = async (path, file) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export default function AddProjectForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      type: [],
      title: '',
      thumbnail: {
        desktop: null,
        mobile: null,
      },
      images: [{ order: 1, file: null, preview: '' }],
      videos: [{ order: 1, file: null }],
    },
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: 'images' });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray({ control, name: 'videos' });

  const [thumbnailPreviews, setThumbnailPreviews] = useState({ desktop: '', mobile: '' });
  const [imagePreviews, setImagePreviews] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [videoPreviews, setVideoPreviews] = useState({});

  const handleThumbnailChange = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(`thumbnail.${type}`, file);
        setThumbnailPreviews((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleImageFileChange = (index, file) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setValue(`images.${index}.file`, file);
  //       setImagePreviews((prev) => ({ ...prev, [index]: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageFileChange = (id, index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(`images.${index}.file`, file);
        setImagePreviews((prev) => ({ ...prev, [id]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleVideoFileChange = (index, file) => {
  //   if (file) {
  //     setValue(`videos.${index}.file`, file);
  //   }
  // };
  const handleVideoFileChange = (id, index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(`videos.${index}.file`, file);
        setVideoPreviews((prev) => ({ ...prev, [id]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const timestamp = Date.now();

      const desktopThumbURL = data.thumbnail.desktop
        ? await uploadFile(`thumbnails/${timestamp}_desktop`, data.thumbnail.desktop)
        : '';
      const mobileThumbURL = data.thumbnail.mobile
        ? await uploadFile(`thumbnails/${timestamp}_mobile`, data.thumbnail.mobile)
        : '';

      const uploadedImages = await Promise.all(
        data.images.map(async (img, idx) => {
          if (img.file) {
            const url = await uploadFile(`images/${timestamp}_${idx}`, img.file);
            return { order: img.order, url };
          }
          return null;
        })
      );

      const uploadedVideos = await Promise.all(
        data.videos.map(async (vid, idx) => {
          if (vid.file) {
            const url = await uploadFile(`videos/${timestamp}_${idx}`, vid.file);
            return { order: vid.order, url };
          }
          return null;
        })
      );

      const payload = {
        type: data.type,
        title: data.title,
        thumbnail: {
          desktop: desktopThumbURL,
          mobile: mobileThumbURL,
        },
        images: uploadedImages.filter(Boolean),
        videos: uploadedVideos.filter(Boolean),
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'projects'), payload);
      setShowToast(true);
      reset(); // reset form state
      setThumbnailPreviews({ desktop: '', mobile: '' });
      setImagePreviews({});
    } catch (err) {
      console.error('Upload failed:', err.message);
      alert('Failed to add project: ' + err.message);
    }
  };
  const desktopInputRef = useRef();
  const mobileInputRef = useRef();
  return (
    <Container className="mt-20 pt-10">
      <h3 className='text-4xl font-bold mb-5'>Create project</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='g-4'>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="text-lg font-semibold">Project Type</Form.Label>
              <div className="d-flex flex-column">
                <Form.Check
                  type="checkbox"
                  id="type-recent"
                  label="My Recent Creatives"
                  value="My Recent Creatives"
                  className='mb-3'
                  {...register('type')}
                />
                <Form.Check
                  type="checkbox"
                  id="type-uiux"
                  label="UI/UX Design Projects"
                  value="UI/UX Design Projects"
                  className='mb-3'
                  {...register('type')}
                />
                <Form.Check
                  type="checkbox"
                  id="type-emailers"
                  label="Emailers and Social Media Marketing"
                  value="Emailers and Social Media Marketing"
                  {...register('type')}
                />
              </div>
            </Form.Group>

          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className='text-lg font-semibold'>Project Title</Form.Label>
              <Form.Control type="text" {...register('title', { required: true })} />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className='text-lg font-semibold'>Desktop Thumbnail</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                ref={desktopInputRef}
                onChange={(e) => handleThumbnailChange('desktop', e.target.files[0])}
                required
              />
              {thumbnailPreviews.desktop && (
                <div className="position-relative mt-8">
                  <div className='position-relative rounded overflow-hidden ' style={{ height: "350px" }}>
                    <img src={thumbnailPreviews.desktop} alt="" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ position: 'absolute', top: "-20px", right: "-20px", height: '40px', width: '40px', borderRadius: "50%" }}
                    onClick={() => {
                      setValue('thumbnail.desktop', null);
                      setThumbnailPreviews((prev) => ({ ...prev, desktop: '' }));
                      if (desktopInputRef.current) {
                        desktopInputRef.current.value = '';
                      }
                    }}
                  >
                    <XLg className='text-xl text-white' />
                  </Button>
                </div>
              )}

            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className='text-lg font-semibold'>Mobile Thumbnail (optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                ref={mobileInputRef}
                onChange={(e) => handleThumbnailChange('mobile', e.target.files[0])}
              />
              {thumbnailPreviews.mobile && (
                <div className="position-relative  mt-8">
                  <div className='position-relative rounded overflow-hidden' style={{ height: "350px" }}>
                    <img src={thumbnailPreviews.mobile} alt="" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />

                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ position: 'absolute', top: "-20px", right: "-20px", height: '40px', width: '40px', borderRadius: "50%" }}
                    onClick={() => {
                      setValue('thumbnail.mobile', null);
                      setThumbnailPreviews((prev) => ({ ...prev, mobile: '' }));
                      if (mobileInputRef.current) {
                        mobileInputRef.current.value = '';
                      }
                    }}
                  >
                    <XLg className='text-xl text-white' />
                  </Button>
                </div>
              )}


            </Form.Group>
          </Col>

          <Col md={12}>
            <div>
              <h5 className='text-lg font-semibold mb-3'>Project Images</h5>
              {/* {imageFields.map((field, index) => (
                <Row key={field.id} className="mb-6">
                  <Col xs={1}>
                    <Form.Control type="number" {...register(`images.${index}.order`, { valueAsNumber: true })} />
                  </Col>
                  <Col xs={5}>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(index, e.target.files[0])}
                    />
                  </Col>
                  <Col xs={6}>
                  <div className="position-relative">
                    {imagePreviews[index] && <div className='position-relative rounded overflow-hidden' style={{ height: "350px" }}>
                <img src={imagePreviews[index]} alt="" className='position-absolute h-100 w-100 object-fit-contain bg-secondary' />
              </div> }
              {getValues(`images.${index}.file`) && (
                      <Button
                      variant="danger"
                      size="sm"
                      style={{ position: 'absolute', top:"-20px", right:"-20px", height:'40px',width:'40px', borderRadius:"50%" }}
                        onClick={() => {
                          removeImage(index);
                          setImagePreviews((prev) => {
                            const updated = { ...prev };
                            delete updated[index];
                            return updated;
                          });
                        }}
                      >
                         <XLg className='text-xl text-white'/>
                      </Button>
                    )}
                     </div>
                  </Col>
                
                </Row>
              ))} */}
              {imageFields.map((field, index) => (
                <Row key={field.id} className="mb-6">
                  <Col xs={1}>
                    <Form.Control type="number" {...register(`images.${index}.order`, { valueAsNumber: true })} />
                  </Col>
                  <Col xs={5}>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileChange(field.id, index, e.target.files[0])}
                    />
                  </Col>
                  <Col xs={6}>
                    <div className="position-relative">
                      {imagePreviews[field.id] && (
                        <div className="position-relative rounded overflow-hidden" style={{ height: "350px" }}>
                          <img
                            src={imagePreviews[field.id]}
                            alt=""
                            className="position-absolute h-100 w-100 object-fit-contain bg-secondary"
                          />
                        </div>
                      )}
                      {getValues(`images.${index}.file`) && (
                        <Button
                          variant="danger"
                          size="sm"
                          style={{
                            position: 'absolute',
                            top: "-20px",
                            right: "-20px",
                            height: '40px',
                            width: '40px',
                            borderRadius: "50%"
                          }}
                          onClick={() => {
                            removeImage(index);
                            setImagePreviews((prev) => {
                              const updated = { ...prev };
                              delete updated[field.id];
                              return updated;
                            });
                          }}
                        >
                          <XLg className="text-xl text-white" />
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              ))}

              <Button variant="secondary" type="button" onClick={() => appendImage({ order: imageFields.length + 1, file: null, preview: '' })} className="mb-4">
                + Add More Images
              </Button>
            </div>
          </Col>
          <Col md={12}>
            <div>
              <h5 className='text-lg font-semibold mb-3'>Project Videos</h5>
              {/* {videoFields.map((field, index) => (
                <Row key={field.id} className="align-items-center mb-3">
                  <Col xs={2}>
                    <Form.Control type="number" {...register(`videos.${index}.order`, { valueAsNumber: true })} />
                  </Col>
                  <Col xs={6}>
                    <Form.Control
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoFileChange(index, e.target.files[0])}
                    />
                  </Col>
                  <Col xs={2}>
                    {getValues(`videos.${index}.file`)?.name}
                  </Col>
                  <Col xs={2}>
                    {getValues(`videos.${index}.file`) && (
                      <Button variant="outline-danger" onClick={() => removeVideo(index)}>Remove</Button>
                    )}

                  </Col>
                </Row>
              ))} */}
              {videoFields.map((field, index) => (
                <Row key={field.id} className=" mb-4">
                  <Col xs={1}>
                    <Form.Control type="number" {...register(`videos.${index}.order`, { valueAsNumber: true })} />
                  </Col>
                  <Col xs={5}>
                    <Form.Control
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleVideoFileChange(field.id, index, e.target.files[0])}
                    />
                  </Col>
                  <Col xs={6}>
                    <div className="position-relative">
                      {/* {getValues(`videos.${index}.file`)?.name} */}
                      {videoPreviews[field.id] && (
                        <video controls style={{ maxWidth: "100%", borderRadius: "8px" }}>
                          <source src={videoPreviews[field.id]} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {getValues(`videos.${index}.file`) && (
                        <Button
                          variant="danger"
                          size="sm"
                          style={{
                            position: 'absolute',
                            top: "-20px",
                            right: "-20px",
                            height: '40px',
                            width: '40px',
                            borderRadius: "50%"
                          }}
                          onClick={() => {
                            removeVideo(index);
                            setVideoPreviews((prev) => {
                              const updated = { ...prev };
                              delete updated[field.id];
                              return updated;
                            });
                          }}
                        >
                          <XLg className="text-xl text-white" />
                        </Button>
                      )}
                    </div>
                  </Col>


                </Row>
              ))}

              <Button variant="secondary" type="button" onClick={() => appendVideo({ order: videoFields.length + 1, file: null })} className="mb-4">
                + Add More Videos
              </Button>
            </div>
          </Col>


          <Col md={12}>
            <div className="d-flex gap-2 mb-8">
              {/* <button className="create-btn text-white px-8 py-3 bg-secondary" onClick={() => reset()}>
                Cancel
              </button> */}
              <button variant="success" className='create-btn bg-success text-white px-8 py-3' type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Uploading...' : 'Create Project'}
              </button>

            </div>
          </Col>
        </Row>
      </Form>

      <Toast
        bg="success"
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={6000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 99999999999999999 }}
      >
        <Toast.Header>
          <strong className="me-auto text-black">Upload Complete</strong>
        </Toast.Header>
        <Toast.Body className='text-white'>Project uploaded successfully!</Toast.Body>
      </Toast>
    </Container>
  );
}

