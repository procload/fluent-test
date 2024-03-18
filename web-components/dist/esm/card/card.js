import { __decorate } from "tslib";
import { attr, css, observable, Updates } from '@microsoft/fast-element';
import { FASTCard } from '@microsoft/fast-foundation';
import { isTabbable } from 'tabbable';
import { keyEnter, keyEscape, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { CardFocusMode, CardSize } from './card.options.js';
/**
 * @class Card component
 *
 * @remarks
 * This class extends the FASTCard. a flexible content container
 */
export class Card extends FASTCard {
    constructor() {
        super(...arguments);
        this.focusMode = CardFocusMode.off;
        /**
         * @property selectable
         * @default false
         * @remarks
         * Determines whether card is selectable
         */
        this.selectable = false;
        /**
         * @property disabled
         * @default false
         * @remarks
         * Determines disabled state of card
         */
        this.disabled = false;
        /**
         * @property selected
         * @default false
         * @remarks
         * Determines selected state of card
         */
        this.selected = false;
        /**
         * @remarks
         * Reference to the floatingAction slot
         */
        this.floatingAction = [];
        /**
         * Focuses on the element at the specified index in the bounds array.
         * If the bounds array is empty, it focuses on the card itself.
         *
         * @param index - The index of the element to focus on.
         */
        this.focusElementAtIndex = (index) => {
            if (this.bounds.length > 0) {
                this.bounds[index].focus();
            }
            else {
                this.card.focus();
            }
        };
        /**
         * Focuses on the first element in the bounds array.
         * If the bounds array is empty, it focuses on the card itself.
         */
        this.focusFirstElement = () => {
            this.focusElementAtIndex(0);
        };
        /**
         * Focuses on the last element in the bounds array.
         * If the bounds array is empty, it focuses on the card itself.
         */
        this.focusLastElement = () => {
            this.focusElementAtIndex(this.bounds.length - 1);
        };
        /**
         * @method selectedChanged
         * @remarks
         * Emits an event when the selected state of the card changes
         */
        this.selectedChanged = () => {
            this.$emit('onSelectionChanged', this.selected);
        };
        /**
         * Returns the bounds of the tab queue.
         * The tab queue is a collection of elements that are focusable.
         *
         * @internal
         */
        this.getTabQueueBounds = (context) => {
            const bounds = [];
            return Card.reduceTabbableItems(bounds, context);
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.setComponent();
        this.updateComputedStylesheet();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    /**
     * Toggles the selection state of the card.
     *
     * @param checked - Optional boolean value to set the selection state.
     */
    toggleCardSelection(selected) {
        if (this.selectable) {
            if (selected) {
                this.selected = true;
            }
            else if (selected === false) {
                this.selected = false;
            }
            else {
                this.selected = !this.selected;
            }
            const checkbox = this.floatingAction[0];
            if (checkbox && checkbox.checked !== this.selected) {
                checkbox.checked = this.selected;
            }
        }
    }
    /**
     * Selects the card if it is not already selected and is selectable.
     */
    select() {
        if (!this.selected && this.selectable) {
            this.selected = true;
        }
    }
    /**
     * Unselects the card if it is not already unselected and selectable.
     */
    unselect() {
        if (!this.selected && this.selectable) {
            this.selected = true;
        }
    }
    floatingActionChangeHandler(e) {
        if (this.disabled || e.defaultPrevented || !this.selectable) {
            return;
        }
        const checkbox = this.floatingAction[0];
        this.toggleCardSelection(checkbox.checked);
        e.preventDefault();
    }
    /**
     * Handles click events on the card.
     *
     * @param e - The mouse event.
     * @returns {boolean | void} - Returns true if the card is not selectable, otherwise void.
     */
    clickHandler(e) {
        if (this.disabled || e.defaultPrevented || !this.selectable) {
            return;
        }
        this.toggleCardSelection();
        e.preventDefault();
    }
    /**
     * Handles keydown events on the card.
     *
     * @param e - The keyboard event.
     * @returns {boolean | void} - Returns true if the card is disabled, otherwise void.
     */
    keydownHandler(e) {
        if (this.disabled || e.defaultPrevented) {
            return true;
        }
        const { key, target, currentTarget, shiftKey } = e;
        const isTargetCurrent = target === currentTarget;
        const isFocusModeOffOrTabOnly = this.focusMode === CardFocusMode.off || this.focusMode === CardFocusMode.tabOnly;
        const isFocusModeOff = this.focusMode === CardFocusMode.off;
        const isLastIndexFocused = this.isBoundsLastIndexFocused;
        const isZeroIndexFocused = this.isBoundsZeroIndexFocused;
        switch (key) {
            case keyEnter:
            case keySpace:
                if (!isTargetCurrent) {
                    return true;
                }
                if (this.selectable) {
                    this.toggleCardSelection();
                }
                else if (!isFocusModeOff) {
                    Updates.enqueue(() => {
                        this.root.inert = false;
                        this.focusFirstElement();
                    });
                }
                e.preventDefault();
                break;
            case keyTab:
                if (this.shouldTrapFocus) {
                    if ((isLastIndexFocused && !shiftKey) || (isZeroIndexFocused && shiftKey)) {
                        e.preventDefault();
                        isLastIndexFocused ? this.focusFirstElement() : this.focusLastElement();
                    }
                    return true;
                }
                else if (this.focusMode === CardFocusMode.tabExit) {
                    if ((isLastIndexFocused && !shiftKey) ||
                        (isZeroIndexFocused && shiftKey) ||
                        document.activeElement === this.card) {
                        this.root.inert = !this.root.inert;
                    }
                    return true;
                }
                return true;
            case keyEscape:
                if (this.focusMode !== CardFocusMode.off) {
                    this.card.focus();
                }
                if (!isFocusModeOffOrTabOnly) {
                    this.root.inert = true;
                }
                e.preventDefault();
            default:
                return true;
        }
    }
    /**
     * Determines if the card is focusable.
     * @returns {boolean} - True if the card is focusable, false otherwise.
     */
    get isFocusable() {
        return !this.disabled && this.focusMode !== 'off';
    }
    /**
     * Returns the bounds of the tab queue.
     * The tab queue is a collection of elements that are focusable.
     *
     * @returns {(HTMLElement | SVGElement)[]} - The bounds of the tab queue.
     */
    get bounds() {
        return this.getTabQueueBounds(this);
    }
    /**
     * Checks if the first element in the tab queue is focused.
     *
     * @returns {boolean} - True if the first element in the tab queue is focused, false otherwise.
     */
    get isBoundsZeroIndexFocused() {
        return document.activeElement === this.bounds[0];
    }
    /**
     * Checks if the last element in the tab queue is focused.
     *
     * @returns {boolean} - True if the last element in the tab queue is focused, false otherwise.
     */
    get isBoundsLastIndexFocused() {
        return document.activeElement === this.bounds[this.bounds.length - 1];
    }
    /**
     * Determines if focus should be trapped within the card.
     *
     * @internal
     */
    get shouldTrapFocus() {
        return this.focusMode === CardFocusMode.noTab;
    }
    /**
     * @method sizeChanged
     * @remarks
     * Updates the computed stylesheet when the size of the card changes
     */
    sizeChanged() {
        this.updateComputedStylesheet();
    }
    /**
     * Sets the component's properties based on the focus mode.
     * If the focus mode is 'no-tab' or 'tab-exit', the root element's inert property is set to true.
     * @private
     */
    setComponent() {
        if ((this.focusMode !== CardFocusMode.off && this.focusMode !== CardFocusMode.tabOnly) || this.disabled) {
            this.root.inert = true;
        }
    }
    /**
     * Updates an internal stylesheet with calculated CSS custom properties.
     *
     * @internal
     */
    updateComputedStylesheet() {
        let sizeValue;
        switch (this.size) {
            case CardSize.small:
                sizeValue = '8px';
                break;
            case CardSize.medium:
                sizeValue = '12px';
                break;
            case CardSize.large:
                sizeValue = '16px';
                break;
            default:
                sizeValue = '12px';
                break;
        }
        this.computedStylesheet = css `
      :host {
        --card-size: ${sizeValue};
      }
    `;
        this.$fastController.addStyles(this.computedStylesheet);
    }
    /**
     * Reduce a collection to only its focusable elements.
     *
     * @internal
     */
    static reduceTabbableItems(elements, element) {
        if (element.getAttribute('tabindex') === '-1') {
            return elements;
        }
        if (isTabbable(element) || (Card.isFocusableFastElement(element) && Card.hasTabbableShadow(element))) {
            elements.push(element);
            return elements;
        }
        return Array.from(element.children).reduce((elements, currentElement) => Card.reduceTabbableItems(elements, currentElement), elements);
    }
    /**
     * Test if element is focusable fast element
     *
     * @internal
     */
    static isFocusableFastElement(element) {
        var _a, _b;
        return !!((_b = (_a = element.$fastController) === null || _a === void 0 ? void 0 : _a.definition.shadowOptions) === null || _b === void 0 ? void 0 : _b.delegatesFocus);
    }
    /**
     * Test if the element has a focusable shadow
     *
     * @internal
     */
    static hasTabbableShadow(element) {
        var _a, _b;
        return Array.from((_b = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('*')) !== null && _b !== void 0 ? _b : []).some(x => {
            return isTabbable(x);
        });
    }
}
__decorate([
    observable,
    attr({ attribute: 'focus-mode' })
], Card.prototype, "focusMode", void 0);
__decorate([
    attr
], Card.prototype, "appearance", void 0);
__decorate([
    attr
], Card.prototype, "orientation", void 0);
__decorate([
    attr({ attribute: 'size' })
], Card.prototype, "size", void 0);
__decorate([
    observable,
    attr({ mode: 'boolean' })
], Card.prototype, "selectable", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Card.prototype, "disabled", void 0);
__decorate([
    observable,
    attr({ mode: 'boolean' })
], Card.prototype, "selected", void 0);
__decorate([
    attr({ attribute: 'aria-describedby' })
], Card.prototype, "ariaDescribedby", void 0);
__decorate([
    attr({ attribute: 'aria-labelledby' })
], Card.prototype, "ariaLabelledby", void 0);
__decorate([
    observable
], Card.prototype, "floatingAction", void 0);
//# sourceMappingURL=card.js.map