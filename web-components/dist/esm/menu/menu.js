var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition, flip, hide, size } from '@floating-ui/dom';
import { keyEnter, keyEscape, keySpace, keyTab } from '@microsoft/fast-web-utilities';
/**
 * The Menu class represents a menu component.
 * @public
 */
export class Menu extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Determines if the menu should open on hover.
         * @public
         */
        this.openOnHover = false;
        /**
         * Determines if the menu should open on right click.
         * @public
         */
        this.openOnContext = false;
        /**
         * Determines if the menu should close on scroll.
         * @public
         */
        this.closeOnScroll = false;
        /**
         * Determines if the menu open state should persis on click of menu item
         * @public
         */
        this.persistOnItemClick = false;
        /**
         * Defines whether the menu is open or not.
         * @public
         */
        this.open = false;
        /**
         * Holds the slotted menu list.
         * @public
         */
        this.slottedMenuList = [];
        /**
         * Holds the slotted triggers.
         * @public
         */
        this.slottedTriggers = [];
        /**
         * Toggles the open state of the menu.
         * @public
         */
        this.toggleMenu = () => {
            if (this.open) {
                this.closeMenu();
            }
            else {
                this.openMenu();
            }
        };
        /**
         * Closes the menu.
         * @public
         */
        this.closeMenu = () => {
            this.open = false;
            if (this.closeOnScroll) {
                document.removeEventListener('scroll', this.closeMenu);
            }
        };
        /**
         * Opens the menu.
         * @public
         */
        this.openMenu = (e) => {
            this.open = true;
            if (e && this.openOnContext) {
                e.preventDefault();
            }
            if (this.closeOnScroll) {
                document.addEventListener('scroll', this.closeMenu);
            }
        };
        /**
         * The task to set the positioning of the menu.
         * @protected
         */
        this.setPositioningTask = () => {
            this.setPositioning();
        };
        /**
         * Handles keyboard interaction for the trigger.
         * Toggles the menu when the Space or Enter key is pressed.
         * If the menu is open, focuses on the menu list.
         * @public
         * @param {KeyboardEvent} e - the keyboard event
         */
        this.handleTriggerKeydown = (e) => {
            if (e.defaultPrevented) {
                return;
            }
            const key = e.key;
            switch (key) {
                case keySpace:
                case keyEnter:
                    e.preventDefault();
                    this.toggleMenu();
                    if (this.open) {
                        this.focusMenuList();
                    }
                    break;
                default:
                    return true;
            }
        };
        /**
         * Handles document click events to close the menu when a click occurs outside of the menu or the trigger.
         * @private
         * @param {Event} e - The event triggered on document click.
         */
        this.handleDocumentClick = (e) => {
            if (e && !e.composedPath().includes(this._menuList) && !e.composedPath().includes(this._trigger)) {
                this.closeMenu();
            }
        };
    }
    /**
     * Called when the element is connected to the DOM.
     * Sets up the component.
     * @public
     */
    connectedCallback() {
        super.connectedCallback();
        Updates.enqueue(() => this.setComponent());
    }
    /**
     * Called when the element is disconnected from the DOM.
     * Removes event listeners.
     * @public
     */
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        this.removeListeners();
    }
    /**
     * Sets the component.
     * Sets the trigger and menu list elements and adds event listeners.
     * @public
     */
    setComponent() {
        if (this.$fastController.isConnected && this.slottedMenuList.length && this.slottedTriggers.length) {
            this._trigger = this.slottedTriggers[0];
            this._menuList = this.slottedMenuList[0];
            this._trigger.setAttribute('aria-haspopup', 'true');
            this._trigger.setAttribute('aria-expanded', `${this.open}`);
            this.addListeners();
        }
    }
    /**
     * Focuses on the menu list.
     * @public
     */
    focusMenuList() {
        if (this.open && this._menuList) {
            Updates.enqueue(() => {
                this._menuList.focus();
            });
        }
    }
    /**
     * Focuses on the menu trigger.
     * @public
     */
    focusTrigger() {
        if (!this.open && this._trigger) {
            Updates.enqueue(() => {
                this._trigger.focus();
            });
        }
    }
    /**
     * Called whenever the open state changes.
     * Updates the 'aria-expanded' attribute and sets the positioning of the menu.
     * Sets menu list position
     * emits openChanged event
     * @public
     * @param {boolean} oldValue - The previous value of 'open'.
     * @param {boolean} newValue - The new value of 'open'.
     */
    openChanged(oldValue, newValue) {
        var _a;
        if (this.$fastController.isConnected && this._trigger instanceof HTMLElement) {
            this._trigger.setAttribute('aria-expanded', `${this.open}`);
            if (this._menuList && this.open) {
                Updates.enqueue(this.setPositioningTask);
            }
        }
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        this.$emit('onOpenChange', { open: newValue });
    }
    /**
     * Called whenever the 'openOnHover' property changes.
     * Adds or removes a 'mouseover' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'openOnHover'.
     * @param {boolean} newValue - The new value of 'openOnHover'.
     */
    openOnHoverChanged(oldValue, newValue) {
        var _a, _b;
        if (newValue) {
            (_a = this._trigger) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseover', this.openMenu);
        }
        else {
            (_b = this._trigger) === null || _b === void 0 ? void 0 : _b.removeEventListener('mouseover', this.openMenu);
        }
    }
    /**
     * Called whenever the 'persistOnItemClick' property changes.
     * Adds or removes a 'click' event listener to the menu list based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'persistOnItemClick'.
     * @param {boolean} newValue - The new value of 'persistOnItemClick'.
     */
    persistOnItemClickChanged(oldValue, newValue) {
        var _a, _b;
        if (!newValue) {
            (_a = this._menuList) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.closeMenu);
        }
        else {
            (_b = this._menuList) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.closeMenu);
        }
    }
    /**
     * Called whenever the 'openOnContext' property changes.
     * Adds or removes a 'contextmenu' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'openOnContext'.
     * @param {boolean} newValue - The new value of 'openOnContext'.
     */
    openOnContextChanged(oldValue, newValue) {
        var _a, _b;
        if (newValue) {
            (_a = this._trigger) === null || _a === void 0 ? void 0 : _a.addEventListener('contextmenu', this.openMenu);
        }
        else {
            (_b = this._trigger) === null || _b === void 0 ? void 0 : _b.removeEventListener('contextmenu', this.openMenu);
        }
    }
    /**
     * Called whenever the 'closeOnScroll' property changes.
     * Adds or removes a 'closeOnScroll' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'closeOnScroll'.
     * @param {boolean} newValue - The new value of 'closeOnScroll'.
     */
    closeOnScrollChanged(oldValue, newValue) {
        if (newValue) {
            document.addEventListener('scroll', this.closeMenu);
        }
        else {
            document.removeEventListener('scroll', this.closeMenu);
        }
    }
    /**
     * Sets the positioning of the menu.
     * @protected
     */
    setPositioning() {
        if (this.$fastController.isConnected && this._menuList && this.open && this._trigger) {
            this.cleanup = autoUpdate(this, this.positioningContainer, async () => {
                var _a, _b;
                const { middlewareData, x, y } = await computePosition(this._trigger, this.positioningContainer, {
                    placement: 'bottom',
                    strategy: 'fixed',
                    middleware: [
                        flip(),
                        size({
                            apply: ({ availableHeight, rects }) => {
                                var _a;
                                ((_a = this.positioningContainer) === null || _a === void 0 ? void 0 : _a.style) &&
                                    Object.assign(this.positioningContainer.style, {
                                        maxHeight: `${availableHeight}px`,
                                        width: `${rects.reference.width}px`,
                                    });
                            },
                        }),
                        hide(),
                    ],
                });
                if ((_a = middlewareData.hide) === null || _a === void 0 ? void 0 : _a.referenceHidden) {
                    this.open = false;
                    return;
                }
                ((_b = this.positioningContainer) === null || _b === void 0 ? void 0 : _b.style) &&
                    Object.assign(this.positioningContainer.style, {
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        transform: `translate(${x}px, ${y}px)`,
                    });
            });
        }
    }
    /**
     * Adds event listeners.
     * Adds click and keydown event listeners to the trigger and a click event listener to the document.
     * If 'openOnHover' is true, adds a 'mouseover' event listener to the trigger.
     * @public
     */
    addListeners() {
        var _a, _b, _c, _d, _e;
        document.addEventListener('click', this.handleDocumentClick);
        (_a = this._trigger) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', this.handleTriggerKeydown);
        if (!this.persistOnItemClick) {
            (_b = this._menuList) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.closeMenu);
        }
        if (this.openOnHover) {
            (_c = this._trigger) === null || _c === void 0 ? void 0 : _c.addEventListener('mouseover', this.openMenu);
        }
        else if (this.openOnContext) {
            (_d = this._trigger) === null || _d === void 0 ? void 0 : _d.addEventListener('contextmenu', this.openMenu);
        }
        else {
            (_e = this._trigger) === null || _e === void 0 ? void 0 : _e.addEventListener('click', this.toggleMenu);
        }
    }
    /**
     * Removes event listeners.
     * Removes click and keydown event listeners from the trigger and a click event listener from the document.
     * Also removes 'mouseover' event listeners from the trigger.
     * @private
     */
    removeListeners() {
        var _a, _b, _c, _d, _e;
        document.removeEventListener('click', this.handleDocumentClick);
        (_a = this._trigger) === null || _a === void 0 ? void 0 : _a.removeEventListener('keydown', this.handleTriggerKeydown);
        if (!this.persistOnItemClick) {
            (_b = this._menuList) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.closeMenu);
        }
        if (this.openOnHover) {
            (_c = this._trigger) === null || _c === void 0 ? void 0 : _c.removeEventListener('mouseover', this.openMenu);
        }
        if (this.openOnContext) {
            (_d = this._trigger) === null || _d === void 0 ? void 0 : _d.removeEventListener('contextmenu', this.openMenu);
        }
        else {
            (_e = this._trigger) === null || _e === void 0 ? void 0 : _e.removeEventListener('click', this.toggleMenu);
        }
    }
    /**
     * Handles keyboard interaction for the menu.
     * Closes the menu and focuses on the trigger when the Escape key is pressed.
     * Closes the menu when the Tab key is pressed.
     * @public
     * @param {KeyboardEvent} e - the keyboard event
     */
    handleMenuKeydown(e) {
        if (e.defaultPrevented) {
            return;
        }
        const key = e.key;
        switch (key) {
            case keyEscape:
                e.preventDefault();
                if (this.open) {
                    this.closeMenu();
                    this.focusTrigger();
                }
                break;
            case keyTab:
                if (this.open) {
                    this.closeMenu();
                }
                if (e.shiftKey) {
                    this.focusTrigger();
                }
            default:
                return true;
        }
    }
}
__decorate([
    observable,
    attr({ attribute: 'open-on-hover', mode: 'boolean' })
], Menu.prototype, "openOnHover", void 0);
__decorate([
    observable,
    attr({ attribute: 'open-on-context', mode: 'boolean' })
], Menu.prototype, "openOnContext", void 0);
__decorate([
    observable,
    attr({ attribute: 'close-on-scroll', mode: 'boolean' })
], Menu.prototype, "closeOnScroll", void 0);
__decorate([
    observable,
    attr({ attribute: 'persist-on-item-click', mode: 'boolean' })
], Menu.prototype, "persistOnItemClick", void 0);
__decorate([
    observable,
    attr({ mode: 'boolean' })
], Menu.prototype, "open", void 0);
__decorate([
    observable
], Menu.prototype, "slottedMenuList", void 0);
__decorate([
    observable
], Menu.prototype, "slottedTriggers", void 0);
//# sourceMappingURL=menu.js.map