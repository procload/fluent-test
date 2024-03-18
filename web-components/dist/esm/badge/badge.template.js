import { html } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '@microsoft/fast-foundation/patterns.js';
import { staticallyCompose } from '@microsoft/fast-foundation/utilities.js';
/**
 * The template for the Badge component.
 * @public
 */
export function badgeTemplate(options = {}) {
    return html `
    ${startSlotTemplate(options)}
    <slot>${staticallyCompose(options.defaultContent)}</slot>
    ${endSlotTemplate(options)}
  `;
}
export const template = badgeTemplate();
//# sourceMappingURL=badge.template.js.map