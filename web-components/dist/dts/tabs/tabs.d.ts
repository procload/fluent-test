import { FASTTabs } from '@microsoft/fast-foundation/tabs.js';
import { TabsAppearance, TabsSize } from './tabs.options.js';
/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export declare class Tabs extends FASTTabs {
    /**
     * activeTabData
     * The positional coordinates and size dimensions of the active tab. Used for calculating the offset and scale of the tab active indicator.
     */
    private activeTabData;
    /**
     * previousActiveTabData
     * The positional coordinates and size dimensions of the active tab. Used for calculating the offset and scale of the tab active indicator.
     */
    private previousActiveTabData;
    /**
     * activeTabOffset
     * Used to position the active indicator for animations of the active indicator on active tab changes.
     */
    private activeTabOffset;
    /**
     * activeTabScale
     * Used to scale the tab active indicator up or down as animations of the active indicator occur.
     */
    private activeTabScale;
    /**
     * styles
     * used in the class for storing the css variables required for animations
     */
    private styles;
    /**
     * appearance
     * There are two modes of appearance: transparent and subtle.
     */
    appearance?: TabsAppearance;
    /**
     * disabled
     * Used for disabling all click and keyboard events for the tabs, child tab elements and tab panel elements. UI styling of content and tabs will appear as "grayed out."
     */
    disabled?: boolean;
    /**
     * size
     * defaults to medium.
     * Used to set the size of all the tab controls, which effects text size and margins. Three sizes: small, medium and large.
     */
    size?: TabsSize;
    /**
     * calculateAnimationProperties
     *
     * Recalculates the active tab offset and scale.
     * These values will be applied to css variables that control the tab active indicator position animations
     */
    private calculateAnimationProperties;
    /**
     * getSelectedTabPosition - gets the x or y coordinates of the tab
     */
    private getTabPosition;
    /**
     * getSelectedTabScale - gets the scale of the tab
     */
    private getTabScale;
    /**
     * applyUpdatedCSSValues
     *
     * calculates and applies updated values to CSS variables
     * @param tab
     */
    private applyUpdatedCSSValues;
    /**
     * animationLoop
     * runs through all the operations required for setting the tab active indicator to its starting location, ending location, and applying the animated css class to the tab.
     * @param tab
     */
    private animationLoop;
    /**
     * setTabData
     * sets the data from the active tab onto the class. used for making all the animation calculations for the active tab indicator.
     */
    private setTabData;
    private setTabOffsetCSSVar;
    private setTabScaleCSSVar;
    activeidChanged(oldValue: string, newValue: string): void;
    tabsChanged(): void;
}
