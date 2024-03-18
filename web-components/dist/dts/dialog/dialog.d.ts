import { FASTElement } from '@microsoft/fast-element';
import { Button as FluentButton } from '../button/button.js';
import { DialogModalType } from './dialog.options.js';
/**
 * Dialog component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export declare class Dialog extends FASTElement {
    /**
     * @private
     * Indicates whether focus is being trapped within the dialog
     */
    private isTrappingFocus;
    /**
     * @public
     * Lifecycle method called when the element is connected to the DOM
     */
    connectedCallback(): void;
    /**
     * @public
     * Lifecycle method called when the element is disconnected from the DOM
     */
    disconnectedCallback(): void;
    /**
     * @public
     * The dialog element
     */
    dialog: HTMLDialogElement;
    /**
     * @public
     * The title action elements
     */
    titleAction: HTMLElement[];
    /**
     * @public
     * The default title action button
     */
    defaultTitleAction?: FluentButton;
    /**
     * @public
     * The ID of the element that describes the dialog
     */
    ariaDescribedby?: string;
    /**
     * @public
     * The ID of the element that labels the dialog
     */
    ariaLabelledby?: string;
    /**
     * @public
     * The type of the dialog modal
     */
    modalType: DialogModalType;
    /**
     * @public
     * Indicates whether the dialog is open
     */
    open: boolean;
    /**
     * @public
     * Indicates whether the dialog has a title action
     */
    noTitleAction: boolean;
    /**
     * @private
     * Indicates whether focus should be trapped within the dialog
     */
    private trapFocus;
    /**
     * @public
     * Method called when the 'open' attribute changes
     */
    openChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * @public
     * Method called when the 'modalType' attribute changes
     */
    modalTypeChanged(oldValue: DialogModalType, newValue: DialogModalType): void;
    /**
     * @public
     * Method to set the component's state based on its attributes
     */
    setComponent(): void;
    /**
     * @public
     * Method to emit an event when the dialog's open state changes
     * @param dismissed - Indicates whether the dialog was dismissed
     */
    onOpenChangeEvent: (dismissed?: boolean) => void;
    /**
     * @public
     * Method to show the dialog
     */
    show(): void;
    /**
     * @public
     * Method to hide the dialog
     * @param dismissed - Indicates whether the dialog was dismissed
     */
    hide(dismissed?: boolean): void;
    /**
     * @public
     * Method to dismiss the dialog
     */
    dismiss(): void;
    /**
     * @public
     * Handles click events on the dialog
     * @param event - The click event
     * @returns boolean
     */
    handleClick(event: Event): boolean;
    /**
     * @public
     * Handles keydown events on the dialog
     * @param e - The keydown event
     * @returns boolean | void
     */
    handleKeydown: (e: KeyboardEvent) => boolean | void;
    /**
     * @private
     * Handles keydown events on the document
     * @param e - The keydown event
     */
    private handleDocumentKeydown;
    /**
     * @private
     * Handles tab keydown events
     * @param e - The keydown event
     */
    private handleTabKeyDown;
    /**
     * @private
     * Gets the bounds of the tab queue
     * @returns (HTMLElement | SVGElement)[]
     */
    private getTabQueueBounds;
    /**
     * @private
     * Focuses the first element in the tab queue
     */
    private focusFirstElement;
    /**
     * @private
     * Determines if focus should be forced
     * @param currentFocusElement - The currently focused element
     * @returns boolean
     */
    private shouldForceFocus;
    /**
     * @private
     * Determines if focus should be trapped
     * @returns boolean
     */
    private shouldTrapFocus;
    /**
     * @private
     * Handles focus events on the document
     * @param e - The focus event
     */
    private handleDocumentFocus;
    /**
     * @private
     * Updates the state of focus trapping
     * @param shouldTrapFocusOverride - Optional override for whether focus should be trapped
     */
    private updateTrapFocus;
    /**
     * @private
     * Reduces the list of tabbable items
     * @param elements - The current list of elements
     * @param element - The element to consider adding to the list
     * @returns HTMLElement[]
     */
    private static reduceTabbableItems;
    /**
     * @private
     * Determines if an element is a focusable FASTElement
     * @param element - The element to check
     * @returns boolean
     */
    private static isFocusableFastElement;
    /**
     * @private
     * Determines if an element has a tabbable shadow
     * @param element - The element to check
     * @returns boolean
     */
    private static hasTabbableShadow;
}
