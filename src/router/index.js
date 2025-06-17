import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import ResetPin from "../pages/auth/ResetPin.vue";
import Completed from "../pages/auth/Completed.vue";
import Onbording from "../pages/auth/Onbording.vue";

const routes = [
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  { path: "/auth/forgot-password", component: ForgotPassword },
  { path: "/auth/reset-pin", component: ResetPin },
  { path: "/auth/completed", component: Completed },
  { path: "/auth/onbording", component: Onbording },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
