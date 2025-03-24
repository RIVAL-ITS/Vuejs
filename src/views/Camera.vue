<template>
  <div id="app">
    <!-- Tombol Back -->
    <div class="back-button" @click="goBack"></div>

    <!-- Card untuk menampilkan ROS image -->
    <div class="card" ref="card">
      <div class="card-header">
        <h2>{{ title }}</h2>
      </div>
      <div class="card-content">
        <!-- Tampilkan gambar dari ROS jika tersedia -->
        <img v-if="imageData" :src="imageData" alt="Camera Stream" class="stream-img" />
        <p v-else>Waiting for image data...</p>
      </div>
    </div>

    <!-- Bar Status dengan tombol konfirmasi -->
    <div class="status-bar">
      <p>Status: <span>{{ status }}</span></p>
      <button v-if="status !== 'Idle'" @click="confirmAction">Confirm</button>
    </div>

    <!-- Tombol Aksi -->
    <div class="button-container">
      <button v-for="button in buttons" :key="button" @click="handleAction(button)">
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
import ROSLIB from 'roslib';

export default {
  name: "CameraView",
  data() {
    return {
      title: "Camera Stream",
      buttons: ["Launch", "Abort", "Wait", "Resume"],
      status: "Idle",
      imageData: ""
    };
  },
  mounted() {
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        console.log("Fullscreen exited, re-entering...");
        this.enterFullScreen();
      }
    });

    this.enterFullScreen();

    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
    });

    ros.on('connection', () => {
      console.log('Connected to ROS bridge.');
    });

    ros.on('error', (error) => {
      console.error('Error connecting to ROS bridge: ', error);
    });

    ros.on('close', () => {
      console.log('Disconnected from ROS bridge.');
    });

    const imageTopic = new ROSLIB.Topic({
      ros: ros,
      name: '/camera_frame/compressed',
      messageType: 'sensor_msgs/msg/CompressedImage'
    });

    imageTopic.subscribe((message) => {
      console.log("Received image message from ROS:", message);
      this.processImageMessage(message);
    });
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
      setTimeout(() => {
        if (!document.fullscreenElement) {
          this.enterFullScreen();
        }
      }, 500);
    },
    enterFullScreen() {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    handleAction(action) {
      this.status = action;
    },
    confirmAction() {
      alert(`Confirmed action: ${this.status}`);
      this.status = "Idle";
    },
    processImageMessage(message) {
      // Asumsikan message.data adalah string base64 dari gambar JPEG.
      if (message.data) {
        this.imageData = "data:image/jpeg;base64," + message.data;
      }
    }
  }
};
</script>

<style scoped>
/* Container Utama */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  min-height: 100vh;
  background: url("/Image1.jpeg") no-repeat center center;
  background-size: cover;
  padding: 20px;
}

/* Tombol Back */
.back-button {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 72px;
  height: 72px;
  background-image: url("/back.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

/* Card Style */
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  padding: 20px;
  max-width: 600px;
  margin: 100px auto 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Card Header */
.card-header {
  margin-bottom: 10px;
}

/* Card Content */
.card-content {
  min-height: 200px;
  text-align: center;
}

/* Gaya untuk stream image */
.stream-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Bar Status */
.status-bar {
  position: absolute;
  bottom: 140px;
  right: 200px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  height: 72px;
}

/* Status text */
.status-bar span {
  font-weight: bold;
  font-size: 2em;
}

/* Tombol Confirm */
.status-bar button {
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 2em;
}

.status-bar button:hover {
  background-color: #005f73;
}

/* Container Tombol Aksi */
.button-container {
  position: absolute;
  bottom: 40px;
  right: 50px;
  display: flex;
  gap: 20px;
}

/* Tombol Aksi */
.button-container button {
  width: 150px;
  height: 75px;
  background-color: #000;
  color: #fff;
  font-weight: 900;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.button-container button:hover {
  background-color: #00FF00;
}
</style>
