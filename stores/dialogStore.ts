import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { DialogName } from '~/constants/dialogs';

type DialogName = 'apply' | 'news' | 'mobileMenu' | 'winningTeam' | 'photo';

// 提取所有可能的對話框名稱為一個聯集型別，提升可讀性和未來擴展性
type DialogName = 'apply' | 'news' | 'mobileMenu' | 'winningTeam' | 'photo';

export const useDialogStore = defineStore('dialogStore', () => {
  // 使用新的 DialogName 型別，並允許為 null
  const activeDialog = ref<DialogName | null>(null);

  // 控制 body scroll
  watch(activeDialog, val => {
    document.body.style.overflow = val ? 'hidden' : '';
  });

  // openDialog 的參數型別也使用 DialogName 或 null，保持與原始邏輯一致
  const openDialog = (name: DialogName | null) => {
    activeDialog.value = name;
  };

  const closeDialog = () => {
    activeDialog.value = null;
  };

  return {
    activeDialog,
    openDialog,
    closeDialog,
  };
});