import { FASTAnchor } from '@microsoft/fast-foundation/anchor.js';
import { AnchorButtonAppearance, AnchorButtonShape, AnchorButtonSize } from './anchor-button.options.js';
/**
 * The base class used for constructing a fluent-anchor-button custom element
 * @public
 */
export declare class AnchorButton extends FASTAnchor {
    /**
     * The appearance the anchor button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: AnchorButtonAppearance | undefined;
    /**
     * The shape the anchor button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: AnchorButtonShape | undefined;
    /**
     * The size the anchor button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: AnchorButtonSize;
    /**
     * The anchor button has an icon only, no text content
     *
     * @public
     * @remarks
     * HTML Attribute: icon-only
     */
    iconOnly: boolean;
    /**
     * The anchor button is disabled
     *
     * @public
     * @remarks
     * HTML Attribute: disabled-focusable
     */
    disabled?: boolean;
    protected disabledChanged(prev: boolean, next: boolean): void;
    /**
     * The anchor button is disabled but focusable
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
