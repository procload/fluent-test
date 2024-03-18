import type { ButtonOptions } from '@microsoft/fast-foundation/button.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * Compound Button Appearance constants
 * @public
 */
export declare const CompoundButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};
/**
 * A Compound Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type CompoundButtonAppearance = ValuesOf<typeof CompoundButtonAppearance>;
/**
 * A Compound Button can be square, circular or rounded.
 * @public
 */
export declare const CompoundButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};
/**
 * A Compound Button can be square, circular or rounded
 * @public
 */
export declare type CompoundButtonShape = ValuesOf<typeof CompoundButtonShape>;
/**
 * A Compound Button can be a size of small, medium or large.
 * @public
 */
export declare const CompoundButtonSize: {
    readonly small: "small";
    /**
     * A Compound Button can be on of several preset sizes.
     * @public
     */
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * A Compound Button can be on of several preset sizes.
 * @public
 */
export declare type CompoundButtonSize = ValuesOf<typeof CompoundButtonSize>;
export { ButtonOptions as CompoundButtonOptions };
