<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const RecruiterSignup = () => {
  router.push("/auth/recruiter-signup");
};

const TalentSignup = () => {
  router.push("/auth/talent-signup");
};
</script>

<template>
  <div class="p-10 bg-white md:w-[80%] mx-auto h-full md:h-[700px]">
    <div class="md:max-w-[584px] h-full mx-auto items-center flex flex-col justify-center">
      <h1 class="md:text-3xl text-center font-medium mb-10">
        You are joining as a?
      </h1>

      <div class="flex md:flex-row flex-col gap-6 w-full">
        
        <!-- Recruiter Card -->
        <div
          @click="RecruiterSignup"
          class="py-4 cursor-pointer hover:scale-105 transition w-full"
        >
          <div class="space-y-2">
            <div class="border border-gray-200 w-full h-[220px] rounded">
              <div class="h-full w-full flex justify-center items-center">
                <img src="../assets/svgs/newoffice.svg" alt="Recruiter" />
              </div>
            </div>
            <div>
              <h2 class="font-medium text-xl">Recruiter</h2>
              <p class="text-xs text-gray-600">
                Looking to hire and manage freelancers
              </p>
            </div>
          </div>
        </div>

        <!-- Talent Card -->
        <div
          @click="TalentSignup"
          class="py-4 cursor-pointer hover:scale-105 transition w-full"
        >
          <div class="space-y-2">
            <div class="border border-gray-200 w-full h-[220px] rounded">
              <div class="h-full w-full flex justify-center items-center">
                <img src="../assets/svgs/userSearch.svg" alt="Talent" />
              </div>
            </div>
            <div>
              <h2 class="font-medium text-xl">Talent</h2>
              <p class="text-xs text-gray-600">
                Looking to find and manage jobs as a freelancer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
