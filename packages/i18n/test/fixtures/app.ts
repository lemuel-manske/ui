import { createTranslator, type MessageId } from '@lemuel-manske/i18n';
import { useTranslation } from '@lemuel-manske/i18n/react';

import en from './en.json';
import { MY_APP_LOADING as LOADING } from './message-ids';

const translator = createTranslator({ locale: 'en', defaultLocale: 'en', defaultMessages: en });
const { t } = translator;

t(LOADING);

// @ts-expect-error Raw catalog keys are not accepted.
t('my-app.loading');

translator.t('my-app.loading' as MessageId<'my-app.loading'>);

const locallyDeclared = LOADING;

t(locallyDeclared);

function useLoadingLabel() {
  const { t: translate } = useTranslation();

  translate(LOADING);

  // @ts-expect-error The React entry point also requires a MessageId.
  return translate('my-app.loading');
}

function tWithoutI18n(value: string) {
  return value;
}

tWithoutI18n('my-app.loading');

export { useLoadingLabel };
