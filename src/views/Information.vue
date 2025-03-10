<template>
  <div class="page-container">
    <!-- Tombol Kembali -->
    <div class="back-button" @click="goHome"></div>

    <!-- Judul Bagian Kiri: Information -->
    <div class="title-info">Information</div>

    <!-- Panel Informasi -->
    <div class="info-panel">
      <div class="info-row" v-for="(value, key) in infoData" :key="key">
        <span>{{ key }}</span>
        <span>:</span>
        <span>{{ value }}</span>
      </div>
    </div>

    <!-- Judul Bagian Kanan: Check camera -->
    <div class="camera-title">Check camera</div>

    <!-- Panel Kamera dengan layout grid 2x2 dan background putih semi transparan -->
    <div class="camera-container">
      <div class="camera-feed" v-for="n in 4" :key="n"></div>
    </div>

    <!-- Frame untuk Tombol Aksi -->
    <div class="actions-frame">
      <div class="actions-container">
        <button v-for="action in actions" :key="action">{{ action }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      infoData: {
        "Position x": 0,
        "Position y": 0,
        "Position Theta": 0,
        "V_X": 0,
        "V_Y": 0,
        "V_Theta": 0,
        "Status": "Idle",
        "Tujuan x": 0,
        "Tujuan y": 0,
        "Map status": "Active",
        "Check status": "OK",
      },
      actions: ["Launch", "Abort", "Wait", "Resume"],
    };
  },
  methods: {
    goHome() {
      window.location.href = "/"; // Kembali ke halaman utama
    },
  },
};
</script>

<style scoped>
/* Kontainer utama dengan ukuran baru 1850px x 968px */
.page-container {
  position: relative;
  width: 1850px;
  height: 968px;
  margin: auto;
  background: url("/Image1.jpeg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

/* Tombol Kembali */
.back-button {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 72px;
  height: 72px;
  background-image: url("/back.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

/* Judul Bagian Kiri: Information */
.title-info {
  position: absolute;
  top: 54px;
  left: 209px;
  font-size: 42px;
  color: #fff;
  font-weight: 700;
}

/* Panel Informasi */
.info-panel {
  position: absolute;
  top: 143px;
  left: 49px;
  width: 592px;
  min-height: 481px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 11px;
  padding: 23px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Baris informasi */
.info-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 20px;
  font-weight: 745;
}

/* Judul Bagian Kanan: Check camera */
.camera-title {
  position: absolute;
  top: 29px;
  left: 1100px;
  font-size: 42px;
  color: #fff;
  font-weight: 700;
}

/* Panel Kamera dengan layout grid 2x2 dan background putih semi transparan */
.camera-container {
  position: absolute;
  top: 98px;
  left: 802px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 24px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.camera-feed {
  width: 400px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 11px;
  background-image: url("/anomali.jpeg");
  background-size: cover;
}

/* Frame Tombol Aksi */
.actions-frame {
  position: absolute;
  top: 710px;
  left: 215px;
  width: 215px;
  height: 215px;
  background-color: white;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Container Tombol Aksi */
.actions-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Tombol Aksi */
.actions-container button {
  width: 86px;
  height: 86px;
  border: none;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

/* Efek hover: tombol berubah warna hijau terang */
.actions-container button:hover {
  background-color: #00FF00;
}
</style>
