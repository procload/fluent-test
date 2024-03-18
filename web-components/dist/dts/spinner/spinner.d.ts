import { FASTProgressRing } from '@microsoft/fast-foundation/progress-ring.js';
import type { SpinnerAppearance, SpinnerSize } from './spinner.options.js';
/**
 * The base class used for constructing a fluent-spinner custom element
 * @public
 */
export declare class Spinner extends FASTProgressRing {
    /**
     * The size of the spinner
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: size
     */
    size?: SpinnerSize;
    /**
     * The appearance of the spinner
     * @public
     * @default 'primary'
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: SpinnerAppearance;
}
