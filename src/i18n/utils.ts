
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedTools(lang: keyof typeof ui) {
  return (tools: any[]) => tools.map(tool => ({
    ...tool,
    label: tool.label[lang] || tool.label[defaultLang],
    desc: tool.desc[lang] || tool.desc[defaultLang],
  }));
}
