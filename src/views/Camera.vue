<template>
  <div class="container">
    <!-- Tombol Back -->
    <div class="back-button" @click="goBack"></div>

    <!-- Judul Kamera -->
    <h1 class="title">Camera View</h1>

    <!-- Tampilan Kamera -->
    <div class="camera-grid">
      <div class="camera-box" v-for="n in 4" :key="n">
        <!-- Menampilkan stream langsung ke dalam camera-box -->
        <img :src="streamUrl" alt="Camera Stream" class="stream-img" />
      </div>
    </div>

    <!-- Tombol Aksi -->
    <div class="button-container">
      <button v-for="button in buttons" :key="button">{{ button }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CameraView",
  data() {
    return {
      buttons: ["Launch", "Abort", "Wait", "Resume"],
      streamUrl: "http://10.7.101.152:8080/stream?topic=/image_raw"
    };
  },
  methods: {
    goBack() {
      window.location.href = "/"; // Kembali ke halaman utama
    }
  }
};
</script>

<style scoped>
/* Container Utama */
.container {
  width: 1850px;
  height: 968px;
  background: url("/Image1.jpeg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Tombol Back */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 150px;
  height: 150px;
  background-image: url("/back.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}

/* Judul Kamera */
.title {
  position: absolute;
  top: 50px;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}

/* Grid Kamera */
.camera-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  position: absolute;
  top: 200px;
}

/* Kotak Kamera */
.camera-box {
  width: 350px;
  height: 350px;
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

/* Container Tombol Aksi */
.button-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

/* Tombol Aksi */
.button-container button {
  width: 150px;
  height: 75px;
  border: none;
  border-radius: 20px;
  background-color: white;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Efek hover untuk tombol aksi: berubah menjadi hijau terang */
.button-container button:hover {
  background-color: #00FF00;
}
</style>
