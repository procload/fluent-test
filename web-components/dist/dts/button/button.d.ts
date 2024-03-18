import { FASTButton } from '@microsoft/fast-foundation/button.js';
import { ButtonAppearance, ButtonShape, ButtonSize } from './button.options.js';
/**
 * The base class used for constructing a fluent-button custom element
 * @public
 */
export declare class Button extends FASTButton {
    /**
     * The appearance the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: ButtonAppearance | undefined;
    /**
     * The shape the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: ButtonShape | undefined;
    /**
     * The size the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: ButtonSize;
    /**
     * The button has an icon only, no text content
     *
     * @public
     * @remarks
     * HTML Attribute: icon-only
     */
    iconOnly: boolean;
    /**
     * The button is disabled but focusable
     *
     * @public
     * @remarks
     * HTML Attribute: disabled-focusable
     */
    disabledFocusable?: boolean;
    protected disabledFocusableChanged(prev: boolean, next: boolean): void;
    /**
     * Prevents disabledFocusable click events
     */
    private handleDisabledFocusableClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
