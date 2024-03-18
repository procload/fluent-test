var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, css, Observable } from '@microsoft/fast-element';
import { FASTSlider } from '@microsoft/fast-foundation/slider.js';
/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export class Slider extends FASTSlider {
    handleChange(source, propertyName) {
        switch (propertyName) {
            case 'min':
            case 'max':
            case 'step':
                this.handleStepStyles();
                break;
            default:
                break;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        Observable.getNotifier(this).subscribe(this, 'max');
        Observable.getNotifier(this).subscribe(this, 'min');
        Observable.getNotifier(this).subscribe(this, 'step');
        this.handleStepStyles();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        Observable.getNotifier(this).unsubscribe(this, 'max');
        Observable.getNotifier(this).unsubscribe(this, 'min');
        Observable.getNotifier(this).unsubscribe(this, 'step');
    }
    /**
     * Handles changes to step styling based on the step value
     * NOTE: This function is not a changed callback, stepStyles is not observable
     */
    handleStepStyles() {
        if (this.step) {
            const totalSteps = (100 / Math.floor((this.max - this.min) / this.step));
            if (this.stepStyles !== undefined) {
                this.$fastController.removeStyles(this.stepStyles);
            }
            this.stepStyles = css /**css*/ `
        :host {
          --step-rate: ${totalSteps}%;
          color: blue;
        }
      `;
            this.$fastController.addStyles(this.stepStyles);
        }
        else if (this.stepStyles !== undefined) {
            this.$fastController.removeStyles(this.stepStyles);
        }
    }
}
__decorate([
    attr
], Slider.prototype, "size", void 0);
//# sourceMappingURL=slider.js.map