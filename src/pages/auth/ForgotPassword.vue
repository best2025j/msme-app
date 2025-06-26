<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Setup
const router = useRouter();

// State
const email = ref("");
const loading = ref(false);
const error = ref("");

// API Endpoint
const API_URL =
  "https://careerbox-dev-api-89uwx.ondigitalocean.app/auth/forgot-password";

// Submit handler
const submitForgotPassword = async () => {
  // Basic validation
  if (!email.value.trim() || !email.value.includes("@")) {
    error.value = "Please enter a valid email address.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const response = await axios.patch(API_URL, { email: email.value });

    if (response.data.status && response.data.code === 200) {
      alert("✅ Reset code sent to your email.");

      router.push({
        path: "/auth/verify-email",
        query: { email: email.value },
      });
    } else {
      error.value = response.data.message || "An error occurred.";
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || "Failed to send reset code.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="p-6 md:p-13 bg-white w-full md:w-[80%] md:h-[700px] mx-auto flex gap-6"
  >
    <div class="md:w-[50%]">
      <div
        class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-3xl font-normal">Forget password?</h1>
        <p class="font-normal text-sm">
          No worries, we would send you a rest pin to change your password.
        </p>

        <form @submit.prevent="submitForgotPassword">
          <div class="space-y-4 py-4">
            <div class="flex flex-col space-y-2">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model="email"
                placeholder="Johndoe@doe.com@gmail.com"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
              <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
            </div>

            <div class="py-4">
              <button
                type="submit"
                class="bg-[#000000] text-sm cursor-pointer font-medium text-white rounded h-10 w-full"
                :disabled="loading"
              >
                {{ loading ? "Sending..." : "Reset password" }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!--  -->
    <div class="w-1/2 md:block hidden">
      <div class="bg-[#FAFAFA] h-full relative">
        <div class="transform translate-x-6 py-14">
          <h1 class="text-3xl font-normal w-[242px] leading-[100%]">
            You can do more with us!
          </h1>
        </div>

        <div
          class="absolute bottom-10 left-0 transform translate-x-6 space-y-10"
        >
          <div
            class="flex space-x-4 trasform translate-40 bottom-82 absolute hover:scale-105 cursor-pointer rotate-[60deg] z-30 bg-white w-[212px] h-[72px] items-center shadow p-4 rounded"
          >
            <span
              class="bg-[#FAFAFA] w-10 h-10 rounded-full flex items-center justify-center"
            >
              <img
                src="../../assets/svgs/brifcase.svg"
                class="w-full h-full p-1 rotate-[-40deg]"
                alt="Briefcase icon"
              />
            </span>
            <h1 class="text-lg font-semibold">Find jobs</h1>
          </div>

          <!--  -->
          <div
            class="flex space-x-4 trasform bottom-38 absolute translate-18 hover:scale-105 cursor-pointer z-20 rotate-[30deg] bg-white w-[212px] h-[72px] items-center shadow p-4 rounded"
          >
            <span
              class="bg-[#FAFAFA] w-10 h-10 rounded-full flex items-center justify-center"
            >
              <img
                src="../../assets/svgs/layer.svg"
                class="w-full h-full p-1 rotate-[-40deg]"
                alt="Briefcase icon"
              />
            </span>
            <h1 class="text-lg font-semibold">Best matches</h1>
          </div>

          <!--  -->
          <div
            class="flex space-x-4 z-10 bg-white h-[72px] items-center hover:scale-105 cursor-pointer shadow p-4 rounded"
          >
            <span
              class="bg-[#FAFAFA] w-10 h-10 rounded-full flex items-center justify-center"
            >
              <img
                src="../../assets/svgs/office1.svg"
                class="w-full h-full p-2"
                alt="Briefcase icon"
              />
            </span>
            <h1 class="text-lg font-semibold">Profession expert</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
