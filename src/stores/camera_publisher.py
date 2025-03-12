#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2

class CameraPublisher(Node):
    def __init__(self):
        super().__init__('camera_publisher')
        # Membuat publisher dengan topic 'camera/image_raw'
        self.publisher_ = self.create_publisher(Image, 'camera/image_raw', 10)
        # Timer untuk menentukan interval publishing (misal: setiap 0.1 detik)
        self.timer = self.create_timer(0.1, self.timer_callback)
        # Inisialisasi capture dari kamera default (biasanya kamera pertama dengan index 0)
        self.cap = cv2.VideoCapture(0)
        self.bridge = CvBridge()

    def timer_callback(self):
        ret, frame = self.cap.read()
        if ret:
            # Mengonversi frame ke pesan Image dengan encoding "bgr8"
            image_message = self.bridge.cv2_to_imgmsg(frame, encoding="bgr8")
            self.publisher_.publish(image_message)
            self.get_logger().info('Mempublish frame kamera')

def main(args=None):
    rclpy.init(args=args)
    camera_publisher = CameraPublisher()
    try:
        rclpy.spin(camera_publisher)
    except KeyboardInterrupt:
        pass
    finally:
        camera_publisher.cap.release()
        camera_publisher.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
