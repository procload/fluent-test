import { css } from '@microsoft/fast-element';
/** Menu styles
 * @public
 */
export const styles = css `
  :host {
    position: relative;
    z-index: var(--z-index-menu, 1);
  }
  .positioning-container {
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
`;
//# sourceMappingURL=menu.styles.js.map