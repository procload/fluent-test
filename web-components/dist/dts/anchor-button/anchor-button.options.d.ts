import type { AnchorOptions } from '@microsoft/fast-foundation/anchor.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * Anchor Button Appearance constants
 * @public
 */
export declare const AnchorButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};
/**
 * An Anchor Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type AnchorButtonAppearance = ValuesOf<typeof AnchorButtonAppearance>;
/**
 * An Anchor Button can be square, circular or rounded.
 * @public
 */
export declare const AnchorButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};
/**
 * An Anchor Button can be square, circular or rounded
 * @public
 */
export declare type AnchorButtonShape = ValuesOf<typeof AnchorButtonShape>;
/**
 * An Anchor Button can be a size of small, medium or large.
 * @public
 */
export declare const AnchorButtonSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * An Anchor Button can be on of several preset sizes.
 * @public
 */
export declare type AnchorButtonSize = ValuesOf<typeof AnchorButtonSize>;
export { AnchorOptions as AnchorButtonOptions };
