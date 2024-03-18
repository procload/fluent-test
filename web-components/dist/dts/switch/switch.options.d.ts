import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * SwitchLabelPosition Constants
 * @public
 */
export declare const SwitchLabelPosition: {
    readonly above: "above";
    readonly after: "after";
    readonly before: "before";
};
/**
 * Applies label position
 * @public
 */
export declare type SwitchLabelPosition = ValuesOf<typeof SwitchLabelPosition>;
