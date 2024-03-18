import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * A Labels font size can be small, medium, or large
 */
export declare const LabelSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * Applies font size to label
 * @public
 */
export declare type LabelSize = ValuesOf<typeof LabelSize>;
/**
 * A label can have a font weight of regular or strong
 */
export declare const LabelWeight: {
    readonly regular: "regular";
    readonly semibold: "semibold";
};
/**
 * Applies font weight to label
 * @public
 */
export declare type LabelWeight = ValuesOf<typeof LabelWeight>;
