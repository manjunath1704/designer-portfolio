import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Player, BigPlayButton } from 'video-react';
import { Col } from 'react-bootstrap';

export function VideoPlayer({ videoUrl }) {
  const ref = useRef(null);
  const { inView } = useInView({ threshold: 0.2, triggerOnce: true, ref });

  return (
    <Col lg={12} className="my-8" ref={ref}>
      {inView && (
        <Player src={videoUrl} playsInline muted={false} autoPlay>
          <BigPlayButton position="center" />
        </Player>
      )}
    </Col>
  );
}
