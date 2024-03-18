var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement } from '@microsoft/fast-element';
import { StartEnd } from '@microsoft/fast-foundation/patterns.js';
// TODO: Remove with https://github.com/microsoft/fast/pull/6797
import { applyMixins } from '../utils/apply-mixins.js';
import { BadgeAppearance, BadgeColor } from './badge.options.js';
/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export class Badge extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The appearance the badge should have.
         *
         * @public
         * @remarks
         * HTML Attribute: appearance
         */
        this.appearance = BadgeAppearance.filled;
        /**
         * The color the badge should have.
         *
         * @public
         * @remarks
         * HTML Attribute: color
         */
        this.color = BadgeColor.brand;
    }
}
__decorate([
    attr
], Badge.prototype, "appearance", void 0);
__decorate([
    attr
], Badge.prototype, "color", void 0);
__decorate([
    attr
], Badge.prototype, "shape", void 0);
__decorate([
    attr
], Badge.prototype, "size", void 0);
applyMixins(Badge, StartEnd);
//# sourceMappingURL=badge.js.map