import { parse, TYPE } from '@formatjs/icu-messageformat-parser';
import { IntlMessageFormat, type PrimitiveType } from 'intl-messageformat';

declare const messageId: unique symbol;

/** A catalog key exported by the application's generated message IDs file. */
type MessageId<Key extends string = string> = Key & { readonly [messageId]: true };

type Messages<Key extends string = string> = Readonly<Record<Key, string>>;

type MessageValues = Record<string, PrimitiveType>;

type Translate<Key extends string = string> = (
  id: MessageId<Key>,
  values?: MessageValues,
) => string;

interface Translator<Key extends string = string> {
  readonly t: Translate<Key>;
}

interface TranslatorOptions<Key extends string> {
  locale: string;
  defaultLocale: string;
  defaultMessages: Messages<Key>;
  catalogs?: Readonly<Record<string, Partial<Messages<NoInfer<Key>>>>>;
}

function catalogLocale(locale: string) {
  return new Intl.Locale(locale).baseName;
}

/** Creates an independent translator for the locale and catalogs supplied by the app. */
function createTranslator<Key extends string>({
  locale,
  defaultLocale,
  defaultMessages,
  catalogs = {},
}: TranslatorOptions<Key>): Translator<Key> {
  const fallbackLocale = catalogLocale(defaultLocale);

  const messagesByLocale = new Map<string, Partial<Messages<Key>>>();

  for (const [tag, messages] of Object.entries(catalogs)) {
    const normalized = catalogLocale(tag);

    if (normalized === fallbackLocale || messagesByLocale.has(normalized)) {
      throw new Error(`Duplicate catalog locale: ${normalized}`);
    }

    messagesByLocale.set(normalized, messages);
  }

  messagesByLocale.set(fallbackLocale, defaultMessages);

  const subtags = catalogLocale(locale).split('-');
  const fallbackChain = new Set<string>();

  while (subtags.length > 0) {
    fallbackChain.add(subtags.join('-'));
    subtags.pop();
  }

  fallbackChain.add(fallbackLocale);

  const availableCatalogs = [...fallbackChain].flatMap((tag) => {
    const messages = messagesByLocale.get(tag);

    return messages ? [[tag, messages] as const] : [];
  });

  const resolved = new Map<Key, string | IntlMessageFormat>();

  const t: Translate<Key> = (id, values) => {
    let formatter = resolved.get(id);

    if (formatter === undefined) {
      if (!Object.hasOwn(defaultMessages, id)) {
        throw new Error(`Unknown message ID: ${id}`);
      }

      for (const [tag, messages] of availableCatalogs) {
        const message = Object.hasOwn(messages, id) ? messages[id] : undefined;

        if (message === undefined) {
          continue;
        }

        const elements = parse(message, { ignoreTag: true });

        formatter =
          elements.length === 0
            ? ''
            : elements.length === 1 && elements[0].type === TYPE.literal
              ? elements[0].value
              : new IntlMessageFormat(elements, tag);

        resolved.set(id, formatter);
        break;
      }
    }

    if (formatter === undefined) {
      throw new Error(`No translation found for message ID: ${id}`);
    }

    return typeof formatter === 'string' ? formatter : String(formatter.format(values));
  };

  return { t };
}

export { createTranslator };

export type { MessageId, Messages, MessageValues, Translate, Translator, TranslatorOptions };
