var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement } from '@microsoft/fast-element';
/**
 * The base class used for constructing a fluent-text custom element
 * @public
 */
export class Text extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The text will not wrap
         * NOTE: In Fluent UI React v9 this is "wrap"
         * Boolean attributes which default to true in HTML can't be switched off in the DOM
         *
         * @public
         * @remarks
         * HTML Attribute: nowrap
         */
        this.nowrap = false;
        /**
         * The text truncates
         *
         * @public
         * @remarks
         * HTML Attribute: truncate
         */
        this.truncate = false;
        /**
         * The text style is italic
         *
         * @public
         * @remarks
         * HTML Attribute: italic
         */
        this.italic = false;
        /**
         * The text style is underline
         *
         * @public
         * @remarks
         * HTML Attribute: underline
         */
        this.underline = false;
        /**
         * The text style is strikethrough
         *
         * @public
         * @remarks
         * HTML Attribute: strikethrough
         */
        this.strikethrough = false;
        /**
         * An text can take up the width of its container.
         *
         * @public
         * @remarks
         * HTML Attribute: block
         */
        this.block = false;
    }
}
__decorate([
    attr({ mode: 'boolean' })
], Text.prototype, "nowrap", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Text.prototype, "truncate", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Text.prototype, "italic", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Text.prototype, "underline", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Text.prototype, "strikethrough", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Text.prototype, "block", void 0);
__decorate([
    attr
], Text.prototype, "size", void 0);
__decorate([
    attr
], Text.prototype, "font", void 0);
__decorate([
    attr
], Text.prototype, "weight", void 0);
__decorate([
    attr
], Text.prototype, "align", void 0);
//# sourceMappingURL=text.js.map