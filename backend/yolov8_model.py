from ultralytics import YOLO
import os
import cv2

def detect_objects(input_video_path, output_folder):
    model = YOLO('yolov8n.pt')  # Load YOLOv8 model

    # Read input video
    video = cv2.VideoCapture(input_video_path)
    frame_width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(video.get(cv2.CAP_PROP_FPS))
    # output video format
    output_video_path = os.path.join(output_folder, 'output_' + os.path.splitext(os.path.basename(input_video_path))[0] + '.mp4')


    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))
    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break
       
        results = model(frame)
        annotated_frame = results[0].plot() 
        
        # Write the annotated frame to the output video
        out.write(annotated_frame)

    video.release()
    out.release()

    return output_video_path
