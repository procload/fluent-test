import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * SpinnerAppearance constants
 * @public
 */
export declare const SpinnerAppearance: {
    readonly primary: "primary";
    readonly inverted: "inverted";
};
/**
 * A Spinner's appearance can be either primary or inverted
 * @public
 */
export declare type SpinnerAppearance = ValuesOf<typeof SpinnerAppearance>;
/**
 * SpinnerSize constants
 * @public
 */
export declare const SpinnerSize: {
    readonly tiny: "tiny";
    readonly extraSmall: "extra-small";
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
    readonly huge: "huge";
};
/**
 * A Spinner's size can be either small, tiny, extra-small, medium, large, extra-large, or huge
 * @public
 */
export declare type SpinnerSize = ValuesOf<typeof SpinnerSize>;
