var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTAnchor } from '@microsoft/fast-foundation/anchor.js';
/**
 * The base class used for constructing a fluent-anchor-button custom element
 * @public
 */
export class AnchorButton extends FASTAnchor {
    constructor() {
        super(...arguments);
        /**
         * The anchor button has an icon only, no text content
         *
         * @public
         * @remarks
         * HTML Attribute: icon-only
         */
        this.iconOnly = false;
        /**
         * The anchor button is disabled
         *
         * @public
         * @remarks
         * HTML Attribute: disabled-focusable
         */
        this.disabled = false;
        /**
         * The anchor button is disabled but focusable
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
            if ((e && this.disabled) || this.disabledFocusable) {
                e.stopImmediatePropagation();
                return;
            }
        };
    }
    disabledChanged(prev, next) {
        if (this.disabled) {
            this.setAttribute('aria-disabled', 'true');
            this.setAttribute('tabindex', '-1');
        }
        else {
            this.removeAttribute('aria-disabled');
            this.removeAttribute('tabindex');
        }
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
], AnchorButton.prototype, "appearance", void 0);
__decorate([
    attr
], AnchorButton.prototype, "shape", void 0);
__decorate([
    attr
], AnchorButton.prototype, "size", void 0);
__decorate([
    attr({ attribute: 'icon-only', mode: 'boolean' })
], AnchorButton.prototype, "iconOnly", void 0);
__decorate([
    attr({ mode: 'boolean' })
], AnchorButton.prototype, "disabled", void 0);
__decorate([
    attr({ attribute: 'disabled-focusable', mode: 'boolean' })
], AnchorButton.prototype, "disabledFocusable", void 0);
//# sourceMappingURL=anchor-button.js.map