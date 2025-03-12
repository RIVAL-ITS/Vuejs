<template>
  <div class="page-container">
    <!-- Daftar Tombol di Tengah (Information, Camera View, Navigation) -->
    <div class="menu-container">
      <!-- Tombol Information -->
      <router-link to="/information">
        <div class="menu-item">
          <div class="menu-icon info-icon"></div>
          <span>Information</span>
        </div>
      </router-link>

      <!-- Tombol Camera View -->
      <router-link to="/camera">
        <div class="menu-item">
          <div class="menu-icon camera-icon"></div>
          <span>Camera View</span>
        </div>
      </router-link>

      <!-- Tombol Navigation -->
      <router-link to="/navigation">
        <div class="menu-item">
          <div class="menu-icon nav-icon"></div>
          <span>Navigation</span>
        </div>
      </router-link>
    </div>

    <!-- Bar Bawah (status baterai, jam, dan ikon user) -->
    <div class="bottom-bar">
      <div class="status-left">100%</div>
      <div class="status-center">{{ currentTime }}</div>
      <div class="status-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      currentTime: "",
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000); // Perbarui setiap detik
  },
  methods: {
    updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      this.currentTime = `${hours} : ${minutes}`;
    },
  },
};
</script>

<style scoped>
/* Kontainer utama dengan ukuran baru 1850 x 968px */
.page-container {
  position: relative;
  width: 1850px;
  height: 968px;
  margin: auto;
  background: url("/Image1.jpeg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

/* Container untuk tombol menu di tengah */
.menu-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 34px; /* Gap disesuaikan (48px * 0.717 ≈ 34px) */
  align-items: center;
}

/* Setiap tombol menu telah diskalakan */
.menu-item {
  position: relative;
  width: 466px;  /* 650px * 0.717 ≈ 466px */
  height: 100px; /* 140px * 0.717 ≈ 100px */
  background: #000;
  border-radius: 36px; /* 50px * 0.717 ≈ 36px */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;  /* Gap antar elemen di dalam tombol, disesuaikan */
  cursor: pointer;
}

/* Teks dalam tombol menu */
.menu-item span {
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 29px; /* 40px * 0.717 ≈ 29px */
  line-height: 120%;
  letter-spacing: -0.01em;
}

/* Ikon pada tombol menu */
.menu-icon {
  width: 46px; /* 64px * 0.717 ≈ 46px */
  height: 46px; /* 64px * 0.717 ≈ 46px */
  background-color: #fff;
  border-radius: 50%;
}

/* Ikon khusus */
.info-icon {
  background-image: url("/info.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.camera-icon {
  background-image: url("/cam.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.nav-icon {
  background-image: url("/navi.jpeg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* Bar Bawah */
.bottom-bar {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 72px; /* 100px * 0.717 ≈ 72px */
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 1000;
  font-size: 23px; /* (2rem ≈ 32px * 0.717) */
}

/* Ukuran teks tengah pada status bar */
.status-center {
  font-size: 34px; /* (3rem ≈ 48px * 0.717) */
}

/* Ukuran ikon user */
.status-right {
  width: 46px; /* 64px * 0.717 ≈ 46px */
  height: 46px; /* 64px * 0.717 ≈ 46px */
  background-color: #fff;
  border-radius: 50%;
}
</style>
