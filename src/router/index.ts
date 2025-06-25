// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import TalentSignup from "../pages/auth/talent/Signup.vue";
import RecruiterSignup from "../pages/auth/recruiter/Signup.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import ResetPin from "../pages/auth/ResetPin.vue";
import Completed from "../pages/onboarding/Completed.vue";
import Onboarding from "../pages/auth/Onboarding.vue";
import ChangePassword from "../pages/auth/ChangePassword.vue";
import VerifyEmail from "../pages/auth/VerifyEmail.vue";
import User from "../pages/onboarding/User.vue";
import UploadResume from "../pages/onboarding/UploadResume.vue";
import Profession from "../pages/onboarding/Profession.vue";
import Summary from "../pages/onboarding/Summary.vue";

// 👇 Add RouteRecordRaw type here
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },

  // auth route
  { path: "/auth/talent-signup", component: TalentSignup },
  { path: "/auth/recruiter-signup", component: RecruiterSignup },
  { path: "/auth/login", component: Login },
  { path: "/auth/forgot-password", component: ForgotPassword },
  { path: "/auth/reset-pin", component: ResetPin },
  { path: "/onboarding/completed", component: Completed },
  { path: "/auth/onboarding", component: Onboarding },
  { path: "/auth/change-password", component: ChangePassword },
  { path: "/auth/verify-email", component: VerifyEmail }, // ✅ this is the route that must exist

  // onboarding route
  { path: "/onboarding/user", component: User },
  { path: "/onboarding/upload-resume", component: UploadResume },
  { path: "/onboarding/profession", component: Profession },
  { path: "/onboarding/summary", component: Summary },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Example: block access to dashboard if not logged in
//   if (to.path.includes("/dashboard") && !token) {
//     next("/auth/login");
//   } else {
//     next();
//   }
// });

export default router;
