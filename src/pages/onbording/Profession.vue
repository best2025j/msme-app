<script setup lang="ts">
import { ref } from "vue";

const totalSteps = 4;
const currentStep = ref(1);

// const goToStep = (step: number) => {
//   if (step >= 1 && step <= totalSteps) {
//     currentStep.value = step;
//   }
// };

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const selectedProfession = ref("");
const selectedExperience = ref("");

const professions = [
  "Product designer",

  "Developer",

  "Marketer",

  "UI/UX Designer",

  "Project Manager",
];

const experiences = ["Entry-level", "Mid-level", "Senior", "Lead"];
</script>

<template>
  <div class="bg-white w-[80%] h-full mx-auto flex flex-col">
    <div class="flex justify-end pr-8 pt-10">
      <a href="" class="text-sm underline">Skip for now</a>
    </div>

    <div class="font-semibold text-xs pl-16">
      {{ currentStep }} /{{ totalSteps }}
    </div>

    <div class="mb-6 px-6 flex flex-col items-start justify-center rounded">
      <template v-if="currentStep === 1">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">
                Let’s start your career glow-up!
              </h1>

              <div class="space-y-6 py-6">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    >Your profession</label
                  >

                  <select
                    v-model="selectedProfession"
                    class="w-full rounded bg-[#FAFAFA] h-10 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select your profession</option>

                    <option
                      v-for="prof in professions"
                      :key="prof"
                      :value="prof"
                    >
                      {{ prof }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1"
                    >Experience</label
                  >

                  <select
                    v-model="selectedExperience"
                    class="w-full rounded bg-[#FAFAFA] h-10 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select</option>

                    <option
                      v-for="prof in experiences"
                      :key="prof"
                      :value="prof"
                    >
                      {{ prof }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="w-[50%]">
            <div
              class="bg-[#FAFAFA] py-4 flex flex-col justify-center items-center relative"
            >
              <div class="bg-white w-[80%] p-4 border border-gray-500 rounded">
                <div
                  class="flex items-center gap-4 mx-auto w-full justify-between h-full"
                >
                  <div class="flex space-x-4 items-center">
                    <div
                      class="p-2 border w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <img
                        src="../../assets/svgs/messagebox.svg"
                        class="w-full h-full"
                        alt="Briefcase icon"
                      />
                    </div>

                    <h1 class="text-lg font-medium text-black leading-[100%]">
                      Product designer
                    </h1>
                  </div>

                  <button
                    class="text-sm bg-black px-4 p-2 text-white rounded-full"
                  >
                    Match: 96%
                  </button>
                </div>

                <div class="py-4 flex gap-4">
                  <!--  -->
                  <div
                    class="flex trasform bottom-38 cursor-pointer z-20 items-center shadow w-full rounded-full justify-center"
                  >
                    <span class="bg-[#FAFAFA] w-8 h-8">
                      <img
                        src="../../assets/svgs/layer.svg"
                        class="w-full h-full p-1"
                        alt="Briefcase icon"
                      />
                    </span>
                    <h1 class="text-xs font-semibold">Real-estate</h1>
                  </div>
                  <!--  -->
                  <div
                    class="flex trasform bottom-38 cursor-pointer z-20 items-center shadow w-full rounded-full justify-center"
                  >
                    <span class="bg-[#FAFAFA] w-8 h-8">
                      <img
                        src="../../assets/svgs/layer.svg"
                        class="w-full h-full p-1"
                        alt="Briefcase icon"
                      />
                    </span>
                    <h1 class="text-xs font-semibold">Actively hiring</h1>
                  </div>
                  <!--  -->
                  <div
                    class="flex trasform bottom-38 cursor-pointer z-20 items-center shadow w-full rounded-full justify-center"
                  >
                    <span class="bg-[#FAFAFA] w-8 h-8">
                      <img
                        src="../../assets/svgs/layer.svg"
                        class="w-full h-full p-1"
                        alt="Briefcase icon"
                      />
                    </span>
                    <h1 class="text-xs font-semibold">Remote</h1>
                  </div>
                </div>

                <div class="pt-4 border-t flex items-center justify-between">
                  <h1 class="">Baseline</h1>
                  <div class="flex space-x-2 items-center">
                    <img
                      src="../../assets/svgs/messagebox.svg"
                      class="w-5 h-5"
                      alt="Briefcase icon"
                    />

                    <h1 class="text-xs font-medium text-black leading-[100%]">
                      Posted 2 days ago
                    </h1>
                  </div>
                </div>
              </div>

              <div class="justify-start-start w-full -mt-6 flex">
                <img src="../../assets/images/gradient.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentStep === 2">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">
                Let’s start your career glow-up!
              </h1>

              <div class="space-y-6 py-6">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    >Your profession</label
                  >

                  <select
                    v-model="selectedProfession"
                    class="w-full rounded bg-[#FAFAFA] h-10 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select your profession</option>

                    <option
                      v-for="prof in professions"
                      :key="prof"
                      :value="prof"
                    >
                      {{ prof }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1"
                    >Experience</label
                  >

                  <select
                    v-model="selectedExperience"
                    class="w-full rounded bg-[#FAFAFA] h-10 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select</option>

                    <option
                      v-for="prof in experiences"
                      :key="prof"
                      :value="prof"
                    >
                      {{ prof }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="w-[50%]">
            <div
              class="bg-[#FAFAFA] py-4 flex flex-col justify-center items-center relative"
            >
              <div class="bg-white w-[80%] p-4 border border-gray-500 rounded">
                <div
                  class="flex items-center gap-4 mx-auto w-full justify-between h-full"
                >
                  <div class="flex space-x-4 items-center">
                    <div
                      class="p-2 border w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <img
                        src="../../assets/svgs/messagebox.svg"
                        class="w-full h-full"
                        alt="Briefcase icon"
                      />
                    </div>

                    <h1 class="text-lg font-medium text-black leading-[100%]">
                      Product designer
                    </h1>
                  </div>

                  <button
                    class="text-sm bg-black px-4 p-2 text-white rounded-full"
                  >
                    Match: 96%
                  </button>
                </div>

                <div class="py-4 flex gap-4">
                  <!--  -->
                  <div
                    class="flex trasform bottom-38 cursor-pointer z-20 items-center shadow w-full rounded-full justify-center"
                  >
                    <span class="bg-[#FAFAFA] w-8 h-8">
                      <img
                        src="../../assets/svgs/layer.svg"
                        class="w-full h-full p-1"
                        alt="Briefcase icon"
                      />
                    </span>
                    <h1 class="text-xs font-semibold">Real-estate</h1>
                  </div>
                  <!--  -->
                  <div
                    class="flex trasform bottom-38 cursor-pointer z-20 items-center shadow w-full rounded-full justify-center"
                  >
                    <span class="bg-[#FAFAFA] w-8 h-8">
                      <img
                        src="../../assets/svgs/layer.svg"
                        class="w-full h-full p-1"
                        alt="Briefcase icon"
                      />
                    </span>
                    <h1 class="text-xs font-semibold">Actively hiring</h1>
                  </div>
                  <!--  -->
                  <div
                    class="flex trasform bottom-38 cursor-pointer z-20 items-center shadow w-full rounded-full justify-center"
                  >
                    <span class="bg-[#FAFAFA] w-8 h-8">
                      <img
                        src="../../assets/svgs/layer.svg"
                        class="w-full h-full p-1"
                        alt="Briefcase icon"
                      />
                    </span>
                    <h1 class="text-xs font-semibold">Remote</h1>
                  </div>
                </div>

                <div class="pt-4 border-t flex items-center justify-between">
                  <h1 class="">Baseline</h1>
                  <div class="flex space-x-2 items-center">
                    <img
                      src="../../assets/svgs/messagebox.svg"
                      class="w-5 h-5"
                      alt="Briefcase icon"
                    />

                    <h1 class="text-xs font-medium text-black leading-[100%]">
                      Posted 2 days ago
                    </h1>
                  </div>
                </div>
              </div>

              <div class="justify-start-start w-full -mt-6 flex">
                <img src="../../assets/images/gradient.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentStep === 3">
        <p>Step 3: Upload your documents.</p>
      </template>
      <template v-else-if="currentStep === 4">
        <p>Step 4: Review and submit your application.</p>
      </template>

      <!-- buttons for steps -->
      <div class="flex justify-between w-[50%]">
        <button
          v-if="currentStep !== 1"
          @click="prevStep"
          class="w-[114px] py-2 bg-gray-300 rounded"
        >
          Previous
        </button>

        <div v-else class="w-24"></div>
        <!-- empty placeholder to keep layout -->

        <button
          @click="nextStep"
          :disabled="currentStep === totalSteps"
          class="w-[114px] py-2 bg-black text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
</style>
