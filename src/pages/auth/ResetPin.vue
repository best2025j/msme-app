<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// Define the type for the pin array
const pin = ref<string[]>(["", "", "", ""]);
const inputs = ref<(HTMLInputElement | null)[]>([]); // Type for the inputs array

// Function to focus the next input
const focusNext = (index: number): void => {
  if (pin.value[index].length === 1 && index < 5) {
    inputs.value[index + 1]?.focus(); // Use optional chaining to avoid errors
  }
};

// Function to focus the previous input
const focusPrev = (index: number): void => {
  if (pin.value[index] === "" && index > 0) {
    inputs.value[index - 1]?.focus(); // Use optional chaining to avoid errors
  }
};

// Function to verify the PIN
const verifyPin = (): void => {
  const fullPin = pin.value.join("");
  console.log("Verifying PIN:", fullPin);
  // Add verification logic here
};

// Focus the first input on component mount
onMounted(() => {
  inputs.value[0]?.focus(); // Use optional chaining to avoid errors
});

const goToEmail = () => {
  router.push("/auth/email-verification");
};
</script>

<template>
  <div class="p-13 bg-white w-[80%] h-[700px] mx-auto flex gap-6">
    <div class="w-[50%]">
      <div
        class="max-w-[470px] flex justify-center items-start flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-3xl font-normal">Password reset code</h1>
        <p class="font-normal text-sm">
          Please enter the 4-digit code that was sent to Johndoe@doe.com
        </p>

        <form @submit.prevent="verifyPin" class="space-y-6 py-6 w-full">
          <!-- PIN Inputs -->
          <div class="flex justify-between gap-3">
            <input
              v-for="index in pin.length"
              :key="index"
              type="text"
              maxlength="1"
              class="w-20 h-14 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="pin[index - 1]"
              @input="focusNext(index - 1)"
              placeholder="*"
              @keydown.backspace="focusPrev(index - 1)"
              ref="inputs"
            />
          </div>

          <!-- Submit Button -->
          <div class="w-full flex">
            <button
              type="submit"
              @click="goToEmail"
              class="bg-black text-white text-sm font-medium h-10 w-full rounded hover:bg-gray-900 transition"
            >
              Verify Pin
            </button>
          </div>

          <!--  links-->
          <div class="text-sm">
            <h1 class="text-[#00000080] text-center">
              Didn’t get the code?
              <a href=""><b class="text-black">Send a new code </b></a>
            </h1>
          </div>
        </form>
      </div>
    </div>

    <!--  -->
    <div class="w-[50%]">
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
              alt="Briefcase icon"
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
/* Add your styles here */
</style>
