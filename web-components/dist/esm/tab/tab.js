import { css } from '@microsoft/fast-element';
import { FASTTab } from '@microsoft/fast-foundation/tab.js';
/**
 * Tab extends the FASTTab and is a child of the TabList
 */
export class Tab extends FASTTab {
    connectedCallback() {
        super.connectedCallback();
        if (this.styles !== undefined) {
            this.$fastController.removeStyles(this.styles);
        }
        this.styles = css /**css*/ `
      :host {
        --textContent: '${this.textContent}';
      }
    `;
        this.$fastController.addStyles(this.styles);
    }
}
//# sourceMappingURL=tab.js.map