<template>
  <div class="container" :style="{ width: screenWidth + 'px', height: screenHeight + 'px' }">
    <!-- Tombol Back -->
    <div class="back-button" @click="goBack"></div>

    <!-- Tampilan Kamera -->
    <div class="camera-grid">
      <div class="camera-box" v-for="n in 4" :key="n">
        <!-- Menampilkan stream langsung ke dalam camera-box -->
        <img :src="streamUrl" alt="Camera Stream" class="stream-img" />
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
export default {
  name: "CameraView",
  data() {
    return {
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      buttons: ["Launch", "Abort", "Wait", "Resume"],
      streamUrl: "http://10.7.101.152:8080/stream?topic=/image_raw",
      status: "Idle",
    };
  },
  mounted() {
    this.updateScreenSize();
    window.addEventListener("resize", this.updateScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
  methods: {
    updateScreenSize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    },
    goBack() {
      window.location.href = "/";
    },
    handleAction(action) {
      this.status = action;
    },
    confirmAction() {
      alert(`Confirmed action: ${this.status}`);
      this.status = "Idle";
    },
  },
};
</script>

<style scoped>
/* Container Utama */
.container {
  background: url("/Image1.jpeg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Tombol Back */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 72px;
  height: 72px;
  background-image: url("/back.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

/* Grid Kamera */
.camera-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  position: absolute;
  top: 20px;
  left: 100px;
}

/* Kotak Kamera */
.camera-box {
  width: 475px;
  height: 380px;
  background-color: lightgray;
  border: 10px solid black;
  overflow: hidden;
  position: relative;
}

/* Gaya untuk menampilkan stream */
.stream-img {
  width: 100%;
  height: 100%;
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

/* Font di status-bar dibuat dua kali lebih besar */
.status-bar span {
  font-weight: bold;
  font-size: 2em;
}

/* Tombol Confirm dibuat dua kali lebih besar */
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
  flex-direction: row;
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
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  transition: background-color 0.3s ease;
}

/* Efek hover untuk tombol aksi: berubah menjadi hijau terang */
.button-container button:hover {
  background-color: #00FF00;
}
</style>
