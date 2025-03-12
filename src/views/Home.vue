<template>
  <div class="page-container" :style="{ width: screenWidth + 'px', height: screenHeight + 'px' }">
    <!-- Daftar Tombol di Tengah (Information, Camera View, Navigation) -->
    <div class="menu-container">
      <router-link to="/information">
        <div class="menu-item">
          <div class="menu-icon info-icon"></div>
          <span>Information</span>
        </div>
      </router-link>

      <router-link to="/camera">
        <div class="menu-item">
          <div class="menu-icon camera-icon"></div>
          <span>Camera View</span>
        </div>
      </router-link>

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
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      currentTime: "",
    };
  },
  mounted() {
    this.updateScreenSize();
    window.addEventListener("resize", this.updateScreenSize);
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
  methods: {
    updateScreenSize() {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    },
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
.page-container {
  position: relative;
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
  gap: 34px;
  align-items: center;
}

/* Setiap tombol menu */
.menu-item {
  position: relative;
  width: 466px;
  height: 100px;
  background: #000;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
}

/* Teks dalam tombol menu */
.menu-item span {
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 29px;
  line-height: 120%;
  letter-spacing: -0.01em;
}

/* Ikon pada tombol menu */
.menu-icon {
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 50%;
}

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
  height: 72px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 1000;
  font-size: 23px;
}

.status-center {
  font-size: 34px;
}

.status-right {
  width: 46px;
  height: 46px;
  background-color: #fff;
  border-radius: 50%;
}
</style>
