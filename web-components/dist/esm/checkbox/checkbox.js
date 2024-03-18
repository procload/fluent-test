var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTCheckbox } from '@microsoft/fast-foundation/checkbox.js';
/**
 * The base class used for constucting a fluent checkbox custom element
 * @public
 */
export class Checkbox extends FASTCheckbox {
}
__decorate([
    attr
], Checkbox.prototype, "shape", void 0);
__decorate([
    attr
], Checkbox.prototype, "size", void 0);
__decorate([
    attr({ attribute: 'label-position' })
], Checkbox.prototype, "labelPosition", void 0);
//# sourceMappingURL=checkbox.js.map