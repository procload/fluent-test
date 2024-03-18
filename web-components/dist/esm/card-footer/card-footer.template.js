import { html } from '@microsoft/fast-element';
/**
 * The template for the Fluent Card Footer web-component.
 * @public
 */
export function cardFooterTemplate() {
    return html `
    <template>
      <div class="content" part="content">
        <slot></slot>
      </div>
      <div class="action">
        <slot name="action"></slot>
      </div>
    </template>
  `;
}
export const template = cardFooterTemplate();
//# sourceMappingURL=card-footer.template.js.map