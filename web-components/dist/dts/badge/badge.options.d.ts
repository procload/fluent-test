import { StartEndOptions } from '@microsoft/fast-foundation/patterns.js';
import type { StaticallyComposableHTML, ValuesOf } from '@microsoft/fast-foundation/utilities.js';
import type { Badge } from './badge.js';
/**
 * @internal - marking as internal update when Badge PR for start/end is in
 */
export declare type BadgeOptions = StartEndOptions<Badge> & {
    defaultContent?: StaticallyComposableHTML;
};
/**
 * BadgeAppearance constants
 * @public
 */
export declare const BadgeAppearance: {
    readonly filled: "filled";
    readonly ghost: "ghost";
    readonly outline: "outline";
    readonly tint: "tint";
};
/**
 * A Badge can be filled, outline, ghost, inverted
 * @public
 */
export declare type BadgeAppearance = ValuesOf<typeof BadgeAppearance>;
/**
 * BadgeColor constants
 * @public
 */
export declare const BadgeColor: {
    readonly brand: "brand";
    readonly danger: "danger";
    readonly important: "important";
    readonly informative: "informative";
    readonly severe: "severe";
    readonly subtle: "subtle";
    readonly success: "success";
    readonly warning: "warning";
};
/**
 * A Badge can be one of preset colors
 * @public
 */
export declare type BadgeColor = ValuesOf<typeof BadgeColor>;
/**
 * A Badge can be square, circular or rounded.
 * @public
 */
export declare const BadgeShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};
/**
 * A Badge can be one of preset colors
 * @public
 */
export declare type BadgeShape = ValuesOf<typeof BadgeShape>;
/**
 * A Badge can be square, circular or rounded.
 * @public
 */
export declare const BadgeSize: {
    readonly tiny: "tiny";
    readonly extraSmall: "extra-small";
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
};
/**
 * A Badge can be on of several preset sizes.
 * @public
 */
export declare type BadgeSize = ValuesOf<typeof BadgeSize>;
