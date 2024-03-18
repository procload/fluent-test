import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * ProgressBarThickness Constants
 * @public
 */
export declare const ProgressBarThickness: {
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * Applies bar thickness to the content
 * @public
 */
export declare type ProgressBarThickness = ValuesOf<typeof ProgressBarThickness>;
/**
 * ProgressBarShape Constants
 * @public
 */
export declare const ProgressBarShape: {
    readonly rounded: "rounded";
    readonly square: "square";
};
/**
 * Applies bar shape to the content
 * @public
 */
export declare type ProgressBarShape = ValuesOf<typeof ProgressBarShape>;
/**
 * ProgressBarValidationState Constants
 * @public
 */
export declare const ProgressBarValidationState: {
    readonly success: "success";
    readonly warning: "warning";
    readonly error: "error";
};
/**
 * Applies validation state to the content
 * @public
 */
export declare type ProgressBarValidationState = ValuesOf<typeof ProgressBarValidationState>;
