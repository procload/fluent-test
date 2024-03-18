import { html } from '@microsoft/fast-element';
/**
 * The template for the Fluent Card Preview web-component.
 * @public
 */
export function cardPreviewTemplate() {
    return html `
    <template>
      <slot></slot>
      <slot name="logo"></slot>
    </template>
  `;
}
export const template = cardPreviewTemplate();
//# sourceMappingURL=card-preview.template.js.map