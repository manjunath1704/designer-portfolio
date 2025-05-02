import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';

const JokePage = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Programming');
      const data = await res.json();
      if (data.error) {
        setError('Failed to fetch joke.');
      } else {
        setJoke(data);
      }
    } catch (err) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-lg rounded-4 p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4 fs-2">💻 Random Programming Joke</Card.Title>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : joke ? (
            <Card.Text className="fs-5 text-center">
              {joke.type === 'single' ? (
                <>{joke.joke}</>
              ) : (
                <>
                  <strong>{joke.setup}</strong>
                  <br />
                  {joke.delivery}
                </>
              )}
            </Card.Text>
          ) : null}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" onClick={fetchJoke}>
              Tell Me Another!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JokePage;
