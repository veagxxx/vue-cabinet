import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ElementLocale from 'element-ui/lib/locale';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zh from './zh';
import en from './en';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: sessionStorage.getItem('language') || 'zh',
  messages: {
    'zh': {
      ...zh,   // 使用扩展运算符，解析出所有对象
      ...zhLocale  // 使用扩展运算符，解析出所有对象
    },
    'en': {
      ...en,  // 使用扩展运算符，解析出所有对象
      ...enLocale  // 使用扩展运算符，解析出所有对象
    }
  }
});

ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;