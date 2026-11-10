import { expect, test } from '@lemuel-manske/config-playwright';

import { FormHook } from './useForm.test-fixture';

test('useForm preserves the accessible form name', async ({ render }) => {
  const form = await render(<FormHook aria-label="Capture">Content</FormHook>);

  await expect(form).toHaveAccessibleName('Capture');
});
