<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_URL =
  "https://careerbox-dev-api-89uwx.ondigitalocean.app/auth/signin";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const success = ref(false);
const userType = ref("");

const login = async () => {
  if (!email.value || !password.value || !userType.value) {
    error.value = "All fields are required.";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = false;

  try {
    const response = await axios.post(API_URL, {
      email: email.value,
      password: password.value,
      type: userType.value, // Ensure this matches the backend enum: RECRUITER | TALENT | ADMIN
    });

    success.value = true;
    console.log("✅ Login Success:", response.data);

    const token = response.data?.data?.token;

    if (token) {
      localStorage.setItem("token", token);
      console.log("✅ Token stored:", token);

      router.push({
        path: "/auth/verify-email",
        query: { email: email.value },
      });
    } else {
      throw new Error("Token missing in response.");
    }

    // Clear form
    email.value = "";
    password.value = "";
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login failed.";
    console.error("❌ Login Error:", error.value);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="md:p-13 p-6 bg-white w-fill md:w-[80%] mx-auto flex">
    <div class="md:w-1/2">
      <div
        class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-base md:text-3xl font-normal">
          It’s nice to have you back!
        </h1>
        <p class="font-normal text-sm">
          A place to connect with the right opportunities to advance your
          career.
        </p>

        <form @submit.prevent="login">
          <div class="space-y-4 py-4">
            <div class="flex flex-col space-y-2">
              <label for="">Email</label>
              <input
                type="text"
                v-model="email"
                autocomplete="off"
                placeholder="Johndoe@doe.com@gmail.com"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="">Password</label>
              <input
                type="password"
                v-model="password"
                placeholder="***************"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>

            <div class="flex flex-col space-y-2">
              <label for="role">Login as</label>
              <select
                id="role"
                v-model="userType"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4"
              >
                <option disabled value="">Select user type</option>
                <option value="RECRUITER">Recruiter</option>
                <option value="TALENT">Talent</option>
              </select>
            </div>

            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
            <div v-if="success" class="text-green-500 text-sm">
              Login successful!
            </div>

            <div class="py-4">
              <button
                type="submit"
                class="bg-[#000000] text-sm cursor-pointer font-medium text-white rounded h-10 w-full"
              >
                {{ loading ? "Logging in..." : "Continue" }}
              </button>
            </div>
          </div>

          <!--  links-->
          <div class="text-sm space-y-4">
            <div class="flex justify-between items-center py-4">
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="keepLoggedIn" class="mr-2" />
                <span>Keep me logged in</span>
              </label>
              <a
                href="/auth/forgot-password"
                class="text-black underline font-bold"
              >
                Forget password?
              </a>
            </div>

            <h1 class="text-[#00000080] text-center">
              Don’t have an account?
              <a href="/auth/recruiter-signup "
                ><b class="text-black">Sign up here</b></a
              >
            </h1>
          </div>
        </form>
      </div>
    </div>

    <!-- side image done -->
    <div class="w-1/2 md:block hidden">
      <div class="relative">
        <img
          src="../../assets/images/image.png"
          class="w-full h-full object-cover"
          alt=""
        />

        <div class="absolute top-10 transform translate-x-6">
          <img src="../../assets/images/chatBox.png" />
          <div class="flex gap-3 items-center absolute top-3 left-3">
            <img src="../../assets/images/maleAvatar.png" />
            <h1 class="text-xs">Seeking role?</h1>
          </div>
        </div>

        <div class="absolute bottom-14 right-6">
          <img src="../../assets/images/chatBox2.png" class="" />
          <div class="flex gap-3 items-center absolute top-3 left-3">
            <img src="../../assets/images/femaleAvatar.png" />
            <h1 class="text-xs">Professional?</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
