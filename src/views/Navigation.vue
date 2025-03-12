<template>
  <div class="navigation-container">
    <!-- Tombol Kembali (Back) -->
    <div class="back-button" @click="goBack"></div>

    <!-- Judul Bagian: Navigation -->
    <div class="navigation-title">Navigation</div>

    <!-- Dua Kotak Persegi (misalnya untuk menampilkan peta/kamera) -->
    <div class="square left-square"></div>
    <div class="square right-square"></div>

    <!-- Panel Informasi (Position, Target, Speed, Wheel) -->
    <div class="info-panel">
      <div class="info-section">
        <h3>Position</h3>
        <p>global_posx: 0</p>
        <p>global_posy: 0</p>
        <p>vel: 0</p>
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

    <!-- Bar Status -->
    <div class="status-bar">
      <p>Status: <span>{{ status }}</span></p>
      <button v-if="status !== 'Idle'" @click="confirmAction">Confirm</button>
    </div>

    <!-- Panel Tombol Aksi (Launch, Abort, Wait, Resume) -->
    <div class="actions-panel">
      <button v-for="action in actions" :key="action" @click="handleAction(action)">
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      actions: ["Launch", "Abort", "Wait", "Resume"],
      status: "Idle",
    };
  },
  methods: {
    goBack() {
      // Kembali ke halaman utama
      window.history.back();
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
/* Kontainer Utama dengan ukuran 1850 x 968 */
.navigation-container {
  position: relative;
  width: 1850px;
  height: 968px;
  margin: 0 auto;
  background: url("Image1.jpeg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

/* Tombol Kembali */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 64px;
  height: 64px;
  background-image: url("back.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

/* Judul Navigation */
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

/* Kotak Persegi (kiri dan kanan) */
.square {
  width: 600px;
  height: 600px;
  background-color: #ccc;
  border: 10px solid #000;
  box-sizing: border-box;
}

/* Kotak Persegi Kiri */
.left-square {
  position: absolute;
  top: 100px;
  left: 200px;
}

/* Kotak Persegi Kanan */
.right-square {
  position: absolute;
  top: 100px;
  right: 200px;
}

/* Panel Informasi di bagian bawah kiri */
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

/* Tombol Aksi */
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

/* Efek hover: tombol berubah warna hijau terang */
.actions-panel button:hover {
  background-color: #00FF00;
}
</style>
