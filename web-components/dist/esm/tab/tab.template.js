import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation/patterns.js';
import { html } from '@microsoft/fast-element';
export function tabTemplate(options = {}) {
    return html `
    <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
      ${startSlotTemplate(options)}
      <span class="tab-content"><slot></slot></span>
      ${endSlotTemplate(options)}
    </template>
  `;
}
export const template = tabTemplate({});
//# sourceMappingURL=tab.template.js.map