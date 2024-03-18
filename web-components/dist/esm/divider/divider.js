var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTDivider } from '@microsoft/fast-foundation/divider.js';
/**
 * @class Divider component
 *
 * @remarks
 * This class extends the FASTDivider. A divider groups sections of content to create visual rhythm and hierarchy. Use dividers along with spacing and headers to organize content in your layout.
 */
export class Divider extends FASTDivider {
}
__decorate([
    attr({ attribute: 'align-content' })
], Divider.prototype, "alignContent", void 0);
__decorate([
    attr
], Divider.prototype, "appearance", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Divider.prototype, "inset", void 0);
//# sourceMappingURL=divider.js.map