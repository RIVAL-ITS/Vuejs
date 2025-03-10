import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Information from "../views/Information.vue";
import Camera from "../views/Camera.vue";
import Navigation from "../views/Navigation.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/information", component: Information },
  { path: "/camera", component: Camera },
  { path: "/navigation", component: Navigation },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
