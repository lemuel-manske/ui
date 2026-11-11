'use client';

import { createContext, useContext, type ReactNode } from 'react';

import type { Translator } from './index.js';

const TranslatorContext = createContext<Translator | null>(null);

interface I18nProviderProps<Key extends string = string> {
  translator: Translator<Key>;
  children: ReactNode;
}

function I18nProvider<Key extends string>({ translator, children }: I18nProviderProps<Key>) {
  return <TranslatorContext value={translator as Translator}>{children}</TranslatorContext>;
}

function useTranslation() {
  const translator = useContext(TranslatorContext);

  if (!translator) {
    throw new Error('useTranslation must be used inside an I18nProvider.');
  }

  return translator;
}

export { I18nProvider, useTranslation };

export type { I18nProviderProps };
