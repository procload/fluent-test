var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { attr, css } from '@microsoft/fast-element';
import { FASTTabs, TabsOrientation } from '@microsoft/fast-foundation/tabs.js';
import { TabsAppearance } from './tabs.options.js';
/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class Tabs extends FASTTabs {
    constructor() {
        super(...arguments);
        /**
         * activeTabData
         * The positional coordinates and size dimensions of the active tab. Used for calculating the offset and scale of the tab active indicator.
         */
        this.activeTabData = { x: 0, y: 0, height: 0, width: 0 };
        /**
         * previousActiveTabData
         * The positional coordinates and size dimensions of the active tab. Used for calculating the offset and scale of the tab active indicator.
         */
        this.previousActiveTabData = { x: 0, y: 0, height: 0, width: 0 };
        /**
         * activeTabOffset
         * Used to position the active indicator for animations of the active indicator on active tab changes.
         */
        this.activeTabOffset = 0;
        /**
         * activeTabScale
         * Used to scale the tab active indicator up or down as animations of the active indicator occur.
         */
        this.activeTabScale = 1;
        /**
         * appearance
         * There are two modes of appearance: transparent and subtle.
         */
        this.appearance = TabsAppearance.transparent;
    }
    /**
     * calculateAnimationProperties
     *
     * Recalculates the active tab offset and scale.
     * These values will be applied to css variables that control the tab active indicator position animations
     */
    calculateAnimationProperties(tab) {
        this.activeTabOffset = this.getTabPosition(tab);
        this.activeTabScale = this.getTabScale(tab);
    }
    /**
     * getSelectedTabPosition - gets the x or y coordinates of the tab
     */
    getTabPosition(tab) {
        if (this.orientation === TabsOrientation.horizontal) {
            return this.previousActiveTabData.x - (tab.getBoundingClientRect().x - this.getBoundingClientRect().x);
        }
        else
            return this.previousActiveTabData.y - (tab.getBoundingClientRect().y - this.getBoundingClientRect().y);
    }
    /**
     * getSelectedTabScale - gets the scale of the tab
     */
    getTabScale(tab) {
        if (this.orientation === TabsOrientation.horizontal) {
            return this.previousActiveTabData.width / tab.getBoundingClientRect().width;
        }
        else
            return this.previousActiveTabData.height / tab.getBoundingClientRect().height;
    }
    /**
     * applyUpdatedCSSValues
     *
     * calculates and applies updated values to CSS variables
     * @param tab
     */
    applyUpdatedCSSValues(tab) {
        this.calculateAnimationProperties(tab);
        this.setTabScaleCSSVar();
        this.setTabOffsetCSSVar();
    }
    /**
     * animationLoop
     * runs through all the operations required for setting the tab active indicator to its starting location, ending location, and applying the animated css class to the tab.
     * @param tab
     */
    animationLoop(tab) {
        // remove the animated class so nothing animates yet
        tab.setAttribute('data-animate', 'false');
        // animation start - this applyUpdeatedCSSValues sets the active indicator to the location of the previously selected tab
        this.applyUpdatedCSSValues(tab);
        // changing the previously active tab allows the applyUpdatedCSSValues method to calculate the correct end to the animation.
        this.previousActiveTabData = this.activeTabData;
        // calculate and apply updated css values for animation.
        this.applyUpdatedCSSValues(tab);
        // add the css class and active indicator will animate from the previous tab location to its tab location
        tab.setAttribute('data-animate', 'true');
    }
    /**
     * setTabData
     * sets the data from the active tab onto the class. used for making all the animation calculations for the active tab indicator.
     */
    setTabData() {
        var _a, _b, _c, _d;
        if (this.tabs && this.tabs.length > 0) {
            const tabs = this.tabs;
            const activeTab = this.activetab || tabs[0];
            const activeRect = activeTab === null || activeTab === void 0 ? void 0 : activeTab.getBoundingClientRect();
            const parentRect = this.getBoundingClientRect();
            this.activeTabData = {
                x: activeRect.x - parentRect.x,
                y: activeRect.y - parentRect.y,
                height: activeRect.height,
                width: activeRect.width,
            };
            if (((_a = this.previousActiveTabData) === null || _a === void 0 ? void 0 : _a.x) !== ((_b = this.activeTabData) === null || _b === void 0 ? void 0 : _b.x) &&
                ((_c = this.previousActiveTabData) === null || _c === void 0 ? void 0 : _c.y) !== ((_d = this.activeTabData) === null || _d === void 0 ? void 0 : _d.y)) {
                this.previousActiveTabData = this.activeTabData;
            }
        }
    }
    setTabOffsetCSSVar() {
        this.styles = css /**css*/ `
      :host {
        --tabIndicatorOffset: ${this.activeTabOffset.toString()}px;
      }
    `;
        this.$fastController.addStyles(this.styles);
    }
    setTabScaleCSSVar() {
        this.styles = css /**css*/ `
      :host {
        --tabIndicatorScale: ${this.activeTabScale.toString()};
      }
    `;
        this.$fastController.addStyles(this.styles);
    }
    activeidChanged(oldValue, newValue) {
        super.activeidChanged(oldValue, newValue);
        this.setTabData();
        if (this.activetab) {
            this.animationLoop(this.activetab);
        }
    }
    tabsChanged() {
        super.tabsChanged();
        this.setTabData();
    }
}
__decorate([
    attr
], Tabs.prototype, "appearance", void 0);
__decorate([
    attr({ mode: 'boolean' })
], Tabs.prototype, "disabled", void 0);
__decorate([
    attr
], Tabs.prototype, "size", void 0);
//# sourceMappingURL=tabs.js.map