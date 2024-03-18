import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * An Accordion Item header font size can be small, medium, large, and extra-large
 */
export declare const AccordionItemSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
};
/**
 * Applies font size to accordion header
 * @public
 */
export declare type AccordionItemSize = ValuesOf<typeof AccordionItemSize>;
/**
 * An Accordion Item expand/collapse icon can appear at the start or end of the accordion
 */
export declare const AccordionItemExpandIconPosition: {
    readonly start: "start";
    readonly end: "end";
};
/**
 * Applies expand/collapse icon position
 * @public
 */
export declare type AccordionItemExpandIconPosition = ValuesOf<typeof AccordionItemExpandIconPosition>;
