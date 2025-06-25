<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_URL =
  "https://careerbox-dev-api-89uwx.ondigitalocean.app/auth/recruiter-signup";

const fullName = ref("");
const email = ref("");
const password = ref("");
const companyName = ref("");
const roleInCompany = ref("");

const loading = ref(false);
const error = ref("");
const success = ref(false);

const submitSignup = async () => {
  loading.value = true;
  error.value = "";
  success.value = false;

  try {
    const response = await axios.post(API_URL, {
      name: fullName.value,
      email: email.value,
      password: password.value,
      companyName: companyName.value,
      roleInCompany: roleInCompany.value,
    });

    success.value = true;
    console.log("✅ Signup Success:", response.data);

    // ✅ Clear form fields
    fullName.value = "";
    email.value = "";
    password.value = "";
    companyName.value = "";
    roleInCompany.value = "";

    // Redirect to verify-mail
    router.push({ path: "/auth/verify-email", query: { email: email.value } });

    //
  } catch (err: any) {
    error.value = err.response?.data?.message || "Signup failed.";
    console.error("❌ Signup Error:", error.value);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="md:p-13 p-6 bg-white w-full md:w-[80%] mx-auto flex gap-6">
    <div class="md:w-1/2 w-full">
      <div
        class="md:max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-base md:text-3xl font-normal">
          It’s nice to have you back!
        </h1>
        <p class="font-normal text-sm">
          A place to connect with the right opportunities to advance your
          career.
        </p>

        <form @submit.prevent="submitSignup">
          <div class="space-y-4 py-4 text-sm md:text-base">
            <div class="flex flex-col space-y-2">
              <label for="">Full name</label>
              <input
                v-model="fullName"
                type="text"
                autocomplete="off"
                placeholder="Owojori Habeebah"
                class="bg-[#FAFAFA] h-10 capitalize rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="">Email</label>
              <input
                v-model="email"
                type="text"
                placeholder="Johndoe@doe.com@gmail.com"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="***************"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="">Company Name</label>
              <input
                v-model="companyName"
                type="text"
                placeholder="Johndoe@doe.com@gmail.com"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="role">Role in Company</label>
              <select
                id="role"
                v-model="roleInCompany"
                class="bg-[#FAFAFA] h-10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4"
              >
                <option disabled value="">Select your role</option>
                <option value="Recruiter">Recruiter</option>
                <option value="HR Manager">Talent</option>
              </select>
            </div>

            <div v-if="error" class="text-red-500">{{ error }}</div>
            <div v-if="success" class="text-green-500">Signup successful!</div>

            <div class="py-4">
              <button
                type="submit"
                class="bg-[#000000] text-sm cursor-pointer font-medium text-white rounded h-10 w-full"
              >
                Continue
              </button>
            </div>
          </div>

          <!--  links-->
          <div class="text-sm">
            <h1 class="text-[#00000080] text-center">
              Already have an account
              <a href="/auth/login"><b class="text-black">Sign in here</b></a>
            </h1>
          </div>
        </form>
      </div>
    </div>

    <!--  -->
    <div class="w-1/2 md:block hidden">
      <div class="relative">
        <img
          src="../../../assets/images/mansmile.png"
          class="w-full"
          alt="not shown"
        />
        <!--  -->
        <button
          class="absolute hover:scale-105 cursor-pointer top-4 transform translate-x-6 bg-white w-14 h-14 rounded-full flex justify-center p-4 right-14"
        >
          <img src="../../../assets/svgs/plus.svg" />
        </button>
        <!--  -->
        <div
          class="flex space-x-4 absolute bottom-14 left-6 z-10 bg-white h-[85px] px-10 items-center hover:scale-105 cursor-pointer shadow p-4 rounded"
        >
          <span
            class="bg-black w-[1.5px] h-10 rounded-full flex items-center justify-center"
          >
          </span>
          <div>
            <h1 class="text-md font-semibold">Santiago Caleb</h1>
            <p class="text-sm text-[#000000B2]">Creative designer, Instagram</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
