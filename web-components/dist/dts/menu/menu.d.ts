import { FASTElement } from '@microsoft/fast-element';
import { MenuList } from '../menu-list/menu-list.js';
/**
 * The Menu class represents a menu component.
 * @public
 */
export declare class Menu extends FASTElement {
    /**
     * Determines if the menu should open on hover.
     * @public
     */
    openOnHover?: boolean;
    /**
     * Determines if the menu should open on right click.
     * @public
     */
    openOnContext?: boolean;
    /**
     * Determines if the menu should close on scroll.
     * @public
     */
    closeOnScroll?: boolean;
    /**
     * Determines if the menu open state should persis on click of menu item
     * @public
     */
    persistOnItemClick?: boolean;
    /**
     * Defines whether the menu is open or not.
     * @public
     */
    open: boolean;
    /**
     * Holds the slotted menu list.
     * @public
     */
    slottedMenuList: MenuList[];
    /**
     * Holds the slotted triggers.
     * @public
     */
    slottedTriggers: HTMLElement[];
    /**
     * The positioning container of the menu.
     * @internal
     */
    positioningContainer?: HTMLElement;
    /**
     * The trigger element of the menu.
     * @private
     */
    private _trigger?;
    /**
     * The menu list element of the menu.
     * @private
     */
    private _menuList?;
    /**
     * Holds a reference to a function that is used to cleanup resources.
     * @public
     */
    cleanup?: () => void;
    /**
     * Called when the element is connected to the DOM.
     * Sets up the component.
     * @public
     */
    connectedCallback(): void;
    /**
     * Called when the element is disconnected from the DOM.
     * Removes event listeners.
     * @public
     */
    disconnectedCallback(): void;
    /**
     * Sets the component.
     * Sets the trigger and menu list elements and adds event listeners.
     * @public
     */
    setComponent(): void;
    /**
     * Toggles the open state of the menu.
     * @public
     */
    toggleMenu: () => void;
    /**
     * Closes the menu.
     * @public
     */
    closeMenu: () => void;
    /**
     * Opens the menu.
     * @public
     */
    openMenu: (e?: Event) => void;
    /**
     * Focuses on the menu list.
     * @public
     */
    focusMenuList(): void;
    /**
     * Focuses on the menu trigger.
     * @public
     */
    focusTrigger(): void;
    /**
     * Called whenever the open state changes.
     * Updates the 'aria-expanded' attribute and sets the positioning of the menu.
     * Sets menu list position
     * emits openChanged event
     * @public
     * @param {boolean} oldValue - The previous value of 'open'.
     * @param {boolean} newValue - The new value of 'open'.
     */
    openChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'openOnHover' property changes.
     * Adds or removes a 'mouseover' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'openOnHover'.
     * @param {boolean} newValue - The new value of 'openOnHover'.
     */
    openOnHoverChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'persistOnItemClick' property changes.
     * Adds or removes a 'click' event listener to the menu list based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'persistOnItemClick'.
     * @param {boolean} newValue - The new value of 'persistOnItemClick'.
     */
    persistOnItemClickChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'openOnContext' property changes.
     * Adds or removes a 'contextmenu' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'openOnContext'.
     * @param {boolean} newValue - The new value of 'openOnContext'.
     */
    openOnContextChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'closeOnScroll' property changes.
     * Adds or removes a 'closeOnScroll' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'closeOnScroll'.
     * @param {boolean} newValue - The new value of 'closeOnScroll'.
     */
    closeOnScrollChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * The task to set the positioning of the menu.
     * @protected
     */
    protected setPositioningTask: () => void;
    /**
     * Sets the positioning of the menu.
     * @protected
     */
    protected setPositioning(): void;
    /**
     * Adds event listeners.
     * Adds click and keydown event listeners to the trigger and a click event listener to the document.
     * If 'openOnHover' is true, adds a 'mouseover' event listener to the trigger.
     * @public
     */
    private addListeners;
    /**
     * Removes event listeners.
     * Removes click and keydown event listeners from the trigger and a click event listener from the document.
     * Also removes 'mouseover' event listeners from the trigger.
     * @private
     */
    private removeListeners;
    /**
     * Handles keyboard interaction for the menu.
     * Closes the menu and focuses on the trigger when the Escape key is pressed.
     * Closes the menu when the Tab key is pressed.
     * @public
     * @param {KeyboardEvent} e - the keyboard event
     */
    handleMenuKeydown(e: KeyboardEvent): boolean | void;
    /**
     * Handles keyboard interaction for the trigger.
     * Toggles the menu when the Space or Enter key is pressed.
     * If the menu is open, focuses on the menu list.
     * @public
     * @param {KeyboardEvent} e - the keyboard event
     */
    handleTriggerKeydown: (e: KeyboardEvent) => boolean | void;
    /**
     * Handles document click events to close the menu when a click occurs outside of the menu or the trigger.
     * @private
     * @param {Event} e - The event triggered on document click.
     */
    private handleDocumentClick;
}
