import { expect as baseExpect } from '@playwright/experimental-ct-react';

import { noAccessibilityViolations } from './matchers/noAccessibilityViolations';

const expect = baseExpect.extend({ noAccessibilityViolations });

export { expect };
