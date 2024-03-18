var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr } from '@microsoft/fast-element';
import { FASTProgress } from '@microsoft/fast-foundation/progress.js';
/**
 * The base class used for constructing a fluent-progress-bar custom element
 * @public
 */
export class ProgressBar extends FASTProgress {
    constructor() {
        super(...arguments);
        /**
         * The validation state of the progress bar
         * @public
         * @remarks
         * HTML Attribute: validation-state
         */
        this.validationState = null;
    }
}
__decorate([
    attr
], ProgressBar.prototype, "thickness", void 0);
__decorate([
    attr
], ProgressBar.prototype, "shape", void 0);
__decorate([
    attr({ attribute: 'validation-state' })
], ProgressBar.prototype, "validationState", void 0);
//# sourceMappingURL=progress-bar.js.map