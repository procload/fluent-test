import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * TextInput size constants
 * @public
 */
export declare const TextInputControlSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};
/**
 * Applies size styling to TextInput
 * @public
 */
export declare type TextInputControlSize = ValuesOf<typeof TextInputControlSize>;
/**
 * TextInput appearance constants
 * @public
 */
export declare const TextInputAppearance: {
    readonly outline: "outline";
    readonly underline: "underline";
    readonly filledLighter: "filled-lighter";
    readonly filledDarker: "filled-darker";
};
/**
 * Applies appearance styling to TextInput
 * @public
 */
export declare type TextInputAppearance = ValuesOf<typeof TextInputAppearance>;
