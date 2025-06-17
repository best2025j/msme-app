<template>
  <div
    class="bg-svg-background w-full flex items-center justify-center"
  >
    <div class="flex flex-col items-center space-y-2">
      <h1 class="text-3xl font-normal text-gray-900">
        Congratulations!! You have completed this task
      </h1>

      <h1 class="text-xs text-[#00000080]">Submit and wait for feedback</h1>

      <div class="py-4">
        <button
          class="bg-[#000000] text-sm font-medium cursor-pointer text-white rounded h-10 w-[182px]"
        >
          Go to dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// You can add any TypeScript logic here if needed
</script>

<style scoped>
.bg-svg-background {
  background-image: url("../../assets/svgs/bg-clip.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 88vh;
}
</style>
