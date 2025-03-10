import ROSLIB from 'roslib';

class RosService {
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
  }

  publish(topicName, message) {
    const topic = new ROSLIB.Topic({
      ros: this.ros,
      name: topicName,
      messageType: 'std_msgs/String'
    });

    const msg = new ROSLIB.Message({ data: message });
    topic.publish(msg);
    console.log(`Message published to ${topicName}:`, message);
  }

  subscribe(topicName, callback) {
    const topic = new ROSLIB.Topic({
      ros: this.ros,
      name: topicName,
      messageType: 'std_msgs/String'
    });

    topic.subscribe((message) => {
      console.log(`Message received from ${topicName}:`, message.data);
      callback(message.data);
    });
  }
}

export default new RosService();
