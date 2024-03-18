import { FASTProgress } from '@microsoft/fast-foundation/progress.js';
import type { ProgressBarShape, ProgressBarThickness, ProgressBarValidationState } from './progress-bar.options.js';
/**
 * The base class used for constructing a fluent-progress-bar custom element
 * @public
 */
export declare class ProgressBar extends FASTProgress {
    /**
     * The thickness of the progress bar
     *
     * @public
     * @remarks
     * HTML Attribute: thickness
     */
    thickness?: ProgressBarThickness;
    /**
     * The shape of the progress bar
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: ProgressBarShape;
    /**
     * The validation state of the progress bar
     * @public
     * @remarks
     * HTML Attribute: validation-state
     */
    validationState: ProgressBarValidationState | null;
}
