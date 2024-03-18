import { FASTSlider } from '@microsoft/fast-foundation/slider.js';
import type { SliderSize } from './slider.options.js';
/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export declare class Slider extends FASTSlider {
    /**
     * The size of the slider
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: SliderSize;
    handleChange(source: any, propertyName: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private stepStyles?;
    /**
     * Handles changes to step styling based on the step value
     * NOTE: This function is not a changed callback, stepStyles is not observable
     */
    private handleStepStyles;
}
