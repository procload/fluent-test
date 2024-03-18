import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
export { SliderOrientation } from '@microsoft/fast-foundation/slider.js';
/**
 * SliderSize Constants
 * @public
 */
export declare const SliderSize: {
    readonly small: "small";
    readonly medium: "medium";
};
/**
 * Applies bar height to the slider rail and diameter to the slider thumbs
 * @public
 */
export declare type SliderSize = ValuesOf<typeof SliderSize>;
