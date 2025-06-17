<script setup lang="ts"></script>

<template>
  <div class="p-13 bg-white w-[80%] h-[900px] mx-auto flex gap-6">
    <div class="w-[60%]">
      <div
        class="max-w-[470px] flex justify-center flex-col mx-auto h-full space-y-3"
      >
        <h1 class="text-3xl font-normal">Password reset code</h1>
        <p class="font-normal text-sm">
          Please enter the 4-digit code that was sent to Johndoe@doe.com
        </p>

        <form @submit.prevent="" class="space-y-6 py-6">
          <div class="flex flex-col space-y-2">
            <label for="">Email</label>
            <input
              type="text"
              placeholder="Johndoe@doe.com@gmail.com"
              class="bg-[#FAFAFA] h-10 rounded placeholder:text-sm pl-4 placeholder:text-[#0000004D]/30"
            />
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              class="bg-black text-white text-sm font-medium h-10 w-full rounded hover:bg-gray-900 transition"
            >
              Verify email
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
    <div class="w-[40%]">
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
