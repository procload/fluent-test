import { FASTCheckbox } from '@microsoft/fast-foundation/checkbox.js';
import { CheckboxLabelPosition, CheckboxShape, CheckboxSize } from './checkbox.options.js';
/**
 * The base class used for constucting a fluent checkbox custom element
 * @public
 */
export declare class Checkbox extends FASTCheckbox {
    /**
     * Sets shape of the checkbox.
     *
     * @public
     * @default 'square'
     * @remarks
     * HTML Attribute: shape
     */
    shape?: CheckboxShape;
    /**
     * Sets size of the checkbox.
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: size
     */
    size?: CheckboxSize;
    /**
     * Sets position of the label relative to the input
     *
     * @public
     * @default 'after'
     * @remarks
     * HTML Attribute: label-position
     */
    labelPosition?: CheckboxLabelPosition;
}
