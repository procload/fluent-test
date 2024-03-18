import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
import { BadgeOptions } from '../badge/badge.options.js';
/**
 * CounterBadge options
 * @public
 */
export declare type CounterBadgeOptions = BadgeOptions;
/**
 * CounterBadgeAppearance constants
 * @public
 */
export declare const CounterBadgeAppearance: {
    readonly filled: "filled";
    readonly ghost: "ghost";
};
/**
 * A CounterBadge can have an appearance of filled or ghost
 * @public
 */
export declare type CounterBadgeAppearance = ValuesOf<typeof CounterBadgeAppearance>;
/**
 * CounterBadgeColor constants
 * @public
 */
export declare const CounterBadgeColor: {
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
 * A CounterBadge can be one of preset colors
 * @public
 */
export declare type CounterBadgeColor = ValuesOf<typeof CounterBadgeColor>;
/**
 * A CounterBadge shape can be circular or rounded.
 * @public
 */
export declare const CounterBadgeShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
};
/**
 * A CounterBadge can be one of preset colors
 * @public
 */
export declare type CounterBadgeShape = ValuesOf<typeof CounterBadgeShape>;
/**
 * A CounterBadge can be square, circular or rounded.
 * @public
 */
export declare const CounterBadgeSize: {
    readonly tiny: "tiny";
    readonly extraSmall: "extra-small";
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
};
/**
 * A CounterBadge can be on of several preset sizes.
 * @public
 */
export declare type CounterBadgeSize = ValuesOf<typeof CounterBadgeSize>;
