import { FASTElement } from '@microsoft/fast-element';
import type { TextAlign, TextFont, TextSize, TextWeight } from './text.options.js';
/**
 * The base class used for constructing a fluent-text custom element
 * @public
 */
export declare class Text extends FASTElement {
    /**
     * The text will not wrap
     * NOTE: In Fluent UI React v9 this is "wrap"
     * Boolean attributes which default to true in HTML can't be switched off in the DOM
     *
     * @public
     * @remarks
     * HTML Attribute: nowrap
     */
    nowrap: boolean;
    /**
     * The text truncates
     *
     * @public
     * @remarks
     * HTML Attribute: truncate
     */
    truncate: boolean;
    /**
     * The text style is italic
     *
     * @public
     * @remarks
     * HTML Attribute: italic
     */
    italic: boolean;
    /**
     * The text style is underline
     *
     * @public
     * @remarks
     * HTML Attribute: underline
     */
    underline: boolean;
    /**
     * The text style is strikethrough
     *
     * @public
     * @remarks
     * HTML Attribute: strikethrough
     */
    strikethrough: boolean;
    /**
     * An text can take up the width of its container.
     *
     * @public
     * @remarks
     * HTML Attribute: block
     */
    block: boolean;
    /**
     * THe Text size
     *
     * @public
     * @remarks
     * HTML Attribute: size
     *
     */
    size?: TextSize;
    /**
     * THe Text font
     *
     * @public
     * @remarks
     * HTML Attribute: font
     */
    font?: TextFont;
    /**
     * THe Text weight
     *
     * @public
     * @remarks
     * HTML Attribute: weight
     */
    weight?: TextWeight;
    /**
     * THe Text align
     *
     * @public
     * @remarks
     * HTML Attribute: align
     */
    align?: TextAlign;
}
