import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import ResetPin from "../pages/auth/ResetPin.vue";
import Completed from "../pages/auth/Completed.vue";
import Onbording from "../pages/auth/Onbording.vue";
import ChangePassword from "../pages/auth/ChangePassword.vue";
import EmailVerification from "../pages/auth/EmailVerification.vue";
import User from "../pages/onbording/User.vue";
import UploadResume from "../pages/onbording/UploadResume.vue";
import Profession from "../pages/onbording/Profession.vue";

const routes = [
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  { path: "/auth/forgot-password", component: ForgotPassword },
  { path: "/auth/reset-pin", component: ResetPin },
  { path: "/auth/completed", component: Completed },
  { path: "/auth/onbording", component: Onbording },
  { path: "/auth/changepassword", component: ChangePassword },
  { path: "/auth/emailverification", component: EmailVerification },
  { path: "/onbording/user", component: User },
  { path: "/onbording/uploadresume", component: UploadResume },
  { path: "/onbording/profession", component: Profession },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
