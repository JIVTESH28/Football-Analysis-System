import React, { useEffect, useRef } from 'react';

const VideoOutput = ({ video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();  // Reload the video when the Blob URL changes
    }
  }, [video]);

  return (
    <div>
      <h2>Processed Video:</h2>
      <video ref={videoRef} width="600" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoOutput;
