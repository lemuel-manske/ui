import type { Size } from '@lemuel-manske/design-tokens';

type InputSize = Size.SMALL | Size.MEDIUM | Size.LARGE;

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'url'
  | 'search'
  | 'tel'
  | 'number'
  | 'date'
  | 'time';

export type { InputSize, InputType };
