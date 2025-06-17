<script setup lang="ts">
import { ref } from "vue";

const totalSteps = 7;
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
const selectedLocation = ref("");

const professions = [
  "Product designer",
  "Developer",
  "Marketer",
  "UI/UX Designer",
  "Project Manager",
];

const locations = ["Lagos", "Abuja", "Jos", "Ilorin", "Ondo"]; // Renamed to 'locations'
const experiencesLevel = ["Entry-level", "Mid-level", "Senior", "Lead"];

interface Experience {
  role: string;

  company: string;

  location: string;

  startDate: string;

  endDate: string;

  description: string;
}

const experiences = ref<Experience[]>([]);
const isModalOpen = ref(false);

const newExperience = ref<Experience>({
  role: "",

  company: "",

  location: "",

  startDate: "",

  endDate: "",

  description: "",
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;

  resetNewExperience();
};

const addExperience = (): void => {
  if (newExperience.value.role && newExperience.value.company) {
    experiences.value.push({ ...newExperience.value });

    closeModal();
  } else {
    alert("Please fill in all required fields.");
  }
};

// const editExperience  = (index: number): void => {
//   experiences.value.splice(index, 1);
// };

const removeExperience = (index: number): void => {
  experiences.value.splice(index, 1);
};

const resetNewExperience = (): void => {
  newExperience.value = {
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };
};

//links
</script>

<template>
  <div class="bg-white w-[80%] h-full mx-auto flex flex-col">
    <div class="flex justify-end pr-8 pt-10">
      <a href="" class="text-sm underline">Skip for now</a>
    </div>

    <div class="font-semibold text-xs pl-16">
      {{ currentStep }} /{{ totalSteps }}
    </div>

    <div
      class="mb-6 px-6 flex flex-col items-start justify-center rounded h-full"
    >
      <template v-if="currentStep === 1">
        <div class="flex justify-between w-full pt-24 gap-6">
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
                      v-for="prof in experiencesLevel"
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

              <div class="justify-start w-full -mt-6 flex">
                <img src="../../assets/images/gradient.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!--  -->
      <template v-else-if="currentStep === 2">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">Personal information</h1>

              <div class="py-6 space-y-4">
                <div
                  class="flex justify-between bg-[#FAFAFA] border p-2 border-dashed rounded items-center"
                >
                  <div class="flex gap-2 pt-2">
                    <div
                      class="bg-[#FAFAFA] w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <img
                        src="../../assets/svgs/fileupload.svg"
                        alt="file icon"
                      />
                    </div>

                    <p class="mb-4 text-gray-700 w-[177px] text-sm">
                      Drag and drop document (<span class="font-bold"
                        >.pdf</span
                      >
                      or <span class="font-bold">.doc</span>) to upload
                    </p>
                  </div>

                  <div>
                    <label
                      for="fileUpload"
                      class="inline-block bg-[#ECECEC] text-[#00000080] font-medium px-4 py-2 rounded cursor-pointer transition"
                    >
                      Browse
                    </label>

                    <input
                      id="fileUpload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      class="hidden"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Location</label>

                  <select
                    v-model="selectedLocation"
                    class="w-full rounded bg-[#FAFAFA] h-10 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select Location</option>

                    <option v-for="prof in locations" :key="prof" :value="prof">
                      {{ prof }}
                    </option>
                  </select>
                </div>

                <div class="">
                  <label class="block text-sm font-medium mb-1">Links</label>

                  <div class="flex justify-between text-sm">
                    <button
                      class="bg-[#FAFAFA] cursor-pointer flex items-center gap-2 px-4 py-2 rounded transition"
                      type="button"
                    >
                      <span>
                        <img src="../../assets/svgs/plus.svg" alt="" />
                      </span>
                      LinkedIn
                    </button>
                    <button
                      class="bg-[#FAFAFA] cursor-pointer flex items-center gap-2 px-4 py-2 rounded transition"
                      type="button"
                    >
                      <span>
                        <img src="../../assets/svgs/plus.svg" alt="" />
                      </span>
                      Instagram
                    </button>
                    <button
                      class="bg-[#FAFAFA] cursor-pointer flex items-center gap-2 px-4 py-2 rounded transition"
                      type="button"
                    >
                      <span>
                        <img src="../../assets/svgs/plus.svg" alt="" />
                      </span>
                      Another link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="w-[50%]">
            <div
              class="bg-[#FAFAFA] py-4 flex flex-col justify-center items-center relative"
            >
              <div class="justify-end w-full z-20 flex pr-16">
                <img
                  src="../../assets/images/cube.png"
                  class="h-20 w-auto"
                  alt=""
                />
              </div>

              <div
                class="bg-white w-[80%] -mt-8 p-4 border border-gray-300 rounded"
              >
                <div
                  class="flex items-center gap-4 mx-auto w-full justify-center h-full"
                >
                  <div class="flex flex-col space-y-4 items-center">
                    <div
                      class="border border-gray-300 w-24 h-24 rounded-full flex items-center justify-center"
                    >
                      <img
                        src="../../assets/images/maleprofile.png"
                        alt="Briefcase icon"
                        class="w-full h-full"
                      />
                    </div>

                    <h1
                      class="text-lg pt-4 font-medium text-black leading-[100%]"
                    >
                      Product designer
                    </h1>

                    <p class="text-sm font-medium text-black leading-[100%]">
                      Software engineer, Frontend developer, Full stack
                      developer
                    </p>
                  </div>
                </div>

                <div class="py-4 flex gap-2">
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
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="currentStep === 3">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">Relevant work experience</h1>

              <div class="py-6 space-y-4">
                <div
                  class="flex justify-between h-[247px] border p-2 border-dashed rounded items-center"
                >
                  <div
                    @click="openModal"
                    class="flex justify-center text-center items-center w-full flex-col gap-2 pt-2"
                  >
                    <div
                      class="border border-gray-400 w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <img src="../../assets/svgs/plus.svg" alt="file icon" />
                    </div>

                    <button class="mb-4 text-black font-medium text-sm">
                      Add experience
                    </button>
                  </div>
                </div>

                <div v-if="experiencesLevel.length" class="space-y-4">
                  <div
                    v-for="(experiences, index) in experiences"
                    :key="index"
                    class="flex justify-between border p-4 rounded"
                  >
                    <div class="w-full space-y-1">
                      <div class="flex justify-between">
                        <h3 class="font-semibold text-base">
                          {{ experiences.role }}
                        </h3>

                        <div class="flex space-x-3">
                          <button
                            class="cursor-pointer"
                          >
                            <img
                              src="../../assets/svgs/edit.svg"
                              alt="file icon"
                            />
                          </button>
                          <button
                            @click="removeExperience(index)"
                            class="cursor-pointer"
                          >
                            <img
                              src="../../assets/svgs/delete.svg"
                              alt="file icon"
                            />
                          </button>
                        </div>
                      </div>

                      <div class="flex justify-between w-full space-y-4">
                        <p class="text-sm">
                          {{ experiences.company }} - {{ experiences.location }}
                        </p>

                        <p class="text-sm">
                          {{ experiences.startDate }} -
                          {{ experiences.endDate }}
                        </p>
                      </div>
                      <textarea rows="8" class="w-full">{{
                        experiences.description
                      }}</textarea>
                    </div>
                  </div>
                </div>

                <!-- modal -->
                <div
                  v-if="isModalOpen"
                  class="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50"
                >
                  <div
                    class="bg-white p-6 rounded-xl w-full max-w-xl max-h-[90vh] overflow-auto"
                  >
                    <div
                      class="w-[80%] mx-auto justify-center items-start flex flex-col"
                    >
                      <div class="flex justify-end w-full">
                        <button
                          type="button"
                          @click="closeModal"
                          class="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <img
                            src="../../assets/svgs/cancel.svg"
                            class="w-6 h-6"
                            alt="file icon"
                          />
                        </button>
                      </div>

                      <h2 class="text-lg font-semibold mb-4">Add Experience</h2>

                      <form @submit.prevent="addExperience" class="space-y-4">
                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Your role at the company</label
                          >

                          <input
                            v-model="newExperience.role"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="your role"
                          />
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Company’s name</label
                          >

                          <input
                            v-model="newExperience.company"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="your company name"
                          />
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Location</label
                          >

                          <input
                            v-model="newExperience.location"
                            placeholder="your location"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div class="flex space-x-4">
                          <div class="flex-1">
                            <label class="block font-medium mb-1 text-sm"
                              >Start date</label
                            >

                            <input
                              v-model="newExperience.startDate"
                              type="month"
                              placeholder="MM-YYYY"
                              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div class="flex-1">
                            <label class="block font-medium mb-1 text-sm"
                              >End date</label
                            >

                            <input
                              v-model="newExperience.endDate"
                              type="month"
                              placeholder="MM-YYYY"
                              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Description</label
                          >

                          <textarea
                            v-model="newExperience.description"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                          ></textarea>
                        </div>

                        <div class="flex justify-between text-sm space-x-4">
                          <button
                            type="button"
                            @click="closeModal"
                            class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            class="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
          <div class="w-[50%]">
            <div
              class="bg-[] py-4 flex flex-col justify-center items-center relative"
            >
              <img
                src="../../assets/images/team.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="currentStep === 4">
        <p>Step 4: Review and submit your application.</p>
      </template>
      <template v-else-if="currentStep === 5">
        <p>Step 4: Review and submit your application.</p>
      </template>
      <template v-else-if="currentStep === 6">
        <p>Step 4: Review and submit your application.</p>
      </template>
      <template v-else-if="currentStep === 7">
        <p>Step 4: Review and submit your application.</p>
      </template>

      <!-- buttons for steps -->
      <div class="flex justify-between w-[45%] pl-10">
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

<style scoped></style>
