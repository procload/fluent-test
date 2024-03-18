var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { getInitials } from '../utils/get-initials.js';
import { AvatarColor, AvatarNamedColor, } from './avatar.options.js';
/**
 * The base class used for constructing a fluent-avatar custom element
 * @public
 */
export class Avatar extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The color when displaying either an icon or initials.
         * * neutral (default): gray
         * * brand: color from the brand palette
         * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or colorId if provided)
         * * [AvatarNamedColor]: a specific color from the theme
         *
         * @public
         * @remarks
         * HTML Attribute: color
         */
        this.color = 'neutral';
    }
    /**
     * Sets the data-color attribute used for the visual presentation
     * @internal
     */
    generateColor() {
        var _a, _b;
        if (!this.color) {
            return;
        }
        return this.color === AvatarColor.colorful
            ? Avatar.colors[getHashCode((_b = (_a = this.colorId) !== null && _a !== void 0 ? _a : this.name) !== null && _b !== void 0 ? _b : '') % Avatar.colors.length]
            : this.color;
    }
    /**
     * Generates and sets the initials for the template
     * @internal
     */
    generateInitials() {
        var _a, _b;
        if (!this.name && !this.initials) {
            return;
        }
        // size can be undefined since we default it in CSS only
        const size = (_a = this.size) !== null && _a !== void 0 ? _a : 32;
        return ((_b = this.initials) !== null && _b !== void 0 ? _b : getInitials(this.name, window.getComputedStyle(this).direction === 'rtl', {
            firstInitialOnly: size <= 16,
        }));
    }
}
/**
 * An array of the available Avatar named colors
 */
Avatar.colors = Object.values(AvatarNamedColor);
__decorate([
    attr
], Avatar.prototype, "name", void 0);
__decorate([
    attr
], Avatar.prototype, "initials", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], Avatar.prototype, "size", void 0);
__decorate([
    attr
], Avatar.prototype, "shape", void 0);
__decorate([
    attr
], Avatar.prototype, "active", void 0);
__decorate([
    attr
], Avatar.prototype, "appearance", void 0);
__decorate([
    attr
], Avatar.prototype, "color", void 0);
__decorate([
    attr({ attribute: 'color-id' })
], Avatar.prototype, "colorId", void 0);
// copied from React avatar
const getHashCode = (str) => {
    let hashCode = 0;
    for (let len = str.length - 1; len >= 0; len--) {
        const ch = str.charCodeAt(len);
        const shift = len % 8;
        hashCode ^= (ch << shift) + (ch >> (8 - shift)); // eslint-disable-line no-bitwise
    }
    return hashCode;
};
//# sourceMappingURL=avatar.js.map