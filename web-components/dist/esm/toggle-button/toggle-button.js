var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, observable } from '@microsoft/fast-element';
import { Button } from '../button/button.js';
/**
 * The base class used for constructing a fluent-toggle-button custom element
 * @public
 */
export class ToggleButton extends Button {
    constructor() {
        super();
        /**
         * Tracks whether the "checked" property has been changed.
         * This is necessary to provide consistent behavior with
         * normal input checkboxes
         */
        this.dirtyChecked = false;
        /**
         * Provides the default checkedness of the input element
         * Passed down to proxy
         *
         * @public
         * @remarks
         * HTML Attribute: checked
         */
        this.checkedAttribute = false;
        this.defaultChecked = false;
        /**
         * The checked state of the control.
         *
         * @public
         */
        this.checked = false;
        /**
         * The current checkedness of the element. This property serves as a mechanism
         * to set the `checked` property through both property assignment and the
         * .setAttribute() method. This is useful for setting the field's checkedness
         * in UI libraries that bind data through the .setAttribute() API
         * and don't support IDL attribute binding.
         */
        this.currentChecked = false;
        /**
         * @internal
         */
        this.handleToggleButtonClick = (e) => {
            if (!this.disabled && !this.disabledFocusable) {
                this.checked = !this.checked;
            }
        };
        // Re-initialize dirtyChecked because initialization of other values
        // causes it to become true
        this.dirtyChecked = false;
    }
    checkedAttributeChanged() {
        this.defaultChecked = this.checkedAttribute;
    }
    defaultCheckedChanged() {
        if (!this.dirtyChecked) {
            // Setting this.checked will cause us to enter a dirty state,
            // but if we are clean when defaultChecked is changed, we want to stay
            // in a clean state, so reset this.dirtyChecked
            this.checked = this.defaultChecked;
            this.dirtyChecked = false;
        }
    }
    checkedChanged(prev, next) {
        if (!this.$fastController.isConnected) {
            return;
        }
        if (!this.dirtyChecked) {
            this.dirtyChecked = true;
        }
        this.currentChecked = this.checked;
        this.setAttribute('aria-pressed', `${this.currentChecked}`);
        if (prev !== undefined) {
            this.$emit('change');
        }
    }
    currentCheckedChanged(prev, next) {
        this.checked = this.currentChecked;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.handleToggleButtonClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleToggleButtonClick);
    }
}
__decorate([
    attr({ attribute: 'checked', mode: 'boolean' })
], ToggleButton.prototype, "checkedAttribute", void 0);
__decorate([
    observable
], ToggleButton.prototype, "defaultChecked", void 0);
__decorate([
    observable
], ToggleButton.prototype, "checked", void 0);
__decorate([
    attr({ attribute: 'current-checked', mode: 'boolean' })
], ToggleButton.prototype, "currentChecked", void 0);
//# sourceMappingURL=toggle-button.js.map