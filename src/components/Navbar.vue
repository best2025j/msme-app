<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const login = () => {
  router.push("/auth/login");
};

const signup = () => {
  router.push("/auth/signup");
};
</script>

<template>
  <div class="w-full mb-10">
    <div class="pl-[220px] flex items-end justify-between bg-[#FAFAFA]  shadow-black p-4">
      <span> <img src="../assets/svgs/logo.svg " alt="" /> </span>

      <ul class="pr-[220px] space-x-4 ">
        <button
          @click="signup"
          class="border-gray-300 border text-black px-6 py-2 rounded"
        >
          Login
        </button>
        <button @click="login" class="bg-black text-white px-6 py-2 rounded">
          signup
        </button>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
