// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { db } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { Row, Col, Image } from 'react-bootstrap';
// import LayoutSecondary from '../Layout/LayoutSecondary';
// import { motion } from 'framer-motion';

// export default function ProjectDetail() {
//   const { title } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProject = async () => {
//       const snapshot = await getDocs(collection(db, 'projects'));
//       const data = snapshot.docs.map(doc => doc.data());

//       const originalTitle = title.replace(/-/g, ' ');
//       const match = data.find(
//         p => p.title.toLowerCase() === originalTitle.toLowerCase()
//       );

//       setProject(match || null);
//       setLoading(false);
//     };

//     fetchProject();
//   }, [title]);

//   if (loading) return <div style={{ minHeight: '300px' }}>Loading...</div>;
//   if (!project) return <div style={{ minHeight: '300px' }}>Project not found.</div>;

//   return (
//     <LayoutSecondary>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//       > 
//         {/* Images Section */}
//         {project.images && project.images.length > 0 && (
//           <section className="mb-8">
//             <div className="overflow-hidden">
//               <Row>
//                 {project.images
//                   .sort((a, b) => (a.order || 0) - (b.order || 0))
//                   .map((img, index) => (
//                     <Col xs={12} key={index} style={{ marginBottom: '20px' }}>
//                       <div style={{ minHeight: '400px', position: 'relative' }}>
//                         <Image
//                           src={img.url}
//                           className="w-100"
//                           style={{ objectFit: 'cover', width: '100%' }}
//                           onLoad={() => console.log(`Image ${index + 1} loaded`)}
//                         />
//                       </div>
//                     </Col>
//                   ))}
//               </Row>
//             </div>
//           </section>
//         )}

//         {/* Videos Section */}
//         {project.videos && project.videos.length > 0 && (
//           <section className="background-black sid-projects__videos">
//             <div className="pt-16 pb-8 container-fluid">
//               <Row className="g-4">
//                 <Col xs={12}>
//                   <h2 className="sid-font__head text-5xl text-lg-9xl font-bold mb-2 text-uppercase color-white mb-3 text-center">
//                     Videos
//                   </h2>
//                 </Col>
//                 {project.videos
//                   .sort((a, b) => (a.order || 0) - (b.order || 0))
//                   .map((video, index) => (
//                     <Col lg={12} key={index} className="my-8">
//                        <video src={video.url} controls width="100%" />
//                     </Col>
//                   ))}
//               </Row>
//             </div>
//           </section>
//         )}
//       </motion.div>
//     </LayoutSecondary>
//   );
// }


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Row, Col, Image } from 'react-bootstrap';
import LayoutSecondary from '../Layout/LayoutSecondary';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProjectDetail() {
  const { title } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const snapshot = await getDocs(collection(db, 'projects'));
      const data = snapshot.docs.map(doc => doc.data());

      const originalTitle = title.replace(/-/g, ' ');
      const match = data.find(
        p => p.title.toLowerCase() === originalTitle.toLowerCase()
      );

      setProject(match || null);
      setLoading(false);
    };

    fetchProject();
  }, [title]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Skeleton height={200} width={200} circle />
      </div>
    );
  }

  if (!project) {
    return (
      <LayoutSecondary>
        <div style={{ minHeight: '300px', textAlign: 'center', padding: '50px' }}>
          Project not found.
        </div>
      </LayoutSecondary>
    );
  }

  return (
    <LayoutSecondary>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Images Section */}
        {project.images && project.images.length > 0 && (
          <section className="mb-8">
            <div className="overflow-hidden">
              <Row>
                {project.images
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((img, index) => (
                    <Col xs={12} key={index} style={{ marginBottom: '20px' }}>
                      <div style={{ minHeight: '400px', position: 'relative' }}>
                        <Image
                          src={img.url}
                          className="w-100"
                          style={{ objectFit: 'cover', width: '100%' }}
                          onLoad={() => console.log(`Image ${index + 1} loaded`)}
                        />
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          </section>
        )}

        {/* Videos Section */}
        {project.videos && project.videos.length > 0 && (
          <section className="background-black sid-projects__videos">
            <div className="pt-16 pb-8 container-fluid">
              <Row className="g-4">
                <Col xs={12}>
                  <h2 className="sid-font__head text-5xl text-lg-9xl font-bold mb-2 text-uppercase color-white mb-3 text-center">
                    Videos
                  </h2>
                </Col>
                {project.videos
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((video, index) => (
                    <Col lg={12} key={index} className="my-8">
                      <video src={video.url} controls width="100%" />
                    </Col>
                  ))}
              </Row>
            </div>
          </section>
        )}
      </motion.div>
    </LayoutSecondary>
  );
}

