<script setup lang="ts">
import { ROUTE_PATHS } from '~/constants/routes';

const { tm } = useI18n();
const route = useRoute();

const tabListConfig = [
  {
    id: 'rules',
    name: '競賽規則',
    path: `${ROUTE_PATHS.RULES}`,
    i18nKey: 'rules',
  },
  {
    id: 'schedule',
    name: '重要時程',
    path: `${ROUTE_PATHS.RULES}${ROUTE_PATHS.SCHEDULE}`,
    i18nKey: 'schedule',
  },
  {
    id: 'judge',
    name: '本屆評審',
    path: `${ROUTE_PATHS.RULES}/judge`,
    i18nKey: 'rules.judges',
  },
  {
    id: 'faq',
    name: 'FAQ',
    path: `${ROUTE_PATHS.RULES}/faq`,
    i18nKey: null,
  },
];

const tabList = tabListConfig.map(tab => ({
  ...tab,
  available: tab.i18nKey ? computed(() => tm(tab.i18nKey).available) : computed(() => true),
}));

const activeTab = computed(() => tabList.find(tab => tab.path === route.path) || tabList[0]);

const tabItems = ref<HTMLElement[]>([]);

const SCROLL_THRESHOLD_INDEX = 2;

const scrollToTab = (index: number) => {
  const scrollContainer = document.querySelector('.scroll-container') as HTMLElement | null;

  if (scrollContainer) {
    const isEndIndex = index >= SCROLL_THRESHOLD_INDEX;
    const scrollLeft = isEndIndex 
      ? scrollContainer.scrollWidth - scrollContainer.clientWidth 
      : 0;

    scrollContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
};

onMounted(() => {
  const currentTabIdx = tabList.findIndex(tab => tab.id === activeTab.value.id);
  scrollToTab(currentTabIdx);
});
</script>

<template>
  <div>
    <section class="2xl:px-0 p-5 pt-10">
      <div class="border border-white relative">
        <div class="m-1 border border-white">
          <p class="section-title font-fusion-pixel">
            {{ activeTab.name }}
          </p>
          <div class="mt-8 lg:flex block">
            <div class="lg:block hidden p-4 border-t border-r border-white">
              <div class="flex">
                <div class="relative flex flex-col">
                  <template v-for="(tab, index) in tabList" :key="tab.id">
                    <NuxtLink
                      v-if="tab.available.value"
                      v-kb-focus="{
                        id: `rules-tab-1-${(index + 2) * 10}`,
                        x: 1,
                        y: (index + 2) * 10,
                      }"
                      :to="tab.path"
                      class="tab-item relative min-w-[220px] w-full p-6 border border-white text-xl text-center cursor-pointer font-fusion-pixel mb-4"
                      :class="
                        activeTab?.id === tab.id
                          ? 'bg-primary-50 text-primary-500 border-0 shadow-[4px_4px_0px_black]'
                          : 'text-white'
                      "
                    >
                      {{ tab.name }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
            </div>
            <div
              class="scroll-container lg:hidden border-b border-white py-4 px-12 overflow-x-auto"
            >
              <nav class="flex space-x-3" aria-label="Tabs">
                <template v-for="(tab, index) in tabList" :key="tab.id">
                  <NuxtLink
                    v-if="tab.available.value"
                    ref="tabItems"
                    :to="tab.path"
                    class="mobile-tab-item"
                    :class="[
                      activeTab?.id === tab.id ? 'border-b-2 border-white' : 'border-none',
                      'whitespace-nowrap text-white font-fusion-pixel px-4 py-2 text-lg',
                    ]"
                    :aria-current="activeTab?.id === tab.id ? 'page' : undefined"
                    @click="scrollToTab(index)"
                  >
                    {{ tab.name }}
                  </NuxtLink>
                </template>
                <div class="w-2 h-2 shrink-0"></div>
              </nav>
            </div>
            <div class="flex-1 border-t border-white">
              <div class="flex-1 text-white">
                <div class="w-full overflow-auto">
                  <NuxtPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>