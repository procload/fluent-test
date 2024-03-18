import { DividerOrientation, DividerRole } from '@microsoft/fast-foundation/divider.js';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * Fast Foundation DividerRole property
 * @public
 */
export { DividerRole };
/**
 * Fast Foundation Orientation property
 * @public
 */
export { DividerOrientation };
/**
 * Align content within divider
 * @public
 */
export declare const DividerAlignContent: {
    readonly center: "center";
    readonly start: "start";
    readonly end: "end";
};
/**
 * The types for DividerAlignContent
 * @public
 */
export declare type DividerAlignContent = ValuesOf<typeof DividerAlignContent>;
/**
 * DividerAppearance - divider color defined by a design token alias.
 * @public
 */
export declare const DividerAppearance: {
    readonly strong: "strong";
    readonly brand: "brand";
    readonly subtle: "subtle";
    readonly default: "default";
};
/**
 * The types for Appearance
 * @public
 */
export declare type DividerAppearance = ValuesOf<typeof DividerAppearance>;
