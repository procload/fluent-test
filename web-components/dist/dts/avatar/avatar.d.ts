import { FASTElement } from '@microsoft/fast-element';
import { AvatarActive, AvatarAppearance, AvatarColor, AvatarNamedColor, AvatarShape, AvatarSize } from './avatar.options.js';
/**
 * The base class used for constructing a fluent-avatar custom element
 * @public
 */
export declare class Avatar extends FASTElement {
    /**
     * The name of the person or entity represented by this Avatar. This should always be provided if it is available.
     *
     * @public
     * @remarks
     * HTML Attribute: name
     */
    name?: string | undefined;
    /**
     * Provide custom initials rather than one generated via the name
     *
     * @public
     * @remarks
     * HTML Attribute: name
     */
    initials?: string | undefined;
    /**
     * Size of the avatar in pixels.
     *
     * Size is restricted to a limited set of supported values recommended for most uses (see `AvatarSizeValue`) and
     * based on design guidelines for the Avatar control.
     *
     * If a non-supported size is neeeded, set `size` to the next-smaller supported size, and set `width` and `height`
     * to override the rendered size.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     *
     */
    size?: AvatarSize | undefined;
    /**
     * The avatar can have a circular or square shape.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: AvatarShape | undefined;
    /**
     * Optional activity indicator
     * * active: the avatar will be decorated according to activeAppearance
     * * inactive: the avatar will be reduced in size and partially transparent
     * * undefined: normal display
     *
     * @public
     * @remarks
     * HTML Attribute: active
     */
    active?: AvatarActive | undefined;
    /**
     * The appearance when `active="active"`
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: AvatarAppearance | undefined;
    /**
     * The color when displaying either an icon or initials.
     * * neutral (default): gray
     * * brand: color from the brand palette
     * * colorful: picks a color from a set of pre-defined colors, based on a hash of the name (or colorId if provided)
     * * [AvatarNamedColor]: a specific color from the theme
     *
     * @public
     * @remarks
     * HTML Attribute: color
     */
    color?: AvatarColor;
    /**
     * Specify a string to be used instead of the name, to determine which color to use when color="colorful".
     * Use this when a name is not available, but there is another unique identifier that can be used instead.
     */
    colorId?: AvatarNamedColor | undefined;
    /**
     * Sets the data-color attribute used for the visual presentation
     * @internal
     */
    generateColor(): AvatarColor | void;
    /**
     * Generates and sets the initials for the template
     * @internal
     */
    generateInitials(): string | void;
    /**
     * An array of the available Avatar named colors
     */
    static colors: ("anchor" | "dark-red" | "cranberry" | "red" | "pumpkin" | "peach" | "marigold" | "gold" | "brass" | "brown" | "forest" | "seafoam" | "dark-green" | "light-teal" | "teal" | "steel" | "blue" | "royal-blue" | "cornflower" | "navy" | "lavender" | "purple" | "grape" | "lilac" | "pink" | "magenta" | "plum" | "beige" | "mink" | "platinum")[];
}
