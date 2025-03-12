<template>
  <div class="navigation-container">
    <div class="back-button" @click="goBack"></div>
    <div class="navigation-title">Navigation</div>
    <div class="square left-square"></div>
    <div class="square right-square"></div>
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
      window.history.back();
    },
    handleAction(action) {
      this.status = action;
    },
    confirmAction() {
      alert(`Confirmed action: ${this.status}`);
      this.status = "Idle";
    },
    updateContainerSize() {
      const container = document.querySelector(".navigation-container");
      container.style.width = `${window.innerWidth}px`;
      container.style.height = `${window.innerHeight}px`;
    }
  },
  mounted() {
    this.updateContainerSize();
    window.addEventListener("resize", this.updateContainerSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateContainerSize);
  }
};
</script>

<style scoped>
.navigation-container {
  position: relative;
  margin: 0 auto;
  background: url("Image1.jpeg") no-repeat center center;
  background-size: cover;
  overflow: hidden;
}

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

.navigation-title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.square {
  width: 30vw;
  height: 30vw;
  background-color: #ccc;
  border: 10px solid #000;
  box-sizing: border-box;
}

.left-square {
  position: absolute;
  top: 10vh;
  left: 10vw;
}

.right-square {
  position: absolute;
  top: 10vh;
  right: 10vw;
}

.info-panel {
  position: absolute;
  bottom: 5vh;
  left: 5vw;
  width: 45vw;
  height: 20vh;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  gap: 5vw;
}

.status-bar {
  position: absolute;
  bottom: 15vh;
  right: 10vw;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
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

.actions-panel {
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  display: flex;
  flex-direction: row;
  gap: 2vw;
}

.actions-panel button {
  width: 8vw;
  height: 4vw;
  background-color: #000;
  color: #fff;
  font-weight: 900;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.actions-panel button:hover {
  background-color: #00FF00;
}
</style>
