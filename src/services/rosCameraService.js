import ROSLIB from 'roslib';

class RosCameraService {
  constructor() {
    this.ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    });

    this.ros.on('connection', () => {
      console.log('Connected to ROSBridge');
    });

    this.ros.on('error', (error) => {
      console.error('Error connecting to ROSBridge:', error);
    });

    this.ros.on('close', () => {
      console.log('Disconnected from ROSBridge');
    });

    this.imageData = '';
  }

  subscribeToCamera(topicName, callback) {
    const imageTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: topicName,
      messageType: 'sensor_msgs/CompressedImage'  // Pastikan tipe pesan benar
    });

    imageTopic.subscribe((message) => {
      this.imageData = `data:image/jpeg;base64,${message.data}`;
      callback(this.imageData);
    });
  }
}

export default new RosCameraService();
