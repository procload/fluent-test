var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement } from '@microsoft/fast-element';
/**
 * The base class used for constructing a fluent-label custom element
 * @public
 */
export class Label extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * 	Specifies styles for label when associated input is disabled
         *
         * @public
         * @remarks
         * HTML Attribute: disabled
         */
        this.disabled = false;
        /**
         * 	Specifies styles for label when associated input is a required field
         *
         * @public
         * @remarks
         * HTML Attribute: required
         */
        this.required = false;
    }
}
__decorate([
    attr
], Label.prototype, "size", void 0);
__decorate([
    attr
], Label.prototype, "weight", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Label.prototype, "disabled", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Label.prototype, "required", void 0);
//# sourceMappingURL=label.js.map