import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * Checkbox shape
 * @public
 */
export declare const CheckboxShape: {
    readonly circular: "circular";
    readonly square: "square";
};
export declare type CheckboxShape = ValuesOf<typeof CheckboxShape>;
/**
 * Checkbox size
 * @public
 */
export declare const CheckboxSize: {
    readonly medium: "medium";
    readonly large: "large";
};
export declare type CheckboxSize = ValuesOf<typeof CheckboxSize>;
/**
 * Checkbox label position
 * @public
 */
export declare const CheckboxLabelPosition: {
    readonly before: "before";
    readonly after: "after";
};
export declare type CheckboxLabelPosition = ValuesOf<typeof CheckboxLabelPosition>;
