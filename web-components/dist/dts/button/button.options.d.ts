import type { ButtonOptions } from '@microsoft/fast-foundation/button.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * ButtonAppearance constants
 * @public
 */
export declare const ButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};
/**
 * A Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type ButtonAppearance = ValuesOf<typeof ButtonAppearance>;
/**
 * A Button can be square, circular or rounded.
 * @public
 */
export declare const ButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};
/**
 * A Button can be square, circular or rounded
 * @public
 */
export declare type ButtonShape = ValuesOf<typeof ButtonShape>;
/**
 * A Button can be a size of small, medium or large.
 * @public
 */
export declare const ButtonSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * A Button can be on of several preset sizes.
 * @public
 */
export declare type ButtonSize = ValuesOf<typeof ButtonSize>;
export { ButtonOptions };
