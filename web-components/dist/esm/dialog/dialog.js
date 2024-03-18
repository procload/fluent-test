var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { isTabbable } from 'tabbable';
import { keyEscape, keyTab } from '@microsoft/fast-web-utilities';
import { DialogModalType } from './dialog.options.js';
/**
 * Dialog component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export class Dialog extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * @private
         * Indicates whether focus is being trapped within the dialog
         */
        this.isTrappingFocus = false;
        /**
         * @public
         * The title action elements
         */
        this.titleAction = [];
        /**
         * @public
         * The type of the dialog modal
         */
        this.modalType = DialogModalType.modal;
        /**
         * @public
         * Indicates whether the dialog is open
         */
        this.open = false;
        /**
         * @public
         * Indicates whether the dialog has a title action
         */
        this.noTitleAction = false;
        /**
         * @private
         * Indicates whether focus should be trapped within the dialog
         */
        this.trapFocus = false;
        /**
         * @public
         * Method to emit an event when the dialog's open state changes
         * @param dismissed - Indicates whether the dialog was dismissed
         */
        this.onOpenChangeEvent = (dismissed = false) => {
            this.$emit('onOpenChange', { open: this.dialog.open, dismissed: dismissed });
        };
        /**
         * @public
         * Handles keydown events on the dialog
         * @param e - The keydown event
         * @returns boolean | void
         */
        this.handleKeydown = (e) => {
            if (e.defaultPrevented) {
                return;
            }
            switch (e.key) {
                case keyEscape:
                    if (this.modalType !== DialogModalType.alert) {
                        this.hide(true);
                        this.$emit('dismiss');
                    }
                    break;
                default:
                    return true;
            }
        };
        /**
         * @private
         * Handles keydown events on the document
         * @param e - The keydown event
         */
        this.handleDocumentKeydown = (e) => {
            if (!e.defaultPrevented && this.dialog.open) {
                switch (e.key) {
                    case keyTab:
                        this.handleTabKeyDown(e);
                        break;
                }
            }
        };
        /**
         * @private
         * Handles tab keydown events
         * @param e - The keydown event
         */
        this.handleTabKeyDown = (e) => {
            if (!this.trapFocus || !this.dialog.open) {
                return;
            }
            const bounds = this.getTabQueueBounds();
            if (bounds.length === 1) {
                bounds[0].focus();
                e.preventDefault();
                return;
            }
            if (e.shiftKey && e.target === bounds[0]) {
                bounds[bounds.length - 1].focus();
                e.preventDefault();
            }
            else if (!e.shiftKey && e.target === bounds[bounds.length - 1]) {
                bounds[0].focus();
                e.preventDefault();
            }
            return;
        };
        /**
         * @private
         * Gets the bounds of the tab queue
         * @returns (HTMLElement | SVGElement)[]
         */
        this.getTabQueueBounds = () => {
            const bounds = [];
            return Dialog.reduceTabbableItems(bounds, this);
        };
        /**
         * @private
         * Focuses the first element in the tab queue
         */
        this.focusFirstElement = () => {
            const bounds = this.getTabQueueBounds();
            if (bounds.length > 0) {
                bounds[0].focus();
            }
            else {
                if (this.dialog instanceof HTMLElement) {
                    this.dialog.focus();
                }
            }
        };
        /**
         * @private
         * Determines if focus should be forced
         * @param currentFocusElement - The currently focused element
         * @returns boolean
         */
        this.shouldForceFocus = (currentFocusElement) => {
            return this.isTrappingFocus && !this.contains(currentFocusElement);
        };
        /**
         * @private
         * Determines if focus should be trapped
         * @returns boolean
         */
        this.shouldTrapFocus = () => {
            return this.trapFocus && this.dialog.open;
        };
        /**
         * @private
         * Handles focus events on the document
         * @param e - The focus event
         */
        this.handleDocumentFocus = (e) => {
            if (!e.defaultPrevented && this.shouldForceFocus(e.target)) {
                this.focusFirstElement();
                e.preventDefault();
            }
        };
        /**
         * @private
         * Updates the state of focus trapping
         * @param shouldTrapFocusOverride - Optional override for whether focus should be trapped
         */
        this.updateTrapFocus = (shouldTrapFocusOverride) => {
            const shouldTrapFocus = shouldTrapFocusOverride === undefined ? this.shouldTrapFocus() : shouldTrapFocusOverride;
            if (shouldTrapFocus && !this.isTrappingFocus) {
                this.isTrappingFocus = true;
                // Add an event listener for focusin events if we are trapping focus
                document.addEventListener('focusin', this.handleDocumentFocus);
                Updates.enqueue(() => {
                    if (this.shouldForceFocus(document.activeElement)) {
                        this.focusFirstElement();
                    }
                });
            }
            else if (!shouldTrapFocus && this.isTrappingFocus) {
                this.isTrappingFocus = false;
                // remove event listener if we are not trapping focus
                document.removeEventListener('focusin', this.handleDocumentFocus);
            }
        };
    }
    /**
     * @public
     * Lifecycle method called when the element is connected to the DOM
     */
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this.handleDocumentKeydown);
        Updates.enqueue(() => {
            this.updateTrapFocus();
            this.setComponent();
        });
    }
    /**
     * @public
     * Lifecycle method called when the element is disconnected from the DOM
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this.handleDocumentKeydown);
        this.updateTrapFocus(false);
    }
    /**
     * @public
     * Method called when the 'open' attribute changes
     */
    openChanged(oldValue, newValue) {
        if (newValue !== oldValue) {
            if (newValue && !oldValue) {
                this.show();
            }
            else if (!newValue && oldValue) {
                this.hide();
            }
        }
    }
    /**
     * @public
     * Method called when the 'modalType' attribute changes
     */
    modalTypeChanged(oldValue, newValue) {
        if (newValue !== oldValue) {
            if (newValue == DialogModalType.alert || newValue == DialogModalType.modal) {
                this.trapFocus = true;
            }
            else {
                this.trapFocus = false;
            }
        }
    }
    /**
     * @public
     * Method to set the component's state based on its attributes
     */
    setComponent() {
        if (this.modalType == DialogModalType.modal || this.modalType == DialogModalType.alert) {
            this.trapFocus = true;
        }
        else {
            this.trapFocus = false;
        }
    }
    /**
     * @public
     * Method to show the dialog
     */
    show() {
        Updates.enqueue(() => {
            if (this.modalType === DialogModalType.alert || this.modalType === DialogModalType.modal) {
                this.dialog.showModal();
                this.open = true;
                this.updateTrapFocus(true);
            }
            else if (this.modalType === DialogModalType.nonModal) {
                this.dialog.show();
                this.open = true;
            }
            this.onOpenChangeEvent();
        });
    }
    /**
     * @public
     * Method to hide the dialog
     * @param dismissed - Indicates whether the dialog was dismissed
     */
    hide(dismissed = false) {
        this.dialog.close();
        this.open = false;
        this.onOpenChangeEvent(dismissed);
    }
    /**
     * @public
     * Method to dismiss the dialog
     */
    dismiss() {
        if (this.modalType === DialogModalType.alert) {
            return;
        }
        this.hide(true);
    }
    /**
     * @public
     * Handles click events on the dialog
     * @param event - The click event
     * @returns boolean
     */
    handleClick(event) {
        event.preventDefault();
        if (this.dialog.open && this.modalType !== DialogModalType.alert && event.target === this.dialog) {
            this.dismiss();
        }
        return true;
    }
    /**
     * @private
     * Reduces the list of tabbable items
     * @param elements - The current list of elements
     * @param element - The element to consider adding to the list
     * @returns HTMLElement[]
     */
    static reduceTabbableItems(elements, element) {
        if (element.getAttribute('tabindex') === '-1') {
            return elements;
        }
        if (isTabbable(element) || (Dialog.isFocusableFastElement(element) && Dialog.hasTabbableShadow(element))) {
            elements.push(element);
            return elements;
        }
        return Array.from(element.children).reduce((elements, currentElement) => Dialog.reduceTabbableItems(elements, currentElement), elements);
    }
    /**
     * @private
     * Determines if an element is a focusable FASTElement
     * @param element - The element to check
     * @returns boolean
     */
    static isFocusableFastElement(element) {
        var _a, _b;
        return !!((_b = (_a = element.$fastController) === null || _a === void 0 ? void 0 : _a.definition.shadowOptions) === null || _b === void 0 ? void 0 : _b.delegatesFocus);
    }
    /**
     * @private
     * Determines if an element has a tabbable shadow
     * @param element - The element to check
     * @returns boolean
     */
    static hasTabbableShadow(element) {
        var _a, _b;
        return Array.from((_b = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('*')) !== null && _b !== void 0 ? _b : []).some(x => {
            return isTabbable(x);
        });
    }
}
__decorate([
    observable
], Dialog.prototype, "dialog", void 0);
__decorate([
    observable
], Dialog.prototype, "titleAction", void 0);
__decorate([
    observable
], Dialog.prototype, "defaultTitleAction", void 0);
__decorate([
    attr({ attribute: 'aria-describedby' })
], Dialog.prototype, "ariaDescribedby", void 0);
__decorate([
    attr({ attribute: 'aria-labelledby' })
], Dialog.prototype, "ariaLabelledby", void 0);
__decorate([
    attr({ attribute: 'modal-type' })
], Dialog.prototype, "modalType", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Dialog.prototype, "open", void 0);
__decorate([
    attr({ mode: 'boolean', attribute: 'no-title-action' })
], Dialog.prototype, "noTitleAction", void 0);
//# sourceMappingURL=dialog.js.map