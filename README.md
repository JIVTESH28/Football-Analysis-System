# Project Setup

## Backend (Flask for connectivity)

1. **Install Dependencies:**
   Make sure you have Python and Flask installed. Install the required packages by running:

   ```bash
      pip install -r requirements.txt
2. **To run backend:** 
   ```
      flash run
3. **To run frontend:**
   ```
      npm start

## Frontend (For User Interface)
   The frontend for this application is built on top of react , Intially we are getting video input from user and sending the video to the backend server where flask is used for api connectivity .

# Description of Working
  1. First we get the video and the video is send to backend by POST request (flask).The video is wrapped in a special object called FormData, which allows the file to be sent via HTTP.
  2. Once Flask gets the video, it saves it on the server (in the uploads/ folder) .
  3. After the video is saved, it is passed to the object detection model (YOLOv8).
  4. After the YOLOv8 model finishes processing, the video is saved in the outputs/ folder.
  5. Flask again sends the output video to frontend
  6. It's returned as a downloadable file, so the frontend can handle it as a video.
  7. In frontend the file is received as a blob(binary large object).
   
