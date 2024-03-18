import { FASTAccordionItem } from '@microsoft/fast-foundation/accordion-item.js';
import { AccordionItemExpandIconPosition, AccordionItemSize } from './accordion-item.options.js';
/**
 * @internal
 */
export declare class AccordionItem extends FASTAccordionItem {
    /**
     * Defines accordion header font size.
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: size
     */
    size?: AccordionItemSize;
    /**
     * Sets the width of the focus state.
     *
     * @public
     * @remarks
     * HTML Attribute: block
     */
    block: boolean;
    /**
     * Sets expand and collapsed icon position.
     *
     * @public
     * @default 'start'
     * @remarks
     * HTML Attribute: expandIconPosition
     */
    expandIconPosition?: AccordionItemExpandIconPosition;
}
