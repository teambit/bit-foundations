import i18next from 'i18next';
import { addTranslationBundles } from './i18next';
import type { TranslationBundle } from './types';

const myNamespace = 'translated-text'

const en = {
  language: 'en',
  namespace: myNamespace,
  translations: {
      'yearsOld': "{{name}} is {{age}} years old now!"
  }
}

const de = {
  language: 'de',
  namespace: myNamespace,
  translations: {
      'yearsOld': "German: {{name}} is {{age}} years old now!"
  }
}

it('should add translation resources', () => {
  i18next.init({resources:{}});
  addTranslationBundles([en, de], i18next);
  
  const enResource = i18next.getResourceBundle('en', myNamespace) as TranslationBundle;
  expect(enResource).toEqual(en.translations);

  const deResource = i18next.getResourceBundle('de', myNamespace) as TranslationBundle;
  expect(deResource).toEqual(de.translations);
});

