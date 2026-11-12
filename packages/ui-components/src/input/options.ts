import type { Size } from '@lemuel-manske/design-tokens';

import type { Subset } from '@lemuel-manske/utils';

type InputSize = Subset<Size, 'small' | 'medium' | 'large'>;

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
