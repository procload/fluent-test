import { html } from '@microsoft/fast-element';
/**
 * The template for the Fluent Card Header web-component.
 * @public
 */
export function cardHeaderTemplate() {
    return html `
    <template>
      <slot name="start"></slot>
      <slot name="image"></slot>
      <div class="header">
        <slot name="header"></slot>
        <slot name="description"></slot>
      </div>
      <slot></slot>
      <slot name="action"></slot>
      <slot name="end"></slot>
    </template>
  `;
}
export const template = cardHeaderTemplate();
//# sourceMappingURL=card-header.template.js.map