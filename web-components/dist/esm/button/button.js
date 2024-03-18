var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTButton } from '@microsoft/fast-foundation/button.js';
/**
 * The base class used for constructing a fluent-button custom element
 * @public
 */
export class Button extends FASTButton {
    constructor() {
        super(...arguments);
        /**
         * The button has an icon only, no text content
         *
         * @public
         * @remarks
         * HTML Attribute: icon-only
         */
        this.iconOnly = false;
        /**
         * The button is disabled but focusable
         *
         * @public
         * @remarks
         * HTML Attribute: disabled-focusable
         */
        this.disabledFocusable = false;
        /**
         * Prevents disabledFocusable click events
         */
        this.handleDisabledFocusableClick = (e) => {
            if (e && this.disabledFocusable) {
                e.stopImmediatePropagation();
                return;
            }
        };
    }
    disabledFocusableChanged(prev, next) {
        if (!this.$fastController.isConnected) {
            return;
        }
        if (this.disabledFocusable) {
            this.setAttribute('aria-disabled', 'true');
        }
        else {
            this.removeAttribute('aria-disabled');
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.handleDisabledFocusableClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleDisabledFocusableClick);
    }
}
__decorate([
    attr
], Button.prototype, "appearance", void 0);
__decorate([
    attr
], Button.prototype, "shape", void 0);
__decorate([
    attr
], Button.prototype, "size", void 0);
__decorate([
    attr({ attribute: 'icon-only', mode: 'boolean' })
], Button.prototype, "iconOnly", void 0);
__decorate([
    attr({ attribute: 'disabled-focusable', mode: 'boolean' })
], Button.prototype, "disabledFocusable", void 0);
//# sourceMappingURL=button.js.map