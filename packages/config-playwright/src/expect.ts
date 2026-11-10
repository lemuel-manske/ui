import { expect as baseExpect } from '@playwright/experimental-ct-react';

import { noAccessibilityViolations } from './matchers/noAccessibilityViolations.js';

const expect = baseExpect.extend({ noAccessibilityViolations });

export { expect };
