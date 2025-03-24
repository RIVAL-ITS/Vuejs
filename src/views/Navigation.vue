<script>
import { useRobotStore } from "/home/nfl/Desktop/ambavue/src/stores/store.js";
import * as THREE from "three";

export default {
  name: "Navigation",
  data() {
    const store = useRobotStore();
    return {
      actions: ["Launch", "Abort", "Wait", "Resume"],
      status: "Idle",
      store, // Simpan store untuk akses dalam template
      socket: null,
      scene: null,
      camera: null,
      renderer: null,
      pointCloud: null,
      // Properti untuk data IMU
      imuX: 0,
      imuY: 0,
      imuVel: 0,
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
    handleAction(action) {
      this.status = action;
    },
    confirmAction() {
      alert(`Confirmed action: ${this.status}`);
      this.status = "Idle";
    },
    // Inisialisasi koneksi ROS dan visualisasi Three.js
    initROS() {
      // Seleksi elemen container untuk visualisasi (left-square)
      const container = this.$el.querySelector(".left-square");
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Setup scene Three.js
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 5;

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      container.appendChild(this.renderer.domElement);

      // Buat koneksi WebSocket ke ROS (pastikan rosbridge berjalan)
      this.socket = new WebSocket("ws://localhost:9090");
      this.socket.onopen = () => {
        console.log("Connected to ROS WebSocket");
        // Subscribe ke topik /livox/imu dengan tipe sensor_msgs/msg/Imu
        this.socket.send(
          JSON.stringify({
            op: "subscribe",
            topic: "/livox/imu",
            type: "sensor_msgs/msg/Imu",
          })
        );
        // Subscribe ke topik /livox/lidar dengan tipe livox_ros_driver2/msg/CustomMsg
        this.socket.send(
          JSON.stringify({
            op: "subscribe",
            topic: "/livox/lidar",
            type: "livox_ros_driver2/msg/CustomMsg",
          })
        );
        // Jika diperlukan, subscribe juga ke sensor_msgs/msg/PointCloud2
        this.socket.send(
          JSON.stringify({
            op: "subscribe",
            topic: "/livox/lidar",
            type: "sensor_msgs/msg/PointCloud2",
          })
        );
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Pisahkan penanganan pesan berdasarkan topik
        if (data.topic === "/livox/imu" && data.msg) {
          this.updateImu(data.msg);
        } else if (data.topic === "/livox/lidar" && data.msg) {
          // Cek apakah pesan memiliki properti 'ranges' (misal dari CustomMsg) atau 'points' (PointCloud2)
          if (data.msg.ranges) {
            this.updateLidar(data.msg.ranges);
          } else if (data.msg.points) {
            this.updateLidar(data.msg.points);
          } else {
            console.warn("Unknown lidar message format", data.msg);
          }
        }
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      this.animate();
    },
    // Fungsi untuk memperbarui data IMU (misalnya, menggunakan linear_acceleration)
    updateImu(imuData) {
      // Sesuaikan mapping dengan field yang diinginkan
      // Misal: global_posx = linear_acceleration.x, global_posy = linear_acceleration.y, vel = linear_acceleration.z
      if (imuData.linear_acceleration) {
        this.imuX = imuData.linear_acceleration.x;
        this.imuY = imuData.linear_acceleration.y;
        this.imuVel = imuData.linear_acceleration.z;
      }
    },
    // Fungsi untuk memperbarui visualisasi LiDAR
    updateLidar(rangesOrPoints) {
      // Hapus pointCloud lama jika ada
      if (this.pointCloud) {
        this.scene.remove(this.pointCloud);
      }

      const geometry = new THREE.BufferGeometry();
      const positions = [];
      // Asumsi: data berupa array nilai jarak atau array titik (sesuaikan dengan format pesan sebenarnya)
      // Jika data berupa nilai jarak, asumsikan sudut dari -90° sampai +90°
      const angle_min = -Math.PI / 2;
      const angle_increment = Math.PI / rangesOrPoints.length;

      rangesOrPoints.forEach((value, i) => {
        // Jika value berupa jarak, hitung posisi 2D
        const angle = angle_min + i * angle_increment;
        const x = value * Math.cos(angle);
        const y = value * Math.sin(angle);
        const z = 0;
        positions.push(x, y, z);
      });

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.05 });
      this.pointCloud = new THREE.Points(geometry, material);
      this.scene.add(this.pointCloud);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.initROS();
  },
};
</script>

<template>
  <div class="navigation-container">
    <div class="back-button" @click="goBack"></div>
    <div class="navigation-title">Navigation</div>
    <!-- Frame sebelah kiri untuk menampilkan LiDAR -->
    <div class="square left-square">
      <!-- Visualisasi LiDAR akan di-render di sini oleh Three.js -->
    </div>
    <div class="square right-square"></div>
    <div class="info-panel">
      <div class="info-section">
        <h3>Position</h3>
        <!-- Menampilkan data IMU yang telah diupdate -->
        <p>global_posx: {{ imuX }}</p>
        <p>global_posy: {{ imuY }}</p>
        <p>vel: {{ imuVel }}</p>
      </div>
      <div class="info-section">
        <h3>Target</h3>
        <p>Jarak: 0</p>
        <p>Est. Time: 12:10</p>
      </div>
      <div class="info-section">
        <h3>Speed</h3>
        <p>Linear: 0.00 m/s</p>
        <p>Angular: 0 rad/s</p>
      </div>
      <div class="info-section">
        <h3>Wheel</h3>
        <p>Wheel FL: 0</p>
        <p>Wheel FR: 0</p>
        <p>Wheel BL: 0</p>
        <p>Wheel BR: 0</p>
      </div>
    </div>
    <div class="status-bar">
      <p>Status: <span>{{ status }}</span></p>
      <button v-if="status !== 'Idle'" @click="confirmAction">Confirm</button>
    </div>
    <div class="actions-panel">
      <button v-for="action in actions" :key="action" @click="handleAction(action)">
        {{ action }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.navigation-container {
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  background: url("Image1.jpeg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

.back-button {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 64px;
  height: 64px;
  background-image: url("back.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.navigation-title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}

.square {
  width: 600px;
  height: 600px;
  background-color: #ccc;
  border: 10px solid #000;
  box-sizing: border-box;
}

.left-square {
  position: absolute;
  top: 100px;
  left: 200px;
}

.right-square {
  position: absolute;
  top: 100px;
  right: 200px;
}

.info-panel {
  position: absolute;
  bottom: 40px;
  left: 50px;
  width: 1000px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 170px;
}

.info-section h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.info-section p {
  margin: 0;
  font-size: 1rem;
}

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

.status-bar span {
  font-weight: bold;
  font-size: 2em;
}

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

.actions-panel {
  position: absolute;
  bottom: 40px;
  right: 50px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.actions-panel button {
  width: 150px;
  height: 75px;
  background-color: #000;
  color: #fff;
  font-weight: 900;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease;
}

.actions-panel button:hover {
  background-color: #00FF00;
}
</style>
