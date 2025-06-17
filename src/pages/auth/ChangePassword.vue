<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToUser = () => {
  router.push("/onboarding/user");
};
</script>

<template>
  <div
    class="p-6 md:p-13 bg-white w-full nd:w-[80%] md:h-[700px] mx-auto flex gap-6"
  >
    <div class="md:w-[50%]">
      <div
        class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-3xl font-normal">Reset password?</h1>
        <p class="font-normal text-sm">
          No worries, we would send you a rest pin to change your password.
        </p>

        <form action="" @submit.prevent="">
          <div class="space-y-4 py-4">
            <div class="flex flex-col space-y-2">
              <label for="">New password</label>
              <input
                type="text"
                placeholder="***************"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="">Confirm password</label>
              <input
                type="text"
                placeholder="***************"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="py-4">
              <button
                type="submit"
                @click="goToUser"
                class="bg-[#000000] text-sm cursor-pointer font-medium text-white rounded h-10 w-full"
              >
                Reset password
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
