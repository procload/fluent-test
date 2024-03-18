import { Button } from '../button/button.js';
/**
 * The base class used for constructing a fluent-toggle-button custom element
 * @public
 */
export declare class ToggleButton extends Button {
    /**
     * Tracks whether the "checked" property has been changed.
     * This is necessary to provide consistent behavior with
     * normal input checkboxes
     */
    protected dirtyChecked: boolean;
    /**
     * Provides the default checkedness of the input element
     * Passed down to proxy
     *
     * @public
     * @remarks
     * HTML Attribute: checked
     */
    checkedAttribute: boolean;
    protected checkedAttributeChanged(): void;
    defaultChecked: boolean;
    protected defaultCheckedChanged(): void;
    /**
     * The checked state of the control.
     *
     * @public
     */
    checked: boolean;
    protected checkedChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * The current checkedness of the element. This property serves as a mechanism
     * to set the `checked` property through both property assignment and the
     * .setAttribute() method. This is useful for setting the field's checkedness
     * in UI libraries that bind data through the .setAttribute() API
     * and don't support IDL attribute binding.
     */
    currentChecked: boolean;
    currentCheckedChanged(prev: boolean | undefined, next: boolean): void;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @internal
     */
    protected handleToggleButtonClick: (e: MouseEvent) => void;
}
