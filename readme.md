# Football Analytics Project

This project focuses on detecting, tracking, and analyzing players, referees, and the football itself within video footage using YOLO object detection. Leveraging computer vision techniques, we’ve developed methods to extract meaningful insights from the footage, such as team possession, player speed, movement in meters, and player-to-ball interactions.

## Project Overview

1. **Object Detection and Tracking:** Detect players, referees, and football across video frames using the YOLO model.
2. **Team Assignment via Color Clustering:** Identify team affiliations based on T-shirt colors using pixel segmentation and clustering.
3. **Player Movement and Speed Analysis:** Calculate precise player movement using perspective transformation and optical flow.
4. **Player-Ball Proximity Detection:** Measure the proximity between players and the ball to identify ball possession events.

### Data Source

We used video clips from the Kaggle Bundesliga Data Shootout competition for development:
- Kaggle dataset: [Bundesliga Data Shootout](https://www.kaggle.com/competitions/dfl-bundesliga-data-shootout/data?select=clips)
- Additional sample video: [Google Drive Link](https://drive.google.com/file/d/1t6agoqggZKx6thamUuPAIdN_1zR9v9S_/view)

## Steps in the Project

### 1. Object Detection

For object detection, we use YOLOv8 with the `ultralytics` library:

```bash
pip install ultralytics
```

Our model, `yolov8x` (68.2 million parameters), is trained to detect players, referees, and the football. It identifies objects by drawing bounding boxes and providing the class (e.g., player, ball) and coordinates (x, y, w, h) for each detected entity.

### 2. Tracking Objects Across Frames

Using the Supervision library's `ByteTracker`, we track detected objects across frames, assigning each bounding box a unique ID. This helps in understanding object trajectories and movement patterns over time.

### 3. Enhancing Visualization

To improve clarity, we used OpenCV to add custom annotations:
- Ellipses around player positions.
- Ellipses around the ball, making it more visually appealing and easier to follow.

### 4. Player Color-Based Team Assignment

We identify each player's team based on their T-shirt color:
1. Crop the bounding box around each player.
2. Perform color clustering using K-Means (via `sklearn`) to separate background and T-shirt colors.
3. Classify players into teams based on detected color clusters.

### 5. Ball Interpolation

For smooth tracking of the ball, we used `pandas` interpolation to handle any missing values in the ball's movement data, filling gaps with forward and backward filling techniques.

### 6. Player-Ball Assignment

To identify which player has possession of the ball:
- Calculate the distance between each player and the ball.
- Assign possession if a player is within a threshold distance.
- Display a red indicator above the player closest to the ball.

### 7. Measuring Player Movement

To measure player movement in physical units (meters), we implemented:
- **Perspective Transformation:** Corrects for camera distortion, allowing us to calculate distances in meters rather than pixels.
- **Optical Flow:** Measures frame-to-frame camera movement, ensuring accurate player movement data.

## Installation Requirements

- YOLO (Ultralytics)
- OpenCV
- Supervision (for ByteTracker)
- Scikit-Learn (for K-Means clustering)
- Pandas (for data interpolation)

```bash
pip install ultralytics opencv-python-headless supervision scikit-learn pandas
```

## Conclusion

This project provides a comprehensive suite of tools for analyzing football footage. By combining YOLO for detection, clustering for team assignment, and optical flow for precise movement tracking, our system delivers robust analytics on team possession, player speed, and spatial dynamics on the field.