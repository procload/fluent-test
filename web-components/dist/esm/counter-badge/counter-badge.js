var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, FASTElement, nullableNumberConverter } from '@microsoft/fast-element';
import { StartEnd } from '@microsoft/fast-foundation/patterns.js';
// TODO: Remove with https://github.com/microsoft/fast/pull/6797
import { applyMixins } from '../utils/apply-mixins.js';
/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export class CounterBadge extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The count the badge should have.
         *
         * @public
         * @remarks
         * HTML Attribute: count
         */
        this.count = 0;
        /**
         * Max number to be displayed
         *
         * @public
         * @remarks
         * HTML Attribute: overflow-count
         */
        this.overflowCount = 99;
        /**
         * If the badge should be shown when count is 0
         *
         * @public
         * @remarks
         * HTML Attribute: show-zero
         */
        this.showZero = false;
        /**
         * If a dot should be displayed without the count
         *
         * @public
         * @remarks
         * HTML Attribute: dot
         */
        this.dot = false;
    }
    countChanged() {
        this.setCount();
    }
    overflowCountChanged() {
        this.setCount();
    }
    /**
     * @internal
     * Function to set the count
     * This is the default slotted content for the counter badge
     * If children are slotted, that will override the value returned
     */
    setCount() {
        var _a;
        const count = (_a = this.count) !== null && _a !== void 0 ? _a : 0;
        if ((count !== 0 || this.showZero) && !this.dot) {
            return count > this.overflowCount ? `${this.overflowCount}+` : `${count}`;
        }
        return;
    }
}
__decorate([
    attr
], CounterBadge.prototype, "appearance", void 0);
__decorate([
    attr
], CounterBadge.prototype, "color", void 0);
__decorate([
    attr
], CounterBadge.prototype, "shape", void 0);
__decorate([
    attr
], CounterBadge.prototype, "size", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], CounterBadge.prototype, "count", void 0);
__decorate([
    attr({ attribute: 'overflow-count', converter: nullableNumberConverter })
], CounterBadge.prototype, "overflowCount", void 0);
__decorate([
    attr({ attribute: 'show-zero', mode: 'boolean' })
], CounterBadge.prototype, "showZero", void 0);
__decorate([
    attr({ mode: 'boolean' })
], CounterBadge.prototype, "dot", void 0);
applyMixins(CounterBadge, StartEnd);
//# sourceMappingURL=counter-badge.js.map