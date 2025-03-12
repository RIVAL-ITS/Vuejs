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

    <!-- Bar Status dengan tombol konfirmasi -->
    <div class="status-bar">
      <p>Status: <span>{{ status }}</span></p>
      <button v-if="status !== 'Idle'" @click="confirmAction">Confirm</button>
    </div>

    <!-- Tombol Aksi (Launch, Abort, Wait, Resume) -->
    <div class="actions-panel">
      <button v-for="action in actions" :key="action" @click="handleAction(action)">
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script>
import { useRobotStore } from "/home/nfl/Desktop/ambavue/src/stores/store.js"; // pastikan path-nya sesuai

export default {
  name: "App",
  computed: {
    infoData() {
      // Mengambil data langsung dari store
      const store = useRobotStore();
      return {
        "Position x": store.dataRobot.pos_x,
        "Position y": store.dataRobot.pos_y,
        "Position Theta": store.dataRobot.pos_theta,
        "V_X": store.dataRobot.v_x,
        "V_Y": store.dataRobot.v_y,
        "V_Theta": store.dataRobot.v_theta,
        "Status": store.bs2pc.status, // ambil status dari store, misal: 0
        "Tujuan x": store.bs2pc.tujuan_x,
        "Tujuan y": store.bs2pc.tujuan_y,
        "Map status": store.utils.mapStatus,
        "Check status": "OK",
      };
    },
  },
  data() {
    return {
      actions: ["Launch", "Abort", "Wait", "Resume"],
      status: "Idle",
    };
  },
  methods: {
    goHome() {
      window.location.href = "/"; // Kembali ke halaman utama
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
  left: 1100px;
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
  left: 102px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 24px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.camera-feed {
  width: 450px;
  height: 360px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 11px;
  background-image: url("/anomali.jpeg");
  background-size: cover;
}

/* Bar Status */
.status-bar {
  position: absolute;
  bottom: 140px; /* Diletakkan di atas panel aksi */
  right: 200px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  height: 72px; /* Tinggi frame tetap sama */
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
  padding: 10px 20px; /* padding yang lebih besar */
  border-radius: 10px;
  cursor: pointer;
  font-size: 2em;
}

.status-bar button:hover {
  background-color: #005f73;
}


/* Panel Tombol Aksi di bagian bawah kanan */
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
