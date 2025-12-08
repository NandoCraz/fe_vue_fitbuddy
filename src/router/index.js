import Login from "@/Login.vue";
import Register from "@/Register.vue";
import Front from "@/components/Front.vue";
import Profile from "@/components/Profile.vue";
import WorkoutPlan from "@/components/WorkoutPlan.vue";
import Timer from "@/components/Timer.vue";
import Track from "@/components/Track.vue";
import Kalori from "@/components/Kalori.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/useAuth";

const routes = [
  {
    path: "/",
    name: "Front",
    component: Front,
    meta: { layout: "app" }, // Pakai AppLayout (dengan navbar)
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "blank", // Pakai BlankLayout (tanpa navbar)
      guest: true, // Hanya bisa diakses kalau belum login
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      layout: "blank",
      guest: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "app",
      requiresAuth: true,
    },
  },
  {
    path: "/workout-plan",
    name: "WorkoutPlan",
    component: WorkoutPlan,
    meta: {
      layout: "app",
      requiresAuth: true,
    },
  },
  {
    path: "/timer",
    name: "Timer",
    component: Timer,
    meta: {
      layout: "app",
      requiresAuth: true,
    },
  },
  // {
  //   path: "/track",
  //   name: "Track",
  //   component: Track,
  //   meta: {
  //     layout: "app",
  //     requiresAuth: true,
  //   },
  // },
  {
    path: "/calorie-predictor",
    name: "Kalori",
    component: Kalori,
    meta: {
      layout: "app",
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
