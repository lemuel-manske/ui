import {
  Button,
  Heading,
  Link,
  Navigation,
  useButton,
  useHeading,
  useText,
  useLegend,
} from './index';

type PublicLibrary = typeof import('./index');

type VisualOverride = 'className' | 'style' | 'sx' | 'css' | 'styles' | 'slotProps';

type PublicInputs = {
  [Name in keyof PublicLibrary as PublicLibrary[Name] extends (...args: never[]) => unknown
    ? Name
    : never]: PublicLibrary[Name] extends (...args: infer Args) => unknown ? Args[0] : never;
};

type ForbiddenKeys<Props> = Props extends unknown ? Extract<VisualOverride, keyof Props> : never;

type AssertAll<Checks extends Record<keyof PublicInputs, true>> = Checks;

/** Every exported component and hook must keep its input free of generic visual overrides. */
export type PublicVisualContract = AssertAll<{
  [Name in keyof PublicInputs]: ForbiddenKeys<PublicInputs[Name]> extends never ? true : false;
}>;

function useRejectedVisualOverrides() {
  // @ts-expect-error Component styling is configured through its theme and semantic props.
  const button = <Button className="brand">Continue</Button>;

  // @ts-expect-error Native prop inheritance must not reintroduce inline overrides.
  const navigation = <Navigation style={{ display: 'none' }} />;

  // @ts-expect-error Hooks accept the same closed styling contract as components.
  useButton({ children: 'Continue', className: 'brand' });

  // @ts-expect-error Hooks do not provide an alternative inline styling API.
  useHeading({ children: 'Title', style: { fontSize: 24 } });

  // @ts-expect-error Polymorphic heading semantics remain limited to its level prop.
  const heading = <Heading as="div">Title</Heading>;

  const link = (
    // @ts-expect-error A link cannot change its native element to bypass the prop contract.
    <Link href="/" as="button">
      Home
    </Link>
  );

  // @ts-expect-error Heading has independent size and emphasis props, with no recipe variant.
  useHeading({ children: 'Title', variant: 'display' });

  // @ts-expect-error Text uses its body text size, tone, and emphasis props.
  useText({ children: 'Body', variant: 'body' });

  // @ts-expect-error Legend uses explicit caption size and weight props.
  useLegend({ children: 'Account', variant: 'title' });

  // @ts-expect-error Heading sizes must use a supported string literal.
  useHeading({ children: 'Title', size: 'display' });

  // @ts-expect-error Body text keeps its supported three-size subset.
  useText({ children: 'Body', size: 'xlarge' });

  // @ts-expect-error Buttons keep their supported three-size subset.
  useButton({ children: 'Continue', size: 'xlarge' });

  // @ts-expect-error Legends keep their supported three-size subset.
  useLegend({ children: 'Account', size: 'xlarge' });

  // @ts-expect-error Accent is not a supported button variant.
  useButton({ children: 'Continue', variant: 'accent' });

  void [button, navigation, heading, link];
}

void useRejectedVisualOverrides;

type Assert<Condition extends true> = Condition;

/** Guard against accidentally making the mapped API check empty. */
export type PublicInputsCovered = Assert<
  'Button' | 'Navigation' | 'useHeading' extends keyof PublicInputs ? true : false
>;

export type NoRecipeExports = Assert<
  Extract<'HeadingVariant' | 'TextVariant' | 'LegendVariant', keyof PublicLibrary> extends never
    ? true
    : false
>;

/** Choice names remain public types without exposing runtime constants. */
export type NoChoiceConstants = Assert<
  Extract<'LinkAppearance', keyof PublicLibrary> extends never ? true : false
>;
