import { progressRingTemplate } from '@microsoft/fast-foundation/progress-ring.js';
export const template = progressRingTemplate({
    indeterminateIndicator: `
    <svg class="progress" part="progress" viewBox="0 0 16 16">
        <circle
            class="background"
            part="background"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
        <circle
            class="indeterminate-indicator-1"
            part="indeterminate-indicator-1"
            cx="8px"
            cy="8px"
            r="7px"
        ></circle>
    </svg>
  `,
});
//# sourceMappingURL=spinner.template.js.map