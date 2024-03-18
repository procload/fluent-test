import { FASTCard } from '@microsoft/fast-foundation';
import { CardAppearance, CardFocusMode, CardOrientation, CardSize } from './card.options.js';
/**
 * @class Card component
 *
 * @remarks
 * This class extends the FASTCard. a flexible content container
 */
export declare class Card extends FASTCard {
    connectedCallback(): void;
    disconnectedCallback(): void;
    focusMode: CardFocusMode;
    /**
     * Stores the computed stylesheet for the card
     */
    private computedStylesheet?;
    /**
     * @property appearance;
     * @default filled
     * @remarks
     * Determines the appearance of the card
     */
    appearance?: CardAppearance;
    /**
     * @property orientation;
     * @default vertical
     * @remarks
     * Determines the orientation of the card
     */
    orientation?: CardOrientation;
    /**
     * @property size
     * @default medium
     * @remarks
     * Determines the size of the card
     */
    size?: CardSize;
    /**
     * @property selectable
     * @default false
     * @remarks
     * Determines whether card is selectable
     */
    selectable: boolean;
    /**
     * @property disabled
     * @default false
     * @remarks
     * Determines disabled state of card
     */
    disabled: boolean;
    /**
     * @property selected
     * @default false
     * @remarks
     * Determines selected state of card
     */
    selected: boolean;
    /**
     * The id of the element describing the dialog.
     * @public
     * @remarks
     * HTML Attribute: aria-describedby
     */
    ariaDescribedby?: string;
    /**
     * The id of the element labeling the dialog.
     * @public
     * @remarks
     * HTML Attribute: aria-labelledby
     */
    ariaLabelledby?: string;
    /**
     * @remarks
     * Reference to the card element
     */
    card: HTMLElement;
    /**
     * @remarks
     * Reference to the root element
     */
    root: HTMLElement;
    /**
     * @remarks
     * Reference to the floatingAction slot
     */
    floatingAction: HTMLElement[];
    /**
     * @remarks
     * Reference to the root element
     */
    control: HTMLElement;
    /**
     * Toggles the selection state of the card.
     *
     * @param checked - Optional boolean value to set the selection state.
     */
    toggleCardSelection(selected?: boolean): void;
    /**
     * Selects the card if it is not already selected and is selectable.
     */
    select(): void;
    /**
     * Unselects the card if it is not already unselected and selectable.
     */
    unselect(): void;
    /**
     * Focuses on the element at the specified index in the bounds array.
     * If the bounds array is empty, it focuses on the card itself.
     *
     * @param index - The index of the element to focus on.
     */
    private focusElementAtIndex;
    /**
     * Focuses on the first element in the bounds array.
     * If the bounds array is empty, it focuses on the card itself.
     */
    focusFirstElement: () => void;
    /**
     * Focuses on the last element in the bounds array.
     * If the bounds array is empty, it focuses on the card itself.
     */
    focusLastElement: () => void;
    floatingActionChangeHandler(e: Event): boolean | void;
    /**
     * Handles click events on the card.
     *
     * @param e - The mouse event.
     * @returns {boolean | void} - Returns true if the card is not selectable, otherwise void.
     */
    clickHandler(e: MouseEvent): boolean | void;
    /**
     * Handles keydown events on the card.
     *
     * @param e - The keyboard event.
     * @returns {boolean | void} - Returns true if the card is disabled, otherwise void.
     */
    keydownHandler(e: KeyboardEvent): boolean | void | null;
    /**
     * Determines if the card is focusable.
     * @returns {boolean} - True if the card is focusable, false otherwise.
     */
    get isFocusable(): boolean;
    /**
     * Returns the bounds of the tab queue.
     * The tab queue is a collection of elements that are focusable.
     *
     * @returns {(HTMLElement | SVGElement)[]} - The bounds of the tab queue.
     */
    get bounds(): (HTMLElement | SVGElement)[];
    /**
     * Checks if the first element in the tab queue is focused.
     *
     * @returns {boolean} - True if the first element in the tab queue is focused, false otherwise.
     */
    get isBoundsZeroIndexFocused(): boolean;
    /**
     * Checks if the last element in the tab queue is focused.
     *
     * @returns {boolean} - True if the last element in the tab queue is focused, false otherwise.
     */
    get isBoundsLastIndexFocused(): boolean;
    /**
     * Determines if focus should be trapped within the card.
     *
     * @internal
     */
    get shouldTrapFocus(): boolean;
    /**
     * @method sizeChanged
     * @remarks
     * Updates the computed stylesheet when the size of the card changes
     */
    protected sizeChanged(): void;
    /**
     * @method selectedChanged
     * @remarks
     * Emits an event when the selected state of the card changes
     */
    protected selectedChanged: () => void;
    /**
     * Sets the component's properties based on the focus mode.
     * If the focus mode is 'no-tab' or 'tab-exit', the root element's inert property is set to true.
     * @private
     */
    private setComponent;
    /**
     * Updates an internal stylesheet with calculated CSS custom properties.
     *
     * @internal
     */
    protected updateComputedStylesheet(): void;
    /**
     * Returns the bounds of the tab queue.
     * The tab queue is a collection of elements that are focusable.
     *
     * @internal
     */
    private getTabQueueBounds;
    /**
     * Reduce a collection to only its focusable elements.
     *
     * @internal
     */
    private static reduceTabbableItems;
    /**
     * Test if element is focusable fast element
     *
     * @internal
     */
    private static isFocusableFastElement;
    /**
     * Test if the element has a focusable shadow
     *
     * @internal
     */
    private static hasTabbableShadow;
}
