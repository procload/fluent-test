import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
import { TabsOrientation } from '@microsoft/fast-foundation/tabs.js';
export declare const TabsAppearance: {
    readonly subtle: "subtle";
    readonly transparent: "transparent";
};
export declare type TabsAppearance = ValuesOf<typeof TabsAppearance>;
export declare const TabsSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
export declare type TabsSize = ValuesOf<typeof TabsSize>;
export { TabsOrientation };
