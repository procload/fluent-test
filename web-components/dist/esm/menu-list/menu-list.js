import { FASTMenu } from '@microsoft/fast-foundation/menu.js';
import { MenuItem, MenuItemRole } from '../menu-item/index.js';
/**
 * The base class used for constructing a fluent-menu-list custom element
 * @public
 */
export class MenuList extends FASTMenu {
    setItems() {
        var _a;
        super.setItems();
        /**
         * Set the indent attribute on MenuItem elements based on their
         * position in the MenuList. Each MenuItem element has a data-indent attribute that is
         * used to set the indent of the element's start slot content.
         */
        const filteredMenuListItems = (_a = this.menuItems) === null || _a === void 0 ? void 0 : _a.filter(this.isMenuItemElement);
        filteredMenuListItems === null || filteredMenuListItems === void 0 ? void 0 : filteredMenuListItems.forEach((item, index) => {
            const indent = filteredMenuListItems === null || filteredMenuListItems === void 0 ? void 0 : filteredMenuListItems.reduce((accum, current) => {
                const elementValue = MenuList.elementIndent(current);
                return Math.max(accum, elementValue);
            }, 0);
            if (item instanceof MenuItem) {
                item.setAttribute('data-indent', `${indent}`);
            }
        });
    }
    static elementIndent(el) {
        const role = el.getAttribute('role');
        const startSlot = el.querySelector('[slot=start]');
        if (role && role !== MenuItemRole.menuitem) {
            return startSlot ? 2 : 1;
        }
        return startSlot ? 1 : 0;
    }
}
//# sourceMappingURL=menu-list.js.map