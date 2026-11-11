# Internationalization

`@lemuel-manske/i18n` translates app-owned messages in Node.js and the browser.
Install it in the app that owns the catalogs. Design system components receive the
translated text through their existing props.

## Installation

Configure the GitHub Packages registry in your app's `.npmrc` and authenticate
with GitHub Packages.

```ini
@lemuel-manske:registry=https://npm.pkg.github.com
```

```sh
npm install @lemuel-manske/i18n
```

## Catalogs and generated constants

Use UTF-8 JSON objects with flat message IDs in files named for their locale, such as
`locales/en.json` and `locales/pt-BR.json`. Each ID starts with a lowercase letter
and uses lowercase letters, digits, underscores, hyphens, and dots. Values are
plain text or ICU MessageFormat strings.

Create `locales/en.json` with the default messages.

```json
{
  "my-app.loading": "Loading the archive…",
  "my-app.capture.count": "{count, plural, one {# item archived} other {# items archived}}"
}
```

Create `locales/pt-BR.json` with the Portuguese translations.

```json
{
  "my-app.loading": "Carregando o acervo…",
  "my-app.capture.count": "{count, plural, one {# item arquivado} other {# itens arquivados}}"
}
```

Generate the constants and commit the resulting TypeScript file. Pass the other
catalogs to validate their ICU syntax, keys, and placeholders.

```sh
mkdir -p src/i18n
npx i18n-message-ids locales/en.json src/i18n/message-ids.ts locales/pt-BR.json
npx i18n-message-ids --check locales/en.json src/i18n/message-ids.ts locales/pt-BR.json
```

Run the second command in CI to detect stale constants. Exclude the generated
file from formatting tools that would change its output.

## Translate messages

Enable `resolveJsonModule` in TypeScript to import the catalogs. Create the
translator in `src/translator.ts`.

```ts
import { createTranslator } from '@lemuel-manske/i18n';

import en from '../locales/en.json';
import ptBR from '../locales/pt-BR.json';
import { MY_APP_CAPTURE_COUNT, MY_APP_LOADING } from './i18n/message-ids';

export const translator = createTranslator({
  locale: 'pt-BR',
  defaultLocale: 'en',
  defaultMessages: en,
  catalogs: { 'pt-BR': ptBR },
});

const { t } = translator;

t(MY_APP_LOADING); // Carregando o acervo…
t(MY_APP_CAPTURE_COUNT, { count: 3 }); // 3 itens arquivados
```

The translator checks the requested locale, its parents, and then the default
catalog for each message. A fallback message uses the plural and formatting rules
of the catalog that provided it. A key absent from the default catalog throws an
error. Pass the locale and loaded catalogs explicitly and create a new translator
when they change. On the server, create one for each request's locale and catalogs.

## Use with React

```tsx
import { Spinner } from '@lemuel-manske/components';
import { I18nProvider, useTranslation } from '@lemuel-manske/i18n/react';

import { MY_APP_LOADING } from './i18n/message-ids';
import { translator } from './translator';

function Loading() {
  const { t } = useTranslation();

  return <Spinner label={t(MY_APP_LOADING)} />;
}

export function App() {
  return (
    <I18nProvider translator={translator}>
      <Loading />
    </I18nProvider>
  );
}
```

The app decides how to load catalogs, store the selected locale, and set the
document's language and direction. React apps can load only the selected locale,
its relevant parents, and the default catalog before creating a translator.

## Enforce constant imports with ESLint

TypeScript requires a generated `MessageId` for `t()`. Enable the following rule
in your typed ESLint config to require a direct named import from the generated
file. Renaming a constant at import is supported. The file path is relative to
ESLint's working directory.

```js
import i18n from '@lemuel-manske/i18n/eslint';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true },
    },
    plugins: { i18n },
    rules: {
      'i18n/generated-message-id': ['error', { messageIdsFile: './src/i18n/message-ids.ts' }],
    },
  },
];
```
