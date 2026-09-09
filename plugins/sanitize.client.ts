import { defineNuxtPlugin } from '#app';
import DOMPurify from 'dompurify';

export default defineNuxtPlugin(() => {
  // 將 DOMPurify 的配置選項提取為一個常數，提高程式碼可讀性與未來修改的便利性。
  const purifyOptions = { ADD_ATTR: ['target'] };

  return {
    provide: {
      sanitize: (dirty: string) => DOMPurify.sanitize(dirty, purifyOptions),
    },
  };
});