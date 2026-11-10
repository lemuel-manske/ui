import { expect, test } from '@lemuel-manske/config-playwright';

import { LegendHook } from './useLegend.test-fixture';

test('useLegend names its fieldset', async ({ render }) => {
  const fieldset = await render(<LegendHook />);

  await expect(fieldset).toHaveAccessibleName('Contact');
});
