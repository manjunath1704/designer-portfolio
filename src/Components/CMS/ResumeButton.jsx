// ResumeButton.js
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';
import { Button, Spinner, Alert } from 'react-bootstrap';

export default function ResumeButton() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLatestResume = async () => {
      try {
        const q = query(
          collection(db, 'resumes'),
          orderBy('timestamp', 'desc'),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const latest = snapshot.docs[0].data();
          setResumeUrl(latest.url);
        } else {
          setError('No resume found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch resume.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestResume();
  }, []);

  if (loading) return <Spinner animation="border" size="sm" />;
  if (error) return <Alert variant="warning">{error}</Alert>;

  return (
    <a href={resumeUrl} target="_blank" className='bg-transparent sid-button__login color-white text-md px-12'>
      Resume
    </a>
  );
}
