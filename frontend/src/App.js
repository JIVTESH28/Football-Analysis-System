import React, { useState } from "react";
import VideoUpload from "./components/VideoUpload";
import VideoOutput from "./components/VideoOuput";

function App() {
  const [outputVideo, setOutputVideo] = useState(null);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>YOLOv8 Object Detection</h1>

      <VideoUpload setOutputVideo={setOutputVideo} />
      {outputVideo && <VideoOutput video={outputVideo} />}
    </div>
  );
}

export default App;
