var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTTextField } from '@microsoft/fast-foundation/text-field.js';
/**
 * The base class used for constructing a fluent-text-input custom element
 * @public
 */
export class TextInput extends FASTTextField {
}
__decorate([
    attr({ attribute: 'control-size' })
], TextInput.prototype, "controlSize", void 0);
__decorate([
    attr
], TextInput.prototype, "appearance", void 0);
//# sourceMappingURL=text-input.js.map