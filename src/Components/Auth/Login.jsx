import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/projects');
    } catch (error) {
      const errorCode = error.code;
      const newErrors = {};

      if (errorCode === 'auth/user-not-found') {
        newErrors.email = 'No account found with this email';
      } else if (errorCode === 'auth/wrong-password') {
        newErrors.password = 'Incorrect password';
      } else {
        newErrors.auth = 'Login failed. Please try again.';
      }

      setErrors(newErrors);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Row className="w-100">
          <Col xs={12} md={6} lg={5} className="mx-auto">
            <Card className="p-4">
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form noValidate>
                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {errors.auth && (
                    <div className="text-danger mb-3">{errors.auth}</div>
                  )}

                  <Button variant="dark" type="button" className="w-100  mt-4 bg-transparent sid-button__login color-white text-md px-8" onClick={login}>
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
