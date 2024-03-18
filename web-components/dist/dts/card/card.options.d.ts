import { ValuesOf } from '@microsoft/fast-foundation';
/**
 * The size variations for the card component
 * @public
 */
export declare const CardSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * The types for card size
 * @public
 */
export declare type CardSize = ValuesOf<typeof CardSize>;
/**
 * The appearance variations for the card component
 * @public
 */
export declare const CardAppearance: {
    readonly filled: "filled";
    readonly filledAlternative: "filled-alternative";
    readonly outline: "outline";
    readonly subtle: "subtle";
};
/**
 * The types for card appearance
 * @public
 */
export declare type CardAppearance = ValuesOf<typeof CardAppearance>;
/**
 * The orientation variations for the card component
 * @public
 */
export declare const CardOrientation: {
    readonly horizontal: "horizontal";
    readonly vertical: "vertical";
};
/**
 * The types for card orientations
 * @public
 */
export declare type CardOrientation = ValuesOf<typeof CardOrientation>;
/**
 * The focus mode variations for the card component
 * @public
 */
export declare const CardFocusMode: {
    readonly off: "off";
    readonly noTab: "no-tab";
    readonly tabExit: "tab-exit";
    readonly tabOnly: "tab-only";
};
/**
 * The types for card orientations
 * @public
 */
export declare type CardFocusMode = ValuesOf<typeof CardFocusMode>;
