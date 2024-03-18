var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTAccordionItem } from '@microsoft/fast-foundation/accordion-item.js';
/**
 * @internal
 */
export class AccordionItem extends FASTAccordionItem {
    constructor() {
        super(...arguments);
        /**
         * Sets the width of the focus state.
         *
         * @public
         * @remarks
         * HTML Attribute: block
         */
        this.block = false;
    }
}
__decorate([
    attr
], AccordionItem.prototype, "size", void 0);
__decorate([
    attr({ mode: 'boolean' })
], AccordionItem.prototype, "block", void 0);
__decorate([
    attr({ attribute: 'expand-icon-position' })
], AccordionItem.prototype, "expandIconPosition", void 0);
//# sourceMappingURL=accordion-item.js.map