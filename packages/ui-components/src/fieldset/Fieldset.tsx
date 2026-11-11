import type { FieldsetProps, LegendProps } from './types';

import { useFieldset, useLegend } from './useFieldset';

/** Caption that supplies the accessible name of a Fieldset. */
function Legend(props: LegendProps) {
  const legend = useLegend(props);

  return <legend {...legend} />;
}

/** Groups related native form controls under a Legend. */
function Fieldset(props: FieldsetProps) {
  const fieldset = useFieldset(props);

  return <fieldset {...fieldset} />;
}

Fieldset.Legend = Legend;

export { Fieldset, Legend };
