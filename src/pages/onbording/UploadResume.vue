<script setup lang="ts">
import { ref } from "vue";

const file = ref<File | null>(null);
const dragActive = ref(false);
const uploadProgress = ref(0); // percentage 0-100
const uploadSpeedMBps = ref(0); // MB per second
const uploadStartTime = ref<number | null>(null);
const uploadInterval = ref<number | null>(null);
const uploadDurationSec = ref(0);

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    startUpload(target.files[0]);
  }
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  dragActive.value = false;
  if (event.dataTransfer?.files.length) {
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile.type === "application/pdf" ||
      droppedFile.type === "application/msword" ||
      droppedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      droppedFile.name.endsWith(".doc") ||
      droppedFile.name.endsWith(".docx")
    ) {
      startUpload(droppedFile);
    } else {
      alert("Only .pdf or .doc files are allowed");
    }
  }
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  dragActive.value = true;
};

const onDragLeave = (event: DragEvent) => {
  event.preventDefault();
  dragActive.value = false;
};

const cancelUpload = () => {
  if (uploadInterval.value) {
    clearInterval(uploadInterval.value);
  }
  resetUpload();
};

const finishUpload = () => {
  if (uploadInterval.value) {
    clearInterval(uploadInterval.value);
  }
  //   alert(`Upload of "${file.value?.name}" completed`);
  // You can add post-upload logic here
  resetUpload();
};

const resetUpload = () => {
  file.value = null;
  uploadProgress.value = 0;
  uploadSpeedMBps.value = 0;
  uploadStartTime.value = null;
  uploadInterval.value = null;
  uploadDurationSec.value = 0;
};

const startUpload = (selectedFile: File) => {
  file.value = selectedFile;
  uploadProgress.value = 0;
  uploadStartTime.value = Date.now();
  uploadDurationSec.value = 0;

  // Simulated upload speed: 0.5 to 1.5 MB/s randomly
  uploadSpeedMBps.value = 0.5 + Math.random();

  if (uploadInterval.value) clearInterval(uploadInterval.value);

  // Update progress every second
  uploadInterval.value = window.setInterval(() => {
    uploadDurationSec.value++;
    // Calculate progress percentage
    const uploadedMB = uploadSpeedMBps.value * uploadDurationSec.value;
    const totalMB = file.value ? file.value.size / (1024 * 1024) : 1;
    uploadProgress.value = Math.min(100, (uploadedMB / totalMB) * 100);

    if (uploadProgress.value >= 100) {
      // Upload finished
      finishUpload();
    }
  }, 3000);
};

// Format time left string based on progress and speed
const minutesLeft = () => {
  if (!file.value) return 0;
  const totalMB = file.value.size / (1024 * 1024);
  const uploadedMB = (uploadProgress.value / 100) * totalMB;
  const remainingMB = totalMB - uploadedMB;
  const speed = uploadSpeedMBps.value;
  if (speed === 0) return 0;
  const secondsLeft = remainingMB / speed;
  return Math.ceil(secondsLeft / 60);
};

const formatFileSize = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  if (mb > 1) {
    return mb.toFixed(2) + " MB";
  }
  const kb = bytes / 1024;
  return kb.toFixed(2) + " KB";
};
</script>

<template>
  <div
    class="max-w-2xl h-full mx-auto p-6 bg-white rounded-lg shadow-md text-gray-900 font-sans"
  >
    <h2 class="text-xl font-semibold mb-4">Upload your resume</h2>
    <div
      class="border-2 border-dashed justify-center mx-auto flex flex-col items-center rounded-lg p-8 text-center cursor-pointer transition-colors"
      :class="
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      "
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <template v-if="!file" class="">
        <div
          class="bg-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <img src="../../assets/svgs/fileupload.svg" alt="file icon" />
        </div>
        <p class="mb-4 text-gray-700 max-w-[190px]">
          Drag and drop document (<span class="font-bold">.pdf</span> or
          <span class="font-bold">.doc</span>) to upload
        </p>
        <label
          for="fileUpload"
          class="inline-block bg-[#ECECEC] text-[#00000080] font-medium px-4 py-2 rounded cursor-pointer transition"
        >
           Select file
        </label>
        <input
          id="fileUpload"
          type="file"
          accept=".pdf,.doc,.docx"
          class="hidden"
          @change="onFileChange"
        />
      </template>

      <template v-else>
        <div class="text-left space-y-2">
          <div class="text-lg font-medium break-words">{{ file.name }}</div>
          <div class="text-sm text-gray-600">
            {{ formatFileSize(file.size) }}
          </div>
          <div class="text-sm text-gray-600">
            {{ minutesLeft() }} minutes left
          </div>
          <div class="flex space-x-4 mt-4">
            <button
              @click="cancelUpload"
              class="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              @click="finishUpload"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Finish
            </button>
          </div>
          <div class="w-full bg-gray-200 rounded h-2 mt-3 overflow-hidden">
            <div
              class="bg-blue-600 h-2 transition-all duration-500"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* You can add extra styling if needed */
</style>
