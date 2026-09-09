<script setup lang="ts">
import { computed, defineProps, onMounted, onUnmounted, ref, withDefaults } from 'vue';

const props = withDefaults(
  defineProps<{ 
    direction?: 'left' | 'right'; 
  }>(),
  {
    direction: 'left',
  }
);

// 使用布林值明確表達狀態切換，true 代表第二張圖
const isSecondImage = ref(false);

const toggleImage = () => {
  isSecondImage.value = !isSecondImage.value;
};

let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  intervalId = setInterval(toggleImage, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const desktopImageSrc = computed(() => 
  isSecondImage.value ? 'images/section-decoration-2.svg' : 'images/section-decoration.svg'
);

const mobileImageSrc = computed(() => 
  isSecondImage.value ? 'images/section-decoration-mobile-2.svg' : 'images/section-decoration-mobile.svg'
);
</script>

<template>
  <div
    class="p-4 overflow-hidden flex"
    :class="props.direction === 'right' ? 'justify-end' : 'justify-start'"
  >
    <img
      :src="desktopImageSrc"
      class="lg:block hidden w-[750px]"
      :class="props.direction === 'right' ? 'transform scale-x-[-1]' : ''"
      alt=""
    />
    <img
      :src="mobileImageSrc"
      class="lg:hidden block"
      :class="props.direction === 'right' ? 'transform scale-x-[-1]' : ''"
      alt=""
    />
  </div>
</template>