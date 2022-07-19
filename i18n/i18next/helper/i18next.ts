import type { i18n } from 'i18next';
import type { TranslationBundle } from './types';

export function addTranslationBundles(bundles: TranslationBundle[], i18next: i18n) {
  //register translations
  bundles.forEach(t => {
    i18next.addResourceBundle(t.language, t.namespace, t.translations, true)
  })
}
