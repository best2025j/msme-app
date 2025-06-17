<script setup lang="ts"></script>

<template>
  <div
    class="p-6 md:p-13 bg-white md:w-[80%] w-full h-full mx-auto md:h-[900px]"
  >
    <div
      class="max-w-[584px] justify-center h-full flex mx-auto flex-col w-full"
    >
      <h1 class="text-base md:text-3xl text-center font-normal">
        How’d you like to start your career journey?
      </h1>

      <div class="flex md:flex-row flex-col gap-6 justify-between">
        <div class="py-4">
          <div class="space-y-2">
            <div class="border border-[#0000001A] w-full h-[220px] rounded">
              <div
                class="h-full w-full justify-center items-center mx-auto flex"
              >
                <img src="../../assets/svgs/newoffice.svg" alt="" />
              </div>
            </div>
            <div>
              <h1 class="font-medium text-sm md:text-xl">Upload Resume</h1>
              <p class="text-xs text-[#000000B2]">
                Have a resume? Upload and leave the rest to us
              </p>
            </div>
          </div>
        </div>

        <router-link to="/onboarding/upload-resume" class="block">
          <div class="py-4">
            <div class="space-y-2">
              <div class="border border-[#0000001A] w-full h-[220px] rounded">
                <div
                  class="h-full w-full justify-center items-center mx-auto flex"
                >
                  <img src="../../assets/svgs/userSearch.svg" alt="" />
                </div>
              </div>
              <div>
                <h1 class="font-medium text-sm md:text-xl">Create Resume</h1>
                <p class="text-xs text-[#000000B2]">
                  Looking to find and manage job as a freelancer
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scope></style>
