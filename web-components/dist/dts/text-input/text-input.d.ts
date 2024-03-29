import { FASTTextField } from '@microsoft/fast-foundation/text-field.js';
import { TextInputAppearance, TextInputControlSize } from './text-input.options.js';
/**
 * The base class used for constructing a fluent-text-input custom element
 * @public
 */
export declare class TextInput extends FASTTextField {
    /**
     * Defines TextInput control size
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: control-size
     */
    controlSize?: TextInputControlSize;
    /**
     * Defines TextInput appearance.
     *
     * @public
     * @default 'outline'
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: TextInputAppearance;
}
