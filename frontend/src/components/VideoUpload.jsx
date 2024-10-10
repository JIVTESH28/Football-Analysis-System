import React, { useState } from 'react';
import axios from 'axios';
import { Menu } from 'lucide-react';  // Import Lucide icon for sidebar toggle
import './VideoUpload.css';  // Import the CSS

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }));
      setOutputVideo(url);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {/* Only the icon is displayed now */}
          {sidebarOpen ? (
            <Menu className="sidebar-toggle open" onClick={() => setSidebarOpen(!sidebarOpen)} />
          ) : (
            <Menu className="sidebar-toggle closed" onClick={() => setSidebarOpen(!sidebarOpen)} />
          )}
        </div>
        <div className="sidebar-content">
          {file && <p className="uploaded-file">File: {file.name}</p>}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Upload Section */}
        <div className="upload-section">
          <h2>Upload Video</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <button type="submit" className="upload-button" disabled={!file || loading}>
              {loading ? 'Processing...' : 'Upload Video'}
            </button>
          </form>
        </div>

        {/* Output Section */}
        <div className="output-section">
          <h2 >Output Video</h2>
          {outputVideo && (
            <div className="download-container">
              <h3>Download Processed Video:</h3>
              <a href={outputVideo} download="processed_video.mp4">
                <button className="download-button">Download Video</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
