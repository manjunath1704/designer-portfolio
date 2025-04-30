import { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

const initialImage = { order: 1, file: null, preview: '' };

export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    thumbnail: { desktop: null, mobile: null },
    thumbnailPreviews: { desktop: '', mobile: '' },
    images: [initialImage],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: { ...prev.thumbnail, [type]: file },
          thumbnailPreviews: { ...prev.thumbnailPreviews, [type]: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageFileChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [...formData.images];
        updatedImages[index] = {
          ...updatedImages[index],
          file,
          preview: reader.result,
        };
        setFormData({ ...formData, images: updatedImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageOrderChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index].order = Number(value);
    setFormData({ ...formData, images: updatedImages });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { order: prev.images.length + 1, file: null, preview: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: formData.type,
      title: formData.title,
      thumbnail: {
        desktop: formData.thumbnailPreviews.desktop,
        mobile: formData.thumbnailPreviews.mobile,
      },
      images: formData.images.map((img) => ({
        order: img.order,
        url: img.preview,
      })),
    };

    try {
      await addDoc(collection(db, 'projects'), payload);
      alert('Project added!');
      setFormData({
        type: '',
        title: '',
        thumbnail: { desktop: null, mobile: null },
        thumbnailPreviews: { desktop: '', mobile: '' },
        images: [initialImage],
      });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add project');
    }
  };

  return (
    <Container>
      <h3 className="my-4">Add New Project</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Project Type</Form.Label>
          <Form.Select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="My Recent Creatives">My Recent Creatives</option>
            <option value="UI/UX Design Projects">UI/UX Design Projects</option>
            <option value="Emailers and Social Media Marketing">Emailers and Social Media Marketing</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="thumbnailDesktop">
              <Form.Label>Desktop Thumbnail</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailChange('desktop', e.target.files[0])}
                required
              />
              {formData.thumbnailPreviews.desktop && (
                <Image
                  src={formData.thumbnailPreviews.desktop}
                  thumbnail
                  className="mt-2"
                  alt="Desktop Thumbnail Preview"
                />
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="thumbnailMobile">
              <Form.Label>Mobile Thumbnail (optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailChange('mobile', e.target.files[0])}
              />
              {formData.thumbnailPreviews.mobile && (
                <Image
                  src={formData.thumbnailPreviews.mobile}
                  thumbnail
                  className="mt-2"
                  alt="Mobile Thumbnail Preview"
                />
              )}
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4">Project Images</h5>
        {formData.images.map((img, index) => (
          <Row key={index} className="align-items-center mb-3">
            <Col xs={2}>
              <Form.Control
                type="number"
                value={img.order}
                onChange={(e) => handleImageOrderChange(index, e.target.value)}
              />
            </Col>
            <Col xs={6}>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleImageFileChange(index, e.target.files[0])}
              />
            </Col>
            <Col xs={2}>
              {img.preview && <Image src={img.preview} thumbnail style={{ height: 60 }} />}
            </Col>
            <Col xs={2}>
              <Button variant="outline-danger" onClick={() => removeImage(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <Button variant="secondary" type="button" onClick={addImageField} className="mb-4">
          + Add More Images
        </Button>

        <br />
        <Button variant="primary" type="submit">Submit Project</Button>
      </Form>
    </Container>
  );
}
