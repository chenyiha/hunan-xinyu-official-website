import { createI18n } from 'vue-i18n';
import zh from './zh-CN';
import en from './en-US';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
});

export default i18n;
