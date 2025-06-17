<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();


// --- Step Management ---
const totalSteps = 7;
const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  } else {
    router.push("/onboarding/completed");
  }
};
const prevStep = () => currentStep.value > 1 && currentStep.value--;

// --- Form Selections ---
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

const locations = ["Lagos", "Abuja", "Jos", "Ilorin", "Ondo"];
const experiencesLevel = ["Entry-level", "Mid-level", "Senior", "Lead"];

// --- Interfaces ---
interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  field: string;
  school: string;
  startDate: string;
  endDate: string;
  otherInfo: string;
}

interface Certification {
  certification: string;
  issuingOrganization: string;
  credentialID: string;
  startDate: string;
  endDate: string;
  description: string;
}

// --- Reactive State ---
const experiences = ref<Experience[]>([]);
const educations = ref<Education[]>([]);
const certifications = ref<Certification[]>([]);

const newExperience = ref<Experience>({
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

const newEducation = ref<Education>({
  degree: "",
  field: "",
  school: "",
  startDate: "",
  endDate: "",
  otherInfo: "",
});

const newCertification = ref<Certification>({
  certification: "",
  issuingOrganization: "",
  credentialID: "",
  startDate: "",
  endDate: "",
  description: "",
});

// --- Modal Control ---
const isExperienceModalOpen = ref(false);
const isEducationModalOpen = ref(false);
const isCertificationModalOpen = ref(false);

// experience
const openExperienceModal = () => (isExperienceModalOpen.value = true);
const closeExperienceModal = () => (isExperienceModalOpen.value = false);
// education
const openEducationModal = () => (isEducationModalOpen.value = true);
const closeEducationModal = () => (isEducationModalOpen.value = false);
// certifications
const openCertificationModal = () => (isCertificationModalOpen.value = true);
const closeCertificationModal = () => (isCertificationModalOpen.value = false);

// --- LocalStorage Sync ---
const EXPERIENCES_STORAGE_KEY = "user_experiences";
const EDUCATIONS_STORAGE_KEY = "user_educations";
const CERTIFICATIONS_STORAGE_KEY = "user_certifications";

onMounted(() => {
  const savedExp = localStorage.getItem(EXPERIENCES_STORAGE_KEY);
  if (savedExp) experiences.value = JSON.parse(savedExp);

  const savedEdu = localStorage.getItem(EDUCATIONS_STORAGE_KEY);
  if (savedEdu) educations.value = JSON.parse(savedEdu);

  const savedCer = localStorage.getItem(CERTIFICATIONS_STORAGE_KEY);
  if (savedCer) certifications.value = JSON.parse(savedCer);
});

watch(
  experiences,
  (val) => {
    localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true }
);

watch(
  educations,
  (val) => {
    localStorage.setItem(EDUCATIONS_STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true }
);

watch(
  certifications,
  (val) => {
    localStorage.setItem(CERTIFICATIONS_STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true }
);

// --- Add Handlers ---
const addExperience = () => {
  if (newExperience.value.role && newExperience.value.company) {
    experiences.value.push({ ...newExperience.value });
    resetNewExperience();
    closeExperienceModal();
  } else {
    alert("Please fill in all required fields.");
  }
};

const addEducation = () => {
  if (newEducation.value.degree && newEducation.value.school) {
    educations.value.push({ ...newEducation.value });
    resetNewEducation();
    closeEducationModal();
  } else {
    alert("Please fill in all required fields.");
  }
};

const addCertification = () => {
  if (
    newCertification.value.certification &&
    newCertification.value.issuingOrganization
  ) {
    certifications.value.push({ ...newCertification.value });
    resetNewCertification();
    closeCertificationModal();
  } else {
    alert("Please fill in all required fields.");
  }
};

// --- Remove Handlers ---
const removeExperience = (index: number) => experiences.value.splice(index, 1);
const removeEducation = (index: number) => educations.value.splice(index, 1);
const removCertification = (index: number) =>
  certifications.value.splice(index, 1);

// --- Reset Handlers ---
const resetNewExperience = () => {
  newExperience.value = {
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  };
};

const resetNewEducation = () => {
  newEducation.value = {
    degree: "",
    field: "",
    school: "",
    startDate: "",
    endDate: "",
    otherInfo: "",
  };
};

const resetNewCertification = () => {
  newCertification.value = {
    certification: "",
    issuingOrganization: "",
    credentialID: "",
    startDate: "",
    endDate: "",
    description: "",
  };
};
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

      <!--  -->
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
                    @click="openExperienceModal"
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

                <div v-if="experiences.length" class="space-y-4">
                  <div
                    v-for="(experience, index) in experiences"
                    :key="index"
                    class="flex justify-between border p-4 rounded"
                  >
                    <div class="w-full space-y-1">
                      <div class="flex justify-between">
                        <h3 class="font-semibold text-base">
                          {{ experience.role }}
                        </h3>

                        <div class="flex space-x-3">
                          <button class="cursor-pointer">
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
                          {{ experience.company }} - {{ experience.location }}
                        </p>

                        <p class="text-sm">
                          {{ experience.startDate }} -
                          {{ experience.endDate }}
                        </p>
                      </div>
                      <textarea rows="8" class="w-full">{{
                        experience.description
                      }}</textarea>
                    </div>
                  </div>
                </div>

                <!-- modal -->
                <div
                  v-if="isExperienceModalOpen"
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
                          @click="closeExperienceModal"
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
                            @click="closeExperienceModal"
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

      <!--  -->
      <template v-else-if="currentStep === 4">
        <div class="bg-white w-full mx-auto flex gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">
                Skills in relation to your profession
              </h1>

              <form @submit.prevent="" class="space-y-6 py-6">
                <div class="flex flex-col text-sm space-y-2">
                  <label for="">Skill</label>
                  <input
                    type="text"
                    placeholder="Virtual Assistant, Receptionist skill"
                    class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
                  />
                </div>

                <!--  links-->
                <div class="text-xs">
                  <h1 class="text-[#00000080]">
                    Virtual Assistant, Receptionist skill, etc.
                  </h1>
                </div>
              </form>
            </div>
          </div>

          <!--  -->
          <div class="w-[50%]">
            <!--  -->
            <div class="relative">
              <img
                src="../../assets/images/skillsrelation2.jpg"
                class="w-full h-[500px] object-cover"
                alt=""
              />

              <div class="flex flex-col">
                <div class="absolute top-30 left-20">
                  <button
                    class="text-xs border p-2 px-4 rounded-full bg-white hover:scale-105"
                  >
                    Project Management
                  </button>
                </div>

                <div class="absolute top-44 right-20">
                  <button
                    class="text-xs border p-2 px-4 rounded-full bg-white hover:scale-105"
                  >
                    Good communicator
                  </button>
                </div>

                <div class="absolute top-60 left-18">
                  <button
                    class="text-xs border p-2 px-4 rounded-full bg-white hover:scale-105"
                  >
                    Executive administrator
                  </button>
                </div>

                <div class="absolute bottom-5 right-8">
                  <button
                    class="text-xs border p-2 px-4 rounded-full bg-white hover:scale-105"
                  >
                    Team Leadership
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!--  -->
      <template v-else-if="currentStep === 5">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">Education</h1>

              <div class="py-6 space-y-4">
                <div
                  class="flex justify-between h-[247px] border p-2 border-dashed rounded items-center"
                >
                  <div
                    @click="openEducationModal"
                    class="flex justify-center text-center items-center w-full flex-col gap-2 pt-2"
                  >
                    <div
                      class="border border-gray-400 w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <img src="../../assets/svgs/plus.svg" alt="file icon" />
                    </div>

                    <button class="mb-4 text-black font-medium text-sm">
                      Add education
                    </button>
                  </div>
                </div>

                <div v-if="educations.length" class="space-y-4">
                  <div
                    v-for="(education, index) in educations"
                    :key="index"
                    class="flex justify-between border p-4 rounded"
                  >
                    <div class="w-full space-y-1">
                      <div class="flex justify-between">
                        <h3 class="font-semibold text-base">
                          {{ education.degree }}
                        </h3>

                        <div class="flex space-x-3">
                          <button class="cursor-pointer">
                            <img
                              src="../../assets/svgs/edit.svg"
                              alt="file icon"
                            />
                          </button>
                          <button
                            @click="removeEducation(index)"
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
                          {{ education.field }} - {{ education.school }}
                        </p>

                        <p class="text-sm">
                          {{ education.startDate }} -
                          {{ education.endDate }}
                        </p>
                      </div>
                      <textarea rows="8" class="w-full">{{
                        education.otherInfo
                      }}</textarea>
                    </div>
                  </div>
                </div>

                <!-- modal -->
                <div
                  v-if="isEducationModalOpen"
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
                          @click="closeEducationModal"
                          class="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <img
                            src="../../assets/svgs/cancel.svg"
                            class="w-6 h-6"
                            alt="file icon"
                          />
                        </button>
                      </div>

                      <h2 class="text-lg font-semibold mb-4">Add education</h2>

                      <form @submit.prevent="addEducation" class="space-y-4">
                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Degree</label
                          >

                          <input
                            v-model="newEducation.degree"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Bachelor of Science"
                          />
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Field</label
                          >

                          <input
                            v-model="newEducation.field"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder=" Biology"
                          />
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >School</label
                          >

                          <input
                            v-model="newEducation.school"
                            placeholder="leadcity"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div class="flex space-x-4">
                          <div class="flex-1">
                            <label class="block font-medium mb-1 text-sm"
                              >Start date</label
                            >

                            <input
                              v-model="newEducation.startDate"
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
                              v-model="newEducation.endDate"
                              type="month"
                              placeholder="MM-YYYY"
                              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Other information (Optional)</label
                          >

                          <textarea
                            v-model="newEducation.otherInfo"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                          ></textarea>
                        </div>

                        <div class="flex justify-between text-sm space-x-4">
                          <button
                            type="button"
                            @click="closeEducationModal"
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
              class="mx-auto w-full h-full py-4 flex flex-col justify-center items-center relative"
            >
              <img
                src="../../assets/images/education.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </template>

      <!--  -->
      <template v-else-if="currentStep === 6">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">Certifications</h1>

              <div class="py-6 space-y-4">
                <div
                  class="flex justify-between h-[247px] border p-2 border-dashed rounded items-center"
                >
                  <div
                    @click="openCertificationModal"
                    class="flex justify-center text-center items-center w-full flex-col gap-2 pt-2"
                  >
                    <div
                      class="border border-gray-400 w-10 h-10 rounded-full flex items-center justify-center"
                    >
                      <img src="../../assets/svgs/plus.svg" alt="file icon" />
                    </div>

                    <button class="mb-4 text-black font-medium text-sm">
                      Add Certifications
                    </button>
                  </div>
                </div>

                <div v-if="certifications.length" class="space-y-4">
                  <div
                    v-for="(certification, index) in certifications"
                    :key="index"
                    class="flex justify-between border p-4 rounded"
                  >
                    <div class="w-full space-y-1">
                      <div class="flex justify-between">
                        <h3 class="font-semibold text-base">
                          {{ certification.certification }}
                        </h3>

                        <div class="flex space-x-3">
                          <button class="cursor-pointer">
                            <img
                              src="../../assets/svgs/edit.svg"
                              alt="file icon"
                            />
                          </button>
                          <button
                            @click="removCertification(index)"
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
                          {{ certification.issuingOrganization }} -
                          {{ certification.credentialID }}
                        </p>

                        <p class="text-sm">
                          {{ certification.startDate }} -
                          {{ certification.endDate }}
                        </p>
                      </div>
                      <textarea rows="8" class="w-full">{{
                        certification.description
                      }}</textarea>
                    </div>
                  </div>
                </div>

                <!-- modal -->
                <div
                  v-if="isCertificationModalOpen"
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
                          @click="closeCertificationModal"
                          class="p-2 border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <img
                            src="../../assets/svgs/cancel.svg"
                            class="w-6 h-6"
                            alt="file icon"
                          />
                        </button>
                      </div>

                      <h2 class="text-lg font-semibold mb-4">
                        Add Certifications
                      </h2>

                      <form
                        @submit.prevent="addCertification"
                        class="space-y-4"
                      >
                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Certification / license name</label
                          >

                          <input
                            v-model="newCertification.certification"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="******************"
                          />
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Issuing organization</label
                          >

                          <input
                            v-model="newCertification.issuingOrganization"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder=" Apple"
                          />
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Credential ID</label
                          >

                          <input
                            v-model="newCertification.credentialID"
                            placeholder="udemy"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div class="flex space-x-4">
                          <div class="flex-1">
                            <label class="block font-medium mb-1 text-sm"
                              >Start date</label
                            >

                            <input
                              v-model="newCertification.startDate"
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
                              v-model="newCertification.endDate"
                              type="month"
                              placeholder="MM-YYYY"
                              class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label class="block font-medium mb-1 text-sm"
                            >Other information (Optional)</label
                          >

                          <textarea
                            placeholder="write here ...."
                            v-model="newCertification.description"
                            class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                          ></textarea>
                        </div>

                        <div class="flex justify-between text-sm space-x-4">
                          <button
                            type="button"
                            @click="closeCertificationModal"
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
              class="mx-auto w-full h-full py-4 flex flex-col justify-center items-center relative"
            >
              <img
                src="../../assets/images/awardpix.png"
                class="w-full h-full object-cover rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </template>

      <!--  -->
      <template v-else-if="currentStep === 7">
        <div class="flex justify-between w-full gap-6">
          <div class="w-[50%]">
            <div
              class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
            >
              <h1 class="text-3xl font-normal">
                Almost done! Give a summary about yourself
              </h1>

              <div class="py-6 space-y-4"></div>
            </div>
          </div>

          <!--  -->
          <div class="w-[50%]">
            <div
              class="bg-[#FAFAFA] py-4 flex flex-col justify-center items-center relative"
            >
              <div
                class="bg-white w-[80%] p-6 border border-gray-500 rounded space-y-4"
              >
                <h1 class="text-3xl font-medium text-black leading-[100%]">
                  Your bio
                </h1>

                <div class="gap-1 flex flex-col">
                  <div class="bg-[#0000001A] w-full h-2 rounded" />
                  <div class="bg-[#0000001A] w-full h-2 rounded" />
                  <div class="bg-[#0000001A] w-full h-2 rounded" />
                  <div class="bg-[#0000001A] w-[50%] h-2 rounded" />
                </div>

                <!--  -->
                <div class="gap-1 flex flex-col">
                  <div class="bg-[#0000001A] w-full h-2 rounded" />
                  <div class="bg-[#0000001A] w-full h-2 rounded" />
                  <div class="bg-[#0000001A] w-full h-2 rounded" />
                  <div class="bg-[#0000001A] w-[50%] h-2 rounded" />
                </div>
              </div>

              <div class="justify-end w-full -mt-14 pr-6 flex">
                <img
                  src="../../assets/images/rose.png"
                  class="w-[200px] h-[150px] object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
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
          class="w-[114px] py-2 bg-black text-white rounded"
        >
          {{ currentStep === totalSteps ? "Finish" : "Next" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
