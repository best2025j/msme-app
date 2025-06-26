<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

// Setup
const router = useRouter();
const route = useRoute();

const pin = ref<string[]>(["", "", "", "", "", ""]);
const inputs = ref<(HTMLInputElement | null)[]>([]);

const loading = ref(false);
const error = ref("");

const email = ref((route.query.email as string) || "");

// API URLs endpoint
const VERIFY_URL =
  "https://careerbox-dev-api-89uwx.ondigitalocean.app/auth/verify-email";
const RESEND_URL =
  "https://careerbox-dev-api-89uwx.ondigitalocean.app/auth/resend-token";

// Submit pin for verification
const verifyPin = async () => {
  const fullPin = pin.value.join("");

  if (fullPin.length !== 6) {
    alert("Please enter the 6-digit code.");
    return;
  }

  const token = localStorage.getItem("token");
  console.log("Retrieved token:", token);

  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const response = await axios.patch(
      VERIFY_URL,
      {
        email: email.value,
        code: fullPin,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Verification success:", response.data);

    if (response.data.status && response.data.code === 200) {
      // Save new token from response (if present)
      const newToken = response.data?.data?.token;
      if (newToken) {
        localStorage.setItem("token", newToken);
      }

      alert("✅ Email verified successfully!");
      router.push({ path: "/onboarding/user" });
    } else {
      alert("⚠️ " + response.data.message);
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || "Verification failed.";
    alert("❌ " + error.value);
  } finally {
    loading.value = false;
    pin.value = ["", "", "", "", "", ""]; // Clear pin input
  }
};

// Autofocus first input
onMounted(() => {
  inputs.value[0]?.focus();
});

// Resend code
const resendCode = async () => {
  try {
    await axios.patch(RESEND_URL, {
      email: email.value,
    });
    alert("📩 A new code was sent to " + email.value);
  } catch (err: any) {
    alert("❌ Failed to resend code.");
  }
};

// Handle pin focus
const focusNext = (index: number) => {
  if (pin.value[index].length === 1 && index < 5) {
    inputs.value[index + 1]?.focus();
  }
};

const focusPrev = (index: number) => {
  if (pin.value[index] === "" && index > 0) {
    inputs.value[index - 1]?.focus();
  }
};
</script>

<template>
  <div
    class="p-4 md:p-13 bg-white w-full md:w-[80%] md:h-[700px] mx-auto flex gap-6"
  >
    <!-- Left Side -->
    <div class="md:w-[50%]">
      <div
        class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-3xl font-normal">Verify your email</h1>
        <p class="font-normal text-sm">
          Please enter the 6-digit code that was sent to
          {{ email || "your email" }}
        </p>

        <form @submit.prevent="verifyPin" class="space-y-6 py-6 w-full">
          <!-- PIN Inputs -->
          <div class="flex justify-between gap-3">
            <input
              v-for="index in pin.length"
              :key="index"
              type="text"
              maxlength="1"
              class="w-14 h-14 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="pin[index - 1]"
              @input="focusNext(index - 1)"
              @keydown.backspace="focusPrev(index - 1)"
              ref="inputs"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="bg-black text-white text-sm font-medium h-10 w-full rounded hover:bg-gray-900 transition disabled:opacity-50"
          >
            {{ loading ? "Verifying..." : "Verify Pin" }}
          </button>

          <!-- Resend -->
          <div class="text-sm text-center">
            Didn’t get the code?
            <a href="#" @click.prevent="resendCode">
              <b class="text-black underline">Send a new code</b>
            </a>
          </div>

          <p v-if="error" class="text-center text-red-500 text-sm">
            {{ error }}
          </p>
        </form>
      </div>
    </div>

    <!-- Right Side -->
    <div class="w-1/2 md:block hidden">
      <div
        class="bg-[#FAFAFA] h-full justify-center mx-auto items-center relative"
      >
        <div
          class="flex flex-col mx-auto w-full justify-center h-full items-center space-y-4"
        >
          <div
            class="bg-white p-4 w-37 h-37 rounded-full flex items-center justify-center"
          >
            <img
              src="../../assets/svgs/messagebox.svg"
              class="w-full h-full p-1"
              alt="Message icon"
            />
          </div>
          <h1 class="text-3xl pt-6 font-normal leading-[100%]">Email sent</h1>
          <p class="text-sm text-[#000000B2]">
            Check your email and enter the code.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional enhancements */
</style>
