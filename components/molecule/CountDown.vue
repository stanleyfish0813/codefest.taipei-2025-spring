<script setup lang="ts">
const props = defineProps<{
  targetDate: Date;
}>();

/**
 * 定義剩餘時間的型別
 */
interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

/**
 * 倒數目標時間戳記
 * Ex：2025-06-01 00:00:00 的毫秒數
 */
const targetTimestamp = props.targetDate.getTime();

/** 時間單位換算（毫秒） */
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

/** 每秒更新倒數時間 */
const interval = ref<ReturnType<typeof setInterval> | null>(null);

/**
 * 計算剩餘時間
 */
const getTimeLeft = (): TimeLeft => {
  const now = new Date().getTime();
  const diff = targetTimestamp - now;

  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

  return {
    days: formatNumber(diff / MS_PER_DAY),
    hours: formatNumber((diff / MS_PER_HOUR) % 24),
    minutes: formatNumber((diff / MS_PER_MINUTE) % 60),
    seconds: formatNumber((diff / MS_PER_SECOND) % 60),
  };
};

// 格式化數字（確保雙位數，例如 "5" -> "05"）
const formatNumber = (num: number) => {
  return String(Math.floor(num)).padStart(2, '0');
};

/**
 * 儲存計算後的剩餘時間
 * 立即計算一次，確保組件掛載時就有初始值
 */
const timeLeft = ref<TimeLeft>(getTimeLeft());

onMounted(() => {
  interval.value = setInterval(() => {
    timeLeft.value = getTimeLeft();
  }, 1000);
});

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});
</script>

<template>
  <p>
    <!-- 天數 -->
    <span class="mx-1">
      <span v-for="(char, index) in timeLeft.days" :key="index" class="countdown-box">
        {{ char }}
      </span>
    </span>
    <span>日</span>

    <!-- 小時 -->
    <span class="mx-1">
      <span v-for="(char, index) in timeLeft.hours" :key="index" class="countdown-box">
        {{ char }}
      </span>
    </span>
    <span>時</span>

    <!-- 分鐘 -->
    <span class="mx-1">
      <span v-for="(char, index) in timeLeft.minutes" :key="index" class="countdown-box">
        {{ char }}
      </span>
    </span>
    <span>分</span>

    <!-- 秒數 -->
    <span class="mx-1">
      <span v-for="(char, index) in timeLeft.seconds" :key="index" class="countdown-box">
        {{ char }}
      </span>
    </span>
    <span>秒</span>
  </p>
</template>
<style scoped lang="postcss">
/* 倒數計時數字的白色方塊 */
.countdown-box {
  @apply bg-white text-primary-500 font-bold px-2 py-1 text-xl border border-black;
}
</style>
