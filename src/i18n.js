// @flow

import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import Lang, { defLang } from './consts/language';

const backendOptions = {
  loadPath: '/locales/{{lng}}/{{ns}}.json',
};

const options: {
  lng: string,
  fallbackLng: Array<string>,
  whitelist: Array<string>,
  backend: Object,
  ns: Array<string>,
  defaultNS: string,
} = {
  lng: defLang,
  fallbackLng: Object.keys(Lang).map(k => Lang[k]),
  whitelist: [Lang.zh_CN],
  backend: backendOptions,
  ns: ['common'],
  defaultNS: 'common',
};


const i18n = i18next
  .use(XHR)
  .init(options, () => {
    console.log('i18n initialized'); // eslint-disable-line no-console
  });

export default i18n;
