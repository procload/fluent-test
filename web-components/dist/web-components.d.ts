import type { AnchorOptions as AnchorButtonOptions } from '@microsoft/fast-foundation/anchor.js';
import type { ButtonOptions } from '@microsoft/fast-foundation/button.js';
import { CSSDesignToken } from '@microsoft/fast-foundation/design-token.js';
import { DividerOrientation } from '@microsoft/fast-foundation/divider.js';
import { DividerRole } from '@microsoft/fast-foundation/divider.js';
import { ElementStyles } from '@microsoft/fast-element';
import { ElementViewTemplate } from '@microsoft/fast-element';
import { FASTAccordion } from '@microsoft/fast-foundation/accordion.js';
import { FASTAccordionItem } from '@microsoft/fast-foundation/accordion-item.js';
import { FASTAnchor } from '@microsoft/fast-foundation/anchor.js';
import { FASTButton } from '@microsoft/fast-foundation/button.js';
import { FASTCheckbox } from '@microsoft/fast-foundation/checkbox.js';
import { FASTDivider } from '@microsoft/fast-foundation/divider.js';
import { FASTElement } from '@microsoft/fast-element';
import { FASTElementDefinition } from '@microsoft/fast-element';
import { FASTMenu } from '@microsoft/fast-foundation/menu.js';
import { FASTMenuItem } from '@microsoft/fast-foundation/menu-item.js';
import { FASTProgress } from '@microsoft/fast-foundation/progress.js';
import { FASTProgressRing } from '@microsoft/fast-foundation/progress-ring.js';
import { FASTRadio } from '@microsoft/fast-foundation/radio.js';
import { FASTRadioGroup } from '@microsoft/fast-foundation/radio-group.js';
import { FASTSlider } from '@microsoft/fast-foundation/slider.js';
import { FASTSwitch } from '@microsoft/fast-foundation/switch.js';
import { FASTTab } from '@microsoft/fast-foundation/tab.js';
import { FASTTabPanel } from '@microsoft/fast-foundation/tab-panel.js';
import { FASTTabs } from '@microsoft/fast-foundation/tabs.js';
import { FASTTextField } from '@microsoft/fast-foundation/text-field.js';
import { MenuItemRole } from '@microsoft/fast-foundation/menu-item.js';
import { RadioGroupOrientation } from '@microsoft/fast-foundation/radio-group.js';
import { SliderOrientation } from '@microsoft/fast-foundation/slider.js';
import { StartEnd } from '@microsoft/fast-foundation/patterns.js';
import { StartEndOptions } from '@microsoft/fast-foundation/patterns.js';
import type { StaticallyComposableHTML } from '@microsoft/fast-foundation/utilities.js';
import { TabsOrientation } from '@microsoft/fast-foundation/tabs.js';
import { TextFieldType as TextInputType } from '@microsoft/fast-foundation/text-field.js';
import type { Theme } from '@fluentui/tokens';
import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';

/**
 * The base class used for constructing a fluent-accordion custom element
 * @public
 */
export declare class Accordion extends FASTAccordion {
}

/**
 * The Fluent Accordion Element. Implements {@link @microsoft/fast-foundation#Accordion },
 * {@link @microsoft/fast-foundation#accordionTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion\>
 */
export declare const accordionDefinition: FASTElementDefinition<typeof Accordion>;

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

/**
 * The Fluent AccordionItem Element. Implements {@link @microsoft/fast-foundation#AccordionItem },
 * {@link @microsoft/fast-foundation#accordionItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-accordion-item\>
 */
export declare const accordionItemDefinition: FASTElementDefinition<typeof AccordionItem>;

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

export declare const accordionItemStyles: ElementStyles;

/**
 * The template for the fluent-accordion component.
 * @public
 */
export declare const accordionItemTemplate: ElementViewTemplate<AccordionItem>;

export declare const accordionStyles: ElementStyles;

export declare const accordionTemplate: ElementViewTemplate<Accordion>;

/**
 * The base class used for constructing a fluent-anchor-button custom element
 * @public
 */
export declare class AnchorButton extends FASTAnchor {
    /**
     * The appearance the anchor button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: AnchorButtonAppearance | undefined;
    /**
     * The shape the anchor button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: AnchorButtonShape | undefined;
    /**
     * The size the anchor button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: AnchorButtonSize;
    /**
     * The anchor button has an icon only, no text content
     *
     * @public
     * @remarks
     * HTML Attribute: icon-only
     */
    iconOnly: boolean;
    /**
     * The anchor button is disabled
     *
     * @public
     * @remarks
     * HTML Attribute: disabled-focusable
     */
    disabled?: boolean;
    protected disabledChanged(prev: boolean, next: boolean): void;
    /**
     * The anchor button is disabled but focusable
     *
     * @public
     * @remarks
     * HTML Attribute: disabled-focusable
     */
    disabledFocusable?: boolean;
    protected disabledFocusableChanged(prev: boolean, next: boolean): void;
    /**
     * Prevents disabledFocusable click events
     */
    private handleDisabledFocusableClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

/**
 * Anchor Button Appearance constants
 * @public
 */
export declare const AnchorButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};

/**
 * An Anchor Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type AnchorButtonAppearance = ValuesOf<typeof AnchorButtonAppearance>;

/**
 * The Fluent Anchor Button Element. Implements {@link @microsoft/fast-foundation#Anchor },
 * {@link @microsoft/fast-foundation#anchorTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-anchor-button\>
 */
export declare const AnchorButtonDefinition: FASTElementDefinition<typeof AnchorButton>;

export { AnchorButtonOptions }

/**
 * An Anchor Button can be square, circular or rounded.
 * @public
 */
export declare const AnchorButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * An Anchor Button can be square, circular or rounded
 * @public
 */
export declare type AnchorButtonShape = ValuesOf<typeof AnchorButtonShape>;

/**
 * An Anchor Button can be a size of small, medium or large.
 * @public
 */
export declare const AnchorButtonSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * An Anchor Button can be on of several preset sizes.
 * @public
 */
export declare type AnchorButtonSize = ValuesOf<typeof AnchorButtonSize>;

/**
 * The template for the Button component.
 * @public
 */
export declare const AnchorButtonTemplate: ElementViewTemplate<AnchorButton>;

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

/**
 * The Avatar "active" state
 */
export declare const AvatarActive: {
    readonly active: "active";
    readonly inactive: "inactive";
};

/**
 * The types of Avatar active state
 */
export declare type AvatarActive = ValuesOf<typeof AvatarActive>;

/**
 * The Avatar Appearance when "active"
 */
export declare const AvatarAppearance: {
    readonly ring: "ring";
    readonly shadow: "shadow";
    readonly ringShadow: "ring-shadow";
};

/**
 * The appearance when "active"
 */
export declare type AvatarAppearance = ValuesOf<typeof AvatarAppearance>;

/**
 * Supported Avatar colors
 */
export declare const AvatarColor: {
    readonly darkRed: "dark-red";
    readonly cranberry: "cranberry";
    readonly red: "red";
    readonly pumpkin: "pumpkin";
    readonly peach: "peach";
    readonly marigold: "marigold";
    readonly gold: "gold";
    readonly brass: "brass";
    readonly brown: "brown";
    readonly forest: "forest";
    readonly seafoam: "seafoam";
    readonly darkGreen: "dark-green";
    readonly lightTeal: "light-teal";
    readonly teal: "teal";
    readonly steel: "steel";
    readonly blue: "blue";
    readonly royalBlue: "royal-blue";
    readonly cornflower: "cornflower";
    readonly navy: "navy";
    readonly lavender: "lavender";
    readonly purple: "purple";
    readonly grape: "grape";
    readonly lilac: "lilac";
    readonly pink: "pink";
    readonly magenta: "magenta";
    readonly plum: "plum";
    readonly beige: "beige";
    readonly mink: "mink";
    readonly platinum: "platinum";
    readonly anchor: "anchor";
    readonly neutral: "neutral";
    readonly brand: "brand";
    readonly colorful: "colorful";
};

/**
 * The Avatar Color
 */
export declare type AvatarColor = ValuesOf<typeof AvatarColor>;

/**
 * The Fluent Avatar Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export declare const AvatarDefinition: FASTElementDefinition<typeof Avatar>;

/**
 * A specific named color for the Avatar
 */
export declare const AvatarNamedColor: {
    readonly darkRed: "dark-red";
    readonly cranberry: "cranberry";
    readonly red: "red";
    readonly pumpkin: "pumpkin";
    readonly peach: "peach";
    readonly marigold: "marigold";
    readonly gold: "gold";
    readonly brass: "brass";
    readonly brown: "brown";
    readonly forest: "forest";
    readonly seafoam: "seafoam";
    readonly darkGreen: "dark-green";
    readonly lightTeal: "light-teal";
    readonly teal: "teal";
    readonly steel: "steel";
    readonly blue: "blue";
    readonly royalBlue: "royal-blue";
    readonly cornflower: "cornflower";
    readonly navy: "navy";
    readonly lavender: "lavender";
    readonly purple: "purple";
    readonly grape: "grape";
    readonly lilac: "lilac";
    readonly pink: "pink";
    readonly magenta: "magenta";
    readonly plum: "plum";
    readonly beige: "beige";
    readonly mink: "mink";
    readonly platinum: "platinum";
    readonly anchor: "anchor";
};

/**
 * An avatar can be one of named colors
 * @public
 */
export declare type AvatarNamedColor = ValuesOf<typeof AvatarNamedColor>;

/**
 * The Avatar Shape
 */
export declare const AvatarShape: {
    readonly circular: "circular";
    readonly square: "square";
};

/**
 * The types of Avatar Shape
 */
export declare type AvatarShape = ValuesOf<typeof AvatarShape>;

/**
 * The Avatar Sizes
 * @public
 */
export declare const AvatarSize: {
    readonly _16: 16;
    readonly _20: 20;
    readonly _24: 24;
    readonly _28: 28;
    readonly _32: 32;
    readonly _36: 36;
    readonly _40: 40;
    readonly _48: 48;
    readonly _56: 56;
    readonly _64: 64;
    readonly _72: 72;
    readonly _96: 96;
    readonly _120: 120;
    readonly _128: 128;
};

/**
 * A Avatar can be on of several preset sizes.
 * @public
 */
export declare type AvatarSize = ValuesOf<typeof AvatarSize>;

/** Avatar styles
 * @public
 */
export declare const AvatarStyles: ElementStyles;

export declare const AvatarTemplate: ElementViewTemplate<Avatar>;

/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export declare class Badge extends FASTElement {
    /**
     * The appearance the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance: BadgeAppearance;
    /**
     * The color the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: color
     */
    color: BadgeColor;
    /**
     * The shape the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: BadgeShape;
    /**
     * The size the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: BadgeSize;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
export declare interface Badge extends StartEnd {
}

/**
 * BadgeAppearance constants
 * @public
 */
export declare const BadgeAppearance: {
    readonly filled: "filled";
    readonly ghost: "ghost";
    readonly outline: "outline";
    readonly tint: "tint";
};

/**
 * A Badge can be filled, outline, ghost, inverted
 * @public
 */
export declare type BadgeAppearance = ValuesOf<typeof BadgeAppearance>;

/**
 * BadgeColor constants
 * @public
 */
export declare const BadgeColor: {
    readonly brand: "brand";
    readonly danger: "danger";
    readonly important: "important";
    readonly informative: "informative";
    readonly severe: "severe";
    readonly subtle: "subtle";
    readonly success: "success";
    readonly warning: "warning";
};

/**
 * A Badge can be one of preset colors
 * @public
 */
export declare type BadgeColor = ValuesOf<typeof BadgeColor>;

/**
 * The Fluent Badge Element. Implements {@link @microsoft/fast-foundation#Badge },
 * {@link @microsoft/fast-foundation#badgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-badge\>
 */
export declare const BadgeDefinition: FASTElementDefinition<typeof Badge>;

/**
 * @internal - marking as internal update when Badge PR for start/end is in
 */
export declare type BadgeOptions = StartEndOptions<Badge> & {
    defaultContent?: StaticallyComposableHTML;
};

/**
 * A Badge can be square, circular or rounded.
 * @public
 */
export declare const BadgeShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * A Badge can be one of preset colors
 * @public
 */
export declare type BadgeShape = ValuesOf<typeof BadgeShape>;

/**
 * A Badge can be square, circular or rounded.
 * @public
 */
export declare const BadgeSize: {
    readonly tiny: "tiny";
    readonly extraSmall: "extra-small";
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
};

/**
 * A Badge can be on of several preset sizes.
 * @public
 */
export declare type BadgeSize = ValuesOf<typeof BadgeSize>;

/** Badge styles
 * @public
 */
export declare const BadgeStyles: ElementStyles;

export declare const BadgeTemplate: ElementViewTemplate<Badge>;

export declare const borderRadiusCircular: CSSDesignToken<string>;

export declare const borderRadiusLarge: CSSDesignToken<string>;

export declare const borderRadiusMedium: CSSDesignToken<string>;

export declare const borderRadiusNone: CSSDesignToken<string>;

export declare const borderRadiusSmall: CSSDesignToken<string>;

export declare const borderRadiusXLarge: CSSDesignToken<string>;

/**
 * The base class used for constructing a fluent-button custom element
 * @public
 */
export declare class Button extends FASTButton {
    /**
     * The appearance the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: ButtonAppearance | undefined;
    /**
     * The shape the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: ButtonShape | undefined;
    /**
     * The size the button should have.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: ButtonSize;
    /**
     * The button has an icon only, no text content
     *
     * @public
     * @remarks
     * HTML Attribute: icon-only
     */
    iconOnly: boolean;
    /**
     * The button is disabled but focusable
     *
     * @public
     * @remarks
     * HTML Attribute: disabled-focusable
     */
    disabledFocusable?: boolean;
    protected disabledFocusableChanged(prev: boolean, next: boolean): void;
    /**
     * Prevents disabledFocusable click events
     */
    private handleDisabledFocusableClick;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

/**
 * ButtonAppearance constants
 * @public
 */
export declare const ButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};

/**
 * A Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type ButtonAppearance = ValuesOf<typeof ButtonAppearance>;

/**
 * The Fluent Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 */
export declare const ButtonDefinition: FASTElementDefinition<typeof Button>;

export { ButtonOptions }
export { ButtonOptions as CompoundButtonOptions }
export { ButtonOptions as MenuButtonOptions }
export { ButtonOptions as ToggleButtonOptions }

/**
 * A Button can be square, circular or rounded.
 * @public
 */
export declare const ButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * A Button can be square, circular or rounded
 * @public
 */
export declare type ButtonShape = ValuesOf<typeof ButtonShape>;

/**
 * A Button can be a size of small, medium or large.
 * @public
 */
export declare const ButtonSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * A Button can be on of several preset sizes.
 * @public
 */
export declare type ButtonSize = ValuesOf<typeof ButtonSize>;

/**
 * The template for the Button component.
 * @public
 */
export declare const ButtonTemplate: ElementViewTemplate<Button>;

/**
 * The base class used for constucting a fluent checkbox custom element
 * @public
 */
export declare class Checkbox extends FASTCheckbox {
    /**
     * Sets shape of the checkbox.
     *
     * @public
     * @default 'square'
     * @remarks
     * HTML Attribute: shape
     */
    shape?: CheckboxShape;
    /**
     * Sets size of the checkbox.
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: size
     */
    size?: CheckboxSize;
    /**
     * Sets position of the label relative to the input
     *
     * @public
     * @default 'after'
     * @remarks
     * HTML Attribute: label-position
     */
    labelPosition?: CheckboxLabelPosition;
}

/**
 * The Fluent Checkbox Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-checkbox\>
 */
export declare const CheckboxDefinition: FASTElementDefinition<typeof Checkbox>;

/**
 * Checkbox label position
 * @public
 */
export declare const CheckboxLabelPosition: {
    readonly before: "before";
    readonly after: "after";
};

export declare type CheckboxLabelPosition = ValuesOf<typeof CheckboxLabelPosition>;

/**
 * Checkbox shape
 * @public
 */
export declare const CheckboxShape: {
    readonly circular: "circular";
    readonly square: "square";
};

export declare type CheckboxShape = ValuesOf<typeof CheckboxShape>;

/**
 * Checkbox size
 * @public
 */
export declare const CheckboxSize: {
    readonly medium: "medium";
    readonly large: "large";
};

export declare type CheckboxSize = ValuesOf<typeof CheckboxSize>;

/** Checkbox styles
 *
 * @public
 */
export declare const CheckboxStyles: ElementStyles;

/**
 * Template for the Checkbox component
 * @public
 */
export declare const CheckboxTemplate: ElementViewTemplate<Checkbox>;

export declare const colorBackgroundOverlay: CSSDesignToken<string>;

export declare const colorBrandBackground: CSSDesignToken<string>;

export declare const colorBrandBackground2: CSSDesignToken<string>;

export declare const colorBrandBackgroundHover: CSSDesignToken<string>;

export declare const colorBrandBackgroundInverted: CSSDesignToken<string>;

export declare const colorBrandBackgroundInvertedHover: CSSDesignToken<string>;

export declare const colorBrandBackgroundInvertedPressed: CSSDesignToken<string>;

export declare const colorBrandBackgroundInvertedSelected: CSSDesignToken<string>;

export declare const colorBrandBackgroundPressed: CSSDesignToken<string>;

export declare const colorBrandBackgroundSelected: CSSDesignToken<string>;

export declare const colorBrandBackgroundStatic: CSSDesignToken<string>;

export declare const colorBrandForeground1: CSSDesignToken<string>;

export declare const colorBrandForeground2: CSSDesignToken<string>;

export declare const colorBrandForegroundInverted: CSSDesignToken<string>;

export declare const colorBrandForegroundInvertedHover: CSSDesignToken<string>;

export declare const colorBrandForegroundInvertedPressed: CSSDesignToken<string>;

export declare const colorBrandForegroundLink: CSSDesignToken<string>;

export declare const colorBrandForegroundLinkHover: CSSDesignToken<string>;

export declare const colorBrandForegroundLinkPressed: CSSDesignToken<string>;

export declare const colorBrandForegroundLinkSelected: CSSDesignToken<string>;

export declare const colorBrandForegroundOnLight: CSSDesignToken<string>;

export declare const colorBrandForegroundOnLightHover: CSSDesignToken<string>;

export declare const colorBrandForegroundOnLightPressed: CSSDesignToken<string>;

export declare const colorBrandForegroundOnLightSelected: CSSDesignToken<string>;

export declare const colorBrandShadowAmbient: CSSDesignToken<string>;

export declare const colorBrandShadowKey: CSSDesignToken<string>;

export declare const colorBrandStroke1: CSSDesignToken<string>;

export declare const colorBrandStroke2: CSSDesignToken<string>;

export declare const colorCompoundBrandBackground: CSSDesignToken<string>;

export declare const colorCompoundBrandBackgroundHover: CSSDesignToken<string>;

export declare const colorCompoundBrandBackgroundPressed: CSSDesignToken<string>;

export declare const colorCompoundBrandForeground1: CSSDesignToken<string>;

export declare const colorCompoundBrandForeground1Hover: CSSDesignToken<string>;

export declare const colorCompoundBrandForeground1Pressed: CSSDesignToken<string>;

export declare const colorCompoundBrandStroke: CSSDesignToken<string>;

export declare const colorCompoundBrandStrokeHover: CSSDesignToken<string>;

export declare const colorCompoundBrandStrokePressed: CSSDesignToken<string>;

export declare const colorNeutralBackground1: CSSDesignToken<string>;

export declare const colorNeutralBackground1Hover: CSSDesignToken<string>;

export declare const colorNeutralBackground1Pressed: CSSDesignToken<string>;

export declare const colorNeutralBackground1Selected: CSSDesignToken<string>;

export declare const colorNeutralBackground2: CSSDesignToken<string>;

export declare const colorNeutralBackground2Hover: CSSDesignToken<string>;

export declare const colorNeutralBackground2Pressed: CSSDesignToken<string>;

export declare const colorNeutralBackground2Selected: CSSDesignToken<string>;

export declare const colorNeutralBackground3: CSSDesignToken<string>;

export declare const colorNeutralBackground3Hover: CSSDesignToken<string>;

export declare const colorNeutralBackground3Pressed: CSSDesignToken<string>;

export declare const colorNeutralBackground3Selected: CSSDesignToken<string>;

export declare const colorNeutralBackground4: CSSDesignToken<string>;

export declare const colorNeutralBackground4Hover: CSSDesignToken<string>;

export declare const colorNeutralBackground4Pressed: CSSDesignToken<string>;

export declare const colorNeutralBackground4Selected: CSSDesignToken<string>;

export declare const colorNeutralBackground5: CSSDesignToken<string>;

export declare const colorNeutralBackground5Hover: CSSDesignToken<string>;

export declare const colorNeutralBackground5Pressed: CSSDesignToken<string>;

export declare const colorNeutralBackground5Selected: CSSDesignToken<string>;

export declare const colorNeutralBackground6: CSSDesignToken<string>;

export declare const colorNeutralBackgroundDisabled: CSSDesignToken<string>;

export declare const colorNeutralBackgroundInverted: CSSDesignToken<string>;

export declare const colorNeutralBackgroundInvertedDisabled: CSSDesignToken<string>;

export declare const colorNeutralBackgroundStatic: CSSDesignToken<string>;

export declare const colorNeutralForeground1: CSSDesignToken<string>;

export declare const colorNeutralForeground1Hover: CSSDesignToken<string>;

export declare const colorNeutralForeground1Pressed: CSSDesignToken<string>;

export declare const colorNeutralForeground1Selected: CSSDesignToken<string>;

export declare const colorNeutralForeground1Static: CSSDesignToken<string>;

export declare const colorNeutralForeground2: CSSDesignToken<string>;

export declare const colorNeutralForeground2BrandHover: CSSDesignToken<string>;

export declare const colorNeutralForeground2BrandPressed: CSSDesignToken<string>;

export declare const colorNeutralForeground2BrandSelected: CSSDesignToken<string>;

export declare const colorNeutralForeground2Hover: CSSDesignToken<string>;

export declare const colorNeutralForeground2Link: CSSDesignToken<string>;

export declare const colorNeutralForeground2LinkHover: CSSDesignToken<string>;

export declare const colorNeutralForeground2LinkPressed: CSSDesignToken<string>;

export declare const colorNeutralForeground2LinkSelected: CSSDesignToken<string>;

export declare const colorNeutralForeground2Pressed: CSSDesignToken<string>;

export declare const colorNeutralForeground2Selected: CSSDesignToken<string>;

export declare const colorNeutralForeground3: CSSDesignToken<string>;

export declare const colorNeutralForeground3BrandHover: CSSDesignToken<string>;

export declare const colorNeutralForeground3BrandPressed: CSSDesignToken<string>;

export declare const colorNeutralForeground3BrandSelected: CSSDesignToken<string>;

export declare const colorNeutralForeground3Hover: CSSDesignToken<string>;

export declare const colorNeutralForeground3Pressed: CSSDesignToken<string>;

export declare const colorNeutralForeground3Selected: CSSDesignToken<string>;

export declare const colorNeutralForeground4: CSSDesignToken<string>;

export declare const colorNeutralForegroundDisabled: CSSDesignToken<string>;

export declare const colorNeutralForegroundInverted: CSSDesignToken<string>;

export declare const colorNeutralForegroundInverted2: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedDisabled: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedHover: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedLink: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedLinkHover: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedLinkPressed: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedLinkSelected: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedPressed: CSSDesignToken<string>;

export declare const colorNeutralForegroundInvertedSelected: CSSDesignToken<string>;

export declare const colorNeutralForegroundOnBrand: CSSDesignToken<string>;

export declare const colorNeutralForegroundStaticInverted: CSSDesignToken<string>;

export declare const colorNeutralShadowAmbient: CSSDesignToken<string>;

export declare const colorNeutralShadowAmbientDarker: CSSDesignToken<string>;

export declare const colorNeutralShadowAmbientLighter: CSSDesignToken<string>;

export declare const colorNeutralShadowKey: CSSDesignToken<string>;

export declare const colorNeutralShadowKeyDarker: CSSDesignToken<string>;

export declare const colorNeutralShadowKeyLighter: CSSDesignToken<string>;

export declare const colorNeutralStencil1: CSSDesignToken<string>;

export declare const colorNeutralStencil1Alpha: CSSDesignToken<string>;

export declare const colorNeutralStencil2: CSSDesignToken<string>;

export declare const colorNeutralStencil2Alpha: CSSDesignToken<string>;

export declare const colorNeutralStroke1: CSSDesignToken<string>;

export declare const colorNeutralStroke1Hover: CSSDesignToken<string>;

export declare const colorNeutralStroke1Pressed: CSSDesignToken<string>;

export declare const colorNeutralStroke1Selected: CSSDesignToken<string>;

export declare const colorNeutralStroke2: CSSDesignToken<string>;

export declare const colorNeutralStroke3: CSSDesignToken<string>;

export declare const colorNeutralStrokeAccessible: CSSDesignToken<string>;

export declare const colorNeutralStrokeAccessibleHover: CSSDesignToken<string>;

export declare const colorNeutralStrokeAccessiblePressed: CSSDesignToken<string>;

export declare const colorNeutralStrokeAccessibleSelected: CSSDesignToken<string>;

export declare const colorNeutralStrokeDisabled: CSSDesignToken<string>;

export declare const colorNeutralStrokeInvertedDisabled: CSSDesignToken<string>;

export declare const colorNeutralStrokeOnBrand: CSSDesignToken<string>;

export declare const colorNeutralStrokeOnBrand2: CSSDesignToken<string>;

export declare const colorNeutralStrokeOnBrand2Hover: CSSDesignToken<string>;

export declare const colorNeutralStrokeOnBrand2Pressed: CSSDesignToken<string>;

export declare const colorNeutralStrokeOnBrand2Selected: CSSDesignToken<string>;

export declare const colorPaletteAnchorBackground2: CSSDesignToken<string>;

export declare const colorPaletteAnchorBorderActive: CSSDesignToken<string>;

export declare const colorPaletteAnchorForeground2: CSSDesignToken<string>;

export declare const colorPaletteBeigeBackground2: CSSDesignToken<string>;

export declare const colorPaletteBeigeBorderActive: CSSDesignToken<string>;

export declare const colorPaletteBeigeForeground2: CSSDesignToken<string>;

export declare const colorPaletteBerryBackground1: CSSDesignToken<string>;

export declare const colorPaletteBerryBackground2: CSSDesignToken<string>;

export declare const colorPaletteBerryBackground3: CSSDesignToken<string>;

export declare const colorPaletteBerryBorder1: CSSDesignToken<string>;

export declare const colorPaletteBerryBorder2: CSSDesignToken<string>;

export declare const colorPaletteBerryBorderActive: CSSDesignToken<string>;

export declare const colorPaletteBerryForeground1: CSSDesignToken<string>;

export declare const colorPaletteBerryForeground2: CSSDesignToken<string>;

export declare const colorPaletteBerryForeground3: CSSDesignToken<string>;

export declare const colorPaletteBlueBackground2: CSSDesignToken<string>;

export declare const colorPaletteBlueBorderActive: CSSDesignToken<string>;

export declare const colorPaletteBlueForeground2: CSSDesignToken<string>;

export declare const colorPaletteBrassBackground2: CSSDesignToken<string>;

export declare const colorPaletteBrassBorderActive: CSSDesignToken<string>;

export declare const colorPaletteBrassForeground2: CSSDesignToken<string>;

export declare const colorPaletteBrownBackground2: CSSDesignToken<string>;

export declare const colorPaletteBrownBorderActive: CSSDesignToken<string>;

export declare const colorPaletteBrownForeground2: CSSDesignToken<string>;

export declare const colorPaletteCornflowerBackground2: CSSDesignToken<string>;

export declare const colorPaletteCornflowerBorderActive: CSSDesignToken<string>;

export declare const colorPaletteCornflowerForeground2: CSSDesignToken<string>;

export declare const colorPaletteCranberryBackground2: CSSDesignToken<string>;

export declare const colorPaletteCranberryBorderActive: CSSDesignToken<string>;

export declare const colorPaletteCranberryForeground2: CSSDesignToken<string>;

export declare const colorPaletteDarkGreenBackground2: CSSDesignToken<string>;

export declare const colorPaletteDarkGreenBorderActive: CSSDesignToken<string>;

export declare const colorPaletteDarkGreenForeground2: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeBackground1: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeBackground2: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeBackground3: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeBorder1: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeBorder2: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeBorderActive: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeForeground1: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeForeground2: CSSDesignToken<string>;

export declare const colorPaletteDarkOrangeForeground3: CSSDesignToken<string>;

export declare const colorPaletteDarkRedBackground2: CSSDesignToken<string>;

export declare const colorPaletteDarkRedBorderActive: CSSDesignToken<string>;

export declare const colorPaletteDarkRedForeground2: CSSDesignToken<string>;

export declare const colorPaletteForestBackground2: CSSDesignToken<string>;

export declare const colorPaletteForestBorderActive: CSSDesignToken<string>;

export declare const colorPaletteForestForeground2: CSSDesignToken<string>;

export declare const colorPaletteGoldBackground2: CSSDesignToken<string>;

export declare const colorPaletteGoldBorderActive: CSSDesignToken<string>;

export declare const colorPaletteGoldForeground2: CSSDesignToken<string>;

export declare const colorPaletteGrapeBackground2: CSSDesignToken<string>;

export declare const colorPaletteGrapeBorderActive: CSSDesignToken<string>;

export declare const colorPaletteGrapeForeground2: CSSDesignToken<string>;

export declare const colorPaletteGreenBackground1: CSSDesignToken<string>;

export declare const colorPaletteGreenBackground2: CSSDesignToken<string>;

export declare const colorPaletteGreenBackground3: CSSDesignToken<string>;

export declare const colorPaletteGreenBorder1: CSSDesignToken<string>;

export declare const colorPaletteGreenBorder2: CSSDesignToken<string>;

export declare const colorPaletteGreenBorderActive: CSSDesignToken<string>;

export declare const colorPaletteGreenForeground1: CSSDesignToken<string>;

export declare const colorPaletteGreenForeground2: CSSDesignToken<string>;

export declare const colorPaletteGreenForeground3: CSSDesignToken<string>;

export declare const colorPaletteGreenForegroundInverted: CSSDesignToken<string>;

export declare const colorPaletteLavenderBackground2: CSSDesignToken<string>;

export declare const colorPaletteLavenderBorderActive: CSSDesignToken<string>;

export declare const colorPaletteLavenderForeground2: CSSDesignToken<string>;

export declare const colorPaletteLightGreenBackground1: CSSDesignToken<string>;

export declare const colorPaletteLightGreenBackground2: CSSDesignToken<string>;

export declare const colorPaletteLightGreenBackground3: CSSDesignToken<string>;

export declare const colorPaletteLightGreenBorder1: CSSDesignToken<string>;

export declare const colorPaletteLightGreenBorder2: CSSDesignToken<string>;

export declare const colorPaletteLightGreenBorderActive: CSSDesignToken<string>;

export declare const colorPaletteLightGreenForeground1: CSSDesignToken<string>;

export declare const colorPaletteLightGreenForeground2: CSSDesignToken<string>;

export declare const colorPaletteLightGreenForeground3: CSSDesignToken<string>;

export declare const colorPaletteLightTealBackground2: CSSDesignToken<string>;

export declare const colorPaletteLightTealBorderActive: CSSDesignToken<string>;

export declare const colorPaletteLightTealForeground2: CSSDesignToken<string>;

export declare const colorPaletteLilacBackground2: CSSDesignToken<string>;

export declare const colorPaletteLilacBorderActive: CSSDesignToken<string>;

export declare const colorPaletteLilacForeground2: CSSDesignToken<string>;

export declare const colorPaletteMagentaBackground2: CSSDesignToken<string>;

export declare const colorPaletteMagentaBorderActive: CSSDesignToken<string>;

export declare const colorPaletteMagentaForeground2: CSSDesignToken<string>;

export declare const colorPaletteMarigoldBackground1: CSSDesignToken<string>;

export declare const colorPaletteMarigoldBackground2: CSSDesignToken<string>;

export declare const colorPaletteMarigoldBackground3: CSSDesignToken<string>;

export declare const colorPaletteMarigoldBorder1: CSSDesignToken<string>;

export declare const colorPaletteMarigoldBorder2: CSSDesignToken<string>;

export declare const colorPaletteMarigoldBorderActive: CSSDesignToken<string>;

export declare const colorPaletteMarigoldForeground1: CSSDesignToken<string>;

export declare const colorPaletteMarigoldForeground2: CSSDesignToken<string>;

export declare const colorPaletteMarigoldForeground3: CSSDesignToken<string>;

export declare const colorPaletteMinkBackground2: CSSDesignToken<string>;

export declare const colorPaletteMinkBorderActive: CSSDesignToken<string>;

export declare const colorPaletteMinkForeground2: CSSDesignToken<string>;

export declare const colorPaletteNavyBackground2: CSSDesignToken<string>;

export declare const colorPaletteNavyBorderActive: CSSDesignToken<string>;

export declare const colorPaletteNavyForeground2: CSSDesignToken<string>;

export declare const colorPalettePeachBackground2: CSSDesignToken<string>;

export declare const colorPalettePeachBorderActive: CSSDesignToken<string>;

export declare const colorPalettePeachForeground2: CSSDesignToken<string>;

export declare const colorPalettePinkBackground2: CSSDesignToken<string>;

export declare const colorPalettePinkBorderActive: CSSDesignToken<string>;

export declare const colorPalettePinkForeground2: CSSDesignToken<string>;

export declare const colorPalettePlatinumBackground2: CSSDesignToken<string>;

export declare const colorPalettePlatinumBorderActive: CSSDesignToken<string>;

export declare const colorPalettePlatinumForeground2: CSSDesignToken<string>;

export declare const colorPalettePlumBackground2: CSSDesignToken<string>;

export declare const colorPalettePlumBorderActive: CSSDesignToken<string>;

export declare const colorPalettePlumForeground2: CSSDesignToken<string>;

export declare const colorPalettePumpkinBackground2: CSSDesignToken<string>;

export declare const colorPalettePumpkinBorderActive: CSSDesignToken<string>;

export declare const colorPalettePumpkinForeground2: CSSDesignToken<string>;

export declare const colorPalettePurpleBackground2: CSSDesignToken<string>;

export declare const colorPalettePurpleBorderActive: CSSDesignToken<string>;

export declare const colorPalettePurpleForeground2: CSSDesignToken<string>;

export declare const colorPaletteRedBackground1: CSSDesignToken<string>;

export declare const colorPaletteRedBackground2: CSSDesignToken<string>;

export declare const colorPaletteRedBackground3: CSSDesignToken<string>;

export declare const colorPaletteRedBorder1: CSSDesignToken<string>;

export declare const colorPaletteRedBorder2: CSSDesignToken<string>;

export declare const colorPaletteRedBorderActive: CSSDesignToken<string>;

export declare const colorPaletteRedForeground1: CSSDesignToken<string>;

export declare const colorPaletteRedForeground2: CSSDesignToken<string>;

export declare const colorPaletteRedForeground3: CSSDesignToken<string>;

export declare const colorPaletteRedForegroundInverted: CSSDesignToken<string>;

export declare const colorPaletteRoyalBlueBackground2: CSSDesignToken<string>;

export declare const colorPaletteRoyalBlueBorderActive: CSSDesignToken<string>;

export declare const colorPaletteRoyalBlueForeground2: CSSDesignToken<string>;

export declare const colorPaletteSeafoamBackground2: CSSDesignToken<string>;

export declare const colorPaletteSeafoamBorderActive: CSSDesignToken<string>;

export declare const colorPaletteSeafoamForeground2: CSSDesignToken<string>;

export declare const colorPaletteSteelBackground2: CSSDesignToken<string>;

export declare const colorPaletteSteelBorderActive: CSSDesignToken<string>;

export declare const colorPaletteSteelForeground2: CSSDesignToken<string>;

export declare const colorPaletteTealBackground2: CSSDesignToken<string>;

export declare const colorPaletteTealBorderActive: CSSDesignToken<string>;

export declare const colorPaletteTealForeground2: CSSDesignToken<string>;

export declare const colorPaletteYellowBackground1: CSSDesignToken<string>;

export declare const colorPaletteYellowBackground2: CSSDesignToken<string>;

export declare const colorPaletteYellowBackground3: CSSDesignToken<string>;

export declare const colorPaletteYellowBorder1: CSSDesignToken<string>;

export declare const colorPaletteYellowBorder2: CSSDesignToken<string>;

export declare const colorPaletteYellowBorderActive: CSSDesignToken<string>;

export declare const colorPaletteYellowForeground1: CSSDesignToken<string>;

export declare const colorPaletteYellowForeground2: CSSDesignToken<string>;

export declare const colorPaletteYellowForeground3: CSSDesignToken<string>;

export declare const colorPaletteYellowForegroundInverted: CSSDesignToken<string>;

export declare const colorScrollbarOverlay: CSSDesignToken<string>;

export declare const colorStrokeFocus1: CSSDesignToken<string>;

export declare const colorStrokeFocus2: CSSDesignToken<string>;

export declare const colorSubtleBackground: CSSDesignToken<string>;

export declare const colorSubtleBackgroundHover: CSSDesignToken<string>;

export declare const colorSubtleBackgroundInverted: CSSDesignToken<string>;

export declare const colorSubtleBackgroundInvertedHover: CSSDesignToken<string>;

export declare const colorSubtleBackgroundInvertedPressed: CSSDesignToken<string>;

export declare const colorSubtleBackgroundInvertedSelected: CSSDesignToken<string>;

export declare const colorSubtleBackgroundLightAlphaHover: CSSDesignToken<string>;

export declare const colorSubtleBackgroundLightAlphaPressed: CSSDesignToken<string>;

export declare const colorSubtleBackgroundLightAlphaSelected: CSSDesignToken<string>;

export declare const colorSubtleBackgroundPressed: CSSDesignToken<string>;

export declare const colorSubtleBackgroundSelected: CSSDesignToken<string>;

export declare const colorTransparentBackground: CSSDesignToken<string>;

export declare const colorTransparentBackgroundHover: CSSDesignToken<string>;

export declare const colorTransparentBackgroundPressed: CSSDesignToken<string>;

export declare const colorTransparentBackgroundSelected: CSSDesignToken<string>;

export declare const colorTransparentStroke: CSSDesignToken<string>;

export declare const colorTransparentStrokeDisabled: CSSDesignToken<string>;

export declare const colorTransparentStrokeInteractive: CSSDesignToken<string>;

/**
 * The base class used for constructing a fluent-compound-button custom element
 * @public
 */
export declare class CompoundButton extends Button {
}

/**
 * Compound Button Appearance constants
 * @public
 */
export declare const CompoundButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};

/**
 * A Compound Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type CompoundButtonAppearance = ValuesOf<typeof CompoundButtonAppearance>;

/**
 * The Fluent Compound Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-comopund-button\>
 */
export declare const CompoundButtonDefinition: FASTElementDefinition<typeof CompoundButton>;

/**
 * A Compound Button can be square, circular or rounded.
 * @public
 */
export declare const CompoundButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * A Compound Button can be square, circular or rounded
 * @public
 */
export declare type CompoundButtonShape = ValuesOf<typeof CompoundButtonShape>;

/**
 * A Compound Button can be a size of small, medium or large.
 * @public
 */
export declare const CompoundButtonSize: {
    readonly small: "small";
    /**
     * A Compound Button can be on of several preset sizes.
     * @public
     */
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * A Compound Button can be on of several preset sizes.
 * @public
 */
export declare type CompoundButtonSize = ValuesOf<typeof CompoundButtonSize>;

export declare const CompoundButtonStyles: ElementStyles;

/**
 * The template for the Button component.
 * @public
 */
export declare const CompoundButtonTemplate: ElementViewTemplate<CompoundButton>;

/**
 * The base class used for constructing a fluent-badge custom element
 * @public
 */
export declare class CounterBadge extends FASTElement {
    /**
     * The appearance the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: CounterBadgeAppearance;
    /**
     * The color the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: color
     */
    color?: CounterBadgeColor;
    /**
     * The shape the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: CounterBadgeShape;
    /**
     * The size the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: CounterBadgeSize;
    /**
     * The count the badge should have.
     *
     * @public
     * @remarks
     * HTML Attribute: count
     */
    count: number;
    protected countChanged(): void;
    /**
     * Max number to be displayed
     *
     * @public
     * @remarks
     * HTML Attribute: overflow-count
     */
    overflowCount: number;
    protected overflowCountChanged(): void;
    /**
     * If the badge should be shown when count is 0
     *
     * @public
     * @remarks
     * HTML Attribute: show-zero
     */
    showZero: boolean;
    /**
     * If a dot should be displayed without the count
     *
     * @public
     * @remarks
     * HTML Attribute: dot
     */
    dot: boolean;
    /**
     * @internal
     * Function to set the count
     * This is the default slotted content for the counter badge
     * If children are slotted, that will override the value returned
     */
    setCount(): string | void;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API extractor.
 * TODO: Below will be unnecessary when Badge class gets updated
 * @internal
 */
export declare interface CounterBadge extends StartEnd {
}

/**
 * CounterBadgeAppearance constants
 * @public
 */
export declare const CounterBadgeAppearance: {
    readonly filled: "filled";
    readonly ghost: "ghost";
};

/**
 * A CounterBadge can have an appearance of filled or ghost
 * @public
 */
export declare type CounterBadgeAppearance = ValuesOf<typeof CounterBadgeAppearance>;

/**
 * CounterBadgeColor constants
 * @public
 */
export declare const CounterBadgeColor: {
    readonly brand: "brand";
    readonly danger: "danger";
    readonly important: "important";
    readonly informative: "informative";
    readonly severe: "severe";
    readonly subtle: "subtle";
    readonly success: "success";
    readonly warning: "warning";
};

/**
 * A CounterBadge can be one of preset colors
 * @public
 */
export declare type CounterBadgeColor = ValuesOf<typeof CounterBadgeColor>;

/**
 * The Fluent CounterBadge Element. Implements {@link @microsoft/fast-foundation#Badge },
 * {@link @microsoft/fast-foundation#badgeTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-counter-badge\>
 */
export declare const CounterBadgeDefinition: FASTElementDefinition<typeof CounterBadge>;

/**
 * CounterBadge options
 * @public
 */
export declare type CounterBadgeOptions = BadgeOptions;

/**
 * A CounterBadge shape can be circular or rounded.
 * @public
 */
export declare const CounterBadgeShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
};

/**
 * A CounterBadge can be one of preset colors
 * @public
 */
export declare type CounterBadgeShape = ValuesOf<typeof CounterBadgeShape>;

/**
 * A CounterBadge can be square, circular or rounded.
 * @public
 */
export declare const CounterBadgeSize: {
    readonly tiny: "tiny";
    readonly extraSmall: "extra-small";
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
};

/**
 * A CounterBadge can be on of several preset sizes.
 * @public
 */
export declare type CounterBadgeSize = ValuesOf<typeof CounterBadgeSize>;

/** Badge styles
 * @public
 */
export declare const CounterBadgeStyles: ElementStyles;

/**
 * The template for the Counter Badge component.
 * @public
 */
export declare const CounterBadgeTemplate: ElementViewTemplate<CounterBadge>;

export declare const curveAccelerateMax: CSSDesignToken<string>;

export declare const curveAccelerateMid: CSSDesignToken<string>;

export declare const curveAccelerateMin: CSSDesignToken<string>;

export declare const curveDecelerateMax: CSSDesignToken<string>;

export declare const curveDecelerateMid: CSSDesignToken<string>;

export declare const curveDecelerateMin: CSSDesignToken<string>;

export declare const curveEasyEase: CSSDesignToken<string>;

export declare const curveEasyEaseMax: CSSDesignToken<string>;

export declare const curveLinear: CSSDesignToken<string>;

/**
 * Dialog component that extends the FASTElement class.
 *
 * @public
 * @extends FASTElement
 */
export declare class Dialog extends FASTElement {
    /**
     * @private
     * Indicates whether focus is being trapped within the dialog
     */
    private isTrappingFocus;
    /**
     * @public
     * Lifecycle method called when the element is connected to the DOM
     */
    connectedCallback(): void;
    /**
     * @public
     * Lifecycle method called when the element is disconnected from the DOM
     */
    disconnectedCallback(): void;
    /**
     * @public
     * The dialog element
     */
    dialog: HTMLDialogElement;
    /**
     * @public
     * The title action elements
     */
    titleAction: HTMLElement[];
    /**
     * @public
     * The default title action button
     */
    defaultTitleAction?: Button;
    /**
     * @public
     * The ID of the element that describes the dialog
     */
    ariaDescribedby?: string;
    /**
     * @public
     * The ID of the element that labels the dialog
     */
    ariaLabelledby?: string;
    /**
     * @public
     * The type of the dialog modal
     */
    modalType: DialogModalType;
    /**
     * @public
     * Indicates whether the dialog is open
     */
    open: boolean;
    /**
     * @public
     * Indicates whether the dialog has a title action
     */
    noTitleAction: boolean;
    /**
     * @private
     * Indicates whether focus should be trapped within the dialog
     */
    private trapFocus;
    /**
     * @public
     * Method called when the 'open' attribute changes
     */
    openChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * @public
     * Method called when the 'modalType' attribute changes
     */
    modalTypeChanged(oldValue: DialogModalType, newValue: DialogModalType): void;
    /**
     * @public
     * Method to set the component's state based on its attributes
     */
    setComponent(): void;
    /**
     * @public
     * Method to emit an event when the dialog's open state changes
     * @param dismissed - Indicates whether the dialog was dismissed
     */
    onOpenChangeEvent: (dismissed?: boolean) => void;
    /**
     * @public
     * Method to show the dialog
     */
    show(): void;
    /**
     * @public
     * Method to hide the dialog
     * @param dismissed - Indicates whether the dialog was dismissed
     */
    hide(dismissed?: boolean): void;
    /**
     * @public
     * Method to dismiss the dialog
     */
    dismiss(): void;
    /**
     * @public
     * Handles click events on the dialog
     * @param event - The click event
     * @returns boolean
     */
    handleClick(event: Event): boolean;
    /**
     * @public
     * Handles keydown events on the dialog
     * @param e - The keydown event
     * @returns boolean | void
     */
    handleKeydown: (e: KeyboardEvent) => boolean | void;
    /**
     * @private
     * Handles keydown events on the document
     * @param e - The keydown event
     */
    private handleDocumentKeydown;
    /**
     * @private
     * Handles tab keydown events
     * @param e - The keydown event
     */
    private handleTabKeyDown;
    /**
     * @private
     * Gets the bounds of the tab queue
     * @returns (HTMLElement | SVGElement)[]
     */
    private getTabQueueBounds;
    /**
     * @private
     * Focuses the first element in the tab queue
     */
    private focusFirstElement;
    /**
     * @private
     * Determines if focus should be forced
     * @param currentFocusElement - The currently focused element
     * @returns boolean
     */
    private shouldForceFocus;
    /**
     * @private
     * Determines if focus should be trapped
     * @returns boolean
     */
    private shouldTrapFocus;
    /**
     * @private
     * Handles focus events on the document
     * @param e - The focus event
     */
    private handleDocumentFocus;
    /**
     * @private
     * Updates the state of focus trapping
     * @param shouldTrapFocusOverride - Optional override for whether focus should be trapped
     */
    private updateTrapFocus;
    /**
     * @private
     * Reduces the list of tabbable items
     * @param elements - The current list of elements
     * @param element - The element to consider adding to the list
     * @returns HTMLElement[]
     */
    private static reduceTabbableItems;
    /**
     * @private
     * Determines if an element is a focusable FASTElement
     * @param element - The element to check
     * @returns boolean
     */
    private static isFocusableFastElement;
    /**
     * @private
     * Determines if an element has a tabbable shadow
     * @param element - The element to check
     * @returns boolean
     */
    private static hasTabbableShadow;
}

/**
 * The Fluent Dialog Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-dialog\>
 */
export declare const DialogDefinition: FASTElementDefinition<typeof Dialog>;

/**
 * Dialog modal type
 * @public
 */
declare const DialogModalType: {
    readonly modal: "modal";
    readonly nonModal: "non-modal";
    readonly alert: "alert";
};

declare type DialogModalType = ValuesOf<typeof DialogModalType>;

/** Dialog styles
 * @public
 */
export declare const DialogStyles: ElementStyles;

/**
 * Template for the Dialog component
 * @public
 */
export declare const DialogTemplate: ElementViewTemplate<Dialog>;

/**
 * @class Divider component
 *
 * @remarks
 * This class extends the FASTDivider. A divider groups sections of content to create visual rhythm and hierarchy. Use dividers along with spacing and headers to organize content in your layout.
 */
export declare class Divider extends FASTDivider {
    /**
     * @property alignContent
     * @default center
     * @remarks
     * Determines the alignment of the content within the divider. Select from start or end. When not specified, the content will be aligned to the center.
     */
    alignContent?: DividerAlignContent;
    /**
     * @property appearance
     * @default default
     * @remarks
     * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
     */
    appearance?: DividerAppearance;
    /**
     * @property inset
     * @default false
     * @remarks
     * Adds padding to the beginning and end of the divider.
     */
    inset?: boolean;
}

/**
 * Align content within divider
 * @public
 */
export declare const DividerAlignContent: {
    readonly center: "center";
    readonly start: "start";
    readonly end: "end";
};

/**
 * The types for DividerAlignContent
 * @public
 */
export declare type DividerAlignContent = ValuesOf<typeof DividerAlignContent>;

/**
 * DividerAppearance - divider color defined by a design token alias.
 * @public
 */
export declare const DividerAppearance: {
    readonly strong: "strong";
    readonly brand: "brand";
    readonly subtle: "subtle";
    readonly default: "default";
};

/**
 * The types for Appearance
 * @public
 */
export declare type DividerAppearance = ValuesOf<typeof DividerAppearance>;

/**
 * The Fluent Divider Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-divider\>
 */
export declare const DividerDefinition: FASTElementDefinition<typeof Divider>;

export { DividerOrientation }

export { DividerRole }

/** Divider styles
 * @public
 */
export declare const DividerStyles: ElementStyles;

/**
 * Template for the Divider component
 * @public
 */
export declare const DividerTemplate: ElementViewTemplate<Divider>;

export declare const durationFast: CSSDesignToken<string>;

export declare const durationFaster: CSSDesignToken<string>;

export declare const durationNormal: CSSDesignToken<string>;

export declare const durationSlow: CSSDesignToken<string>;

export declare const durationSlower: CSSDesignToken<string>;

export declare const durationUltraFast: CSSDesignToken<string>;

export declare const durationUltraSlow: CSSDesignToken<string>;

export declare const FluentDesignSystem: Readonly<{
    prefix: "fluent";
    shadowRootMode: "open";
    registry: CustomElementRegistry;
}>;

export declare const fontFamilyBase: CSSDesignToken<string>;

export declare const fontFamilyMonospace: CSSDesignToken<string>;

export declare const fontFamilyNumeric: CSSDesignToken<string>;

export declare const fontSizeBase100: CSSDesignToken<string>;

export declare const fontSizeBase200: CSSDesignToken<string>;

export declare const fontSizeBase300: CSSDesignToken<string>;

export declare const fontSizeBase400: CSSDesignToken<string>;

export declare const fontSizeBase500: CSSDesignToken<string>;

export declare const fontSizeBase600: CSSDesignToken<string>;

export declare const fontSizeHero1000: CSSDesignToken<string>;

export declare const fontSizeHero700: CSSDesignToken<string>;

export declare const fontSizeHero800: CSSDesignToken<string>;

export declare const fontSizeHero900: CSSDesignToken<string>;

export declare const fontWeightBold: CSSDesignToken<string>;

export declare const fontWeightMedium: CSSDesignToken<string>;

export declare const fontWeightRegular: CSSDesignToken<string>;

export declare const fontWeightSemibold: CSSDesignToken<string>;

/**
 * The base class used for constucting a fluent image custom element
 * @public
 */
declare class Image_2 extends FASTElement {
    /**
     * Image layout
     *
     * @public
     * @remarks
     * HTML attribute: block.
     */
    block?: boolean;
    /**
     * Image border
     *
     * @public
     * @remarks
     * HTML attribute: border.
     */
    bordered?: boolean;
    /**
     * Image shadow
     *
     * @public
     * @remarks
     * HTML attribute: shadow.
     */
    shadow?: boolean;
    /**
     * Image fit
     *
     * @public
     * @remarks
     * HTML attribute: fit.
     */
    fit?: ImageFit;
    /**
     * Image shape
     *
     * @public
     * @remarks
     * HTML attribute: shape.
     */
    shape?: ImageShape;
}
export { Image_2 as Image }

/**
 * The Fluent Image Element
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-image\>
 */
export declare const ImageDefinition: FASTElementDefinition<typeof Image_2>;

/**
 * Image fit
 * @public
 */
export declare const ImageFit: {
    readonly none: "none";
    readonly center: "center";
    readonly contain: "contain";
    readonly cover: "cover";
    readonly default: "default";
};

/**
 * Types for image fit
 * @public
 */
export declare type ImageFit = ValuesOf<typeof ImageFit>;

/**
 * Image shape
 * @public
 */
export declare const ImageShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

export declare type ImageShape = ValuesOf<typeof ImageShape>;

/** Image styles
 *
 * @public
 */
export declare const ImageStyles: ElementStyles;

/**
 * Template for the Image component
 * @public
 */
export declare const ImageTemplate: ElementViewTemplate<Image_2>;

/**
 * The base class used for constructing a fluent-label custom element
 * @public
 */
export declare class Label extends FASTElement {
    /**
     * 	Specifies font size of a label
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: size
     */
    size?: LabelSize;
    /**
     * 	Specifies font weight of a label
     *
     * @public
     * @default 'regular'
     * @remarks
     * HTML Attribute: weight
     */
    weight?: LabelWeight;
    /**
     * 	Specifies styles for label when associated input is disabled
     *
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     * 	Specifies styles for label when associated input is a required field
     *
     * @public
     * @remarks
     * HTML Attribute: required
     */
    required: boolean;
}

/**
 * The Fluent Label Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-label\>
 */
export declare const LabelDefinition: FASTElementDefinition<typeof Label>;

/**
 * A Labels font size can be small, medium, or large
 */
declare const LabelSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * Applies font size to label
 * @public
 */
declare type LabelSize = ValuesOf<typeof LabelSize>;

/** Label styles
 * @public
 */
export declare const LabelStyles: ElementStyles;

export declare const LabelTemplate: ElementViewTemplate<Label>;

/**
 * A label can have a font weight of regular or strong
 */
declare const LabelWeight: {
    readonly regular: "regular";
    readonly semibold: "semibold";
};

/**
 * Applies font weight to label
 * @public
 */
declare type LabelWeight = ValuesOf<typeof LabelWeight>;

export declare const lineHeightBase100: CSSDesignToken<string>;

export declare const lineHeightBase200: CSSDesignToken<string>;

export declare const lineHeightBase300: CSSDesignToken<string>;

export declare const lineHeightBase400: CSSDesignToken<string>;

export declare const lineHeightBase500: CSSDesignToken<string>;

export declare const lineHeightBase600: CSSDesignToken<string>;

export declare const lineHeightHero1000: CSSDesignToken<string>;

export declare const lineHeightHero700: CSSDesignToken<string>;

export declare const lineHeightHero800: CSSDesignToken<string>;

export declare const lineHeightHero900: CSSDesignToken<string>;

/**
 * The Menu class represents a menu component.
 * @public
 */
export declare class Menu extends FASTElement {
    /**
     * Determines if the menu should open on hover.
     * @public
     */
    openOnHover?: boolean;
    /**
     * Determines if the menu should open on right click.
     * @public
     */
    openOnContext?: boolean;
    /**
     * Determines if the menu should close on scroll.
     * @public
     */
    closeOnScroll?: boolean;
    /**
     * Determines if the menu open state should persis on click of menu item
     * @public
     */
    persistOnItemClick?: boolean;
    /**
     * Defines whether the menu is open or not.
     * @public
     */
    open: boolean;
    /**
     * Holds the slotted menu list.
     * @public
     */
    slottedMenuList: MenuList[];
    /**
     * Holds the slotted triggers.
     * @public
     */
    slottedTriggers: HTMLElement[];
    /**
     * The positioning container of the menu.
     * @internal
     */
    positioningContainer?: HTMLElement;
    /**
     * The trigger element of the menu.
     * @private
     */
    private _trigger?;
    /**
     * The menu list element of the menu.
     * @private
     */
    private _menuList?;
    /**
     * Holds a reference to a function that is used to cleanup resources.
     * @public
     */
    cleanup?: () => void;
    /**
     * Called when the element is connected to the DOM.
     * Sets up the component.
     * @public
     */
    connectedCallback(): void;
    /**
     * Called when the element is disconnected from the DOM.
     * Removes event listeners.
     * @public
     */
    disconnectedCallback(): void;
    /**
     * Sets the component.
     * Sets the trigger and menu list elements and adds event listeners.
     * @public
     */
    setComponent(): void;
    /**
     * Toggles the open state of the menu.
     * @public
     */
    toggleMenu: () => void;
    /**
     * Closes the menu.
     * @public
     */
    closeMenu: () => void;
    /**
     * Opens the menu.
     * @public
     */
    openMenu: (e?: Event) => void;
    /**
     * Focuses on the menu list.
     * @public
     */
    focusMenuList(): void;
    /**
     * Focuses on the menu trigger.
     * @public
     */
    focusTrigger(): void;
    /**
     * Called whenever the open state changes.
     * Updates the 'aria-expanded' attribute and sets the positioning of the menu.
     * Sets menu list position
     * emits openChanged event
     * @public
     * @param {boolean} oldValue - The previous value of 'open'.
     * @param {boolean} newValue - The new value of 'open'.
     */
    openChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'openOnHover' property changes.
     * Adds or removes a 'mouseover' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'openOnHover'.
     * @param {boolean} newValue - The new value of 'openOnHover'.
     */
    openOnHoverChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'persistOnItemClick' property changes.
     * Adds or removes a 'click' event listener to the menu list based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'persistOnItemClick'.
     * @param {boolean} newValue - The new value of 'persistOnItemClick'.
     */
    persistOnItemClickChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'openOnContext' property changes.
     * Adds or removes a 'contextmenu' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'openOnContext'.
     * @param {boolean} newValue - The new value of 'openOnContext'.
     */
    openOnContextChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * Called whenever the 'closeOnScroll' property changes.
     * Adds or removes a 'closeOnScroll' event listener to the trigger based on the new value.
     * @public
     * @param {boolean} oldValue - The previous value of 'closeOnScroll'.
     * @param {boolean} newValue - The new value of 'closeOnScroll'.
     */
    closeOnScrollChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * The task to set the positioning of the menu.
     * @protected
     */
    protected setPositioningTask: () => void;
    /**
     * Sets the positioning of the menu.
     * @protected
     */
    protected setPositioning(): void;
    /**
     * Adds event listeners.
     * Adds click and keydown event listeners to the trigger and a click event listener to the document.
     * If 'openOnHover' is true, adds a 'mouseover' event listener to the trigger.
     * @public
     */
    private addListeners;
    /**
     * Removes event listeners.
     * Removes click and keydown event listeners from the trigger and a click event listener from the document.
     * Also removes 'mouseover' event listeners from the trigger.
     * @private
     */
    private removeListeners;
    /**
     * Handles keyboard interaction for the menu.
     * Closes the menu and focuses on the trigger when the Escape key is pressed.
     * Closes the menu when the Tab key is pressed.
     * @public
     * @param {KeyboardEvent} e - the keyboard event
     */
    handleMenuKeydown(e: KeyboardEvent): boolean | void;
    /**
     * Handles keyboard interaction for the trigger.
     * Toggles the menu when the Space or Enter key is pressed.
     * If the menu is open, focuses on the menu list.
     * @public
     * @param {KeyboardEvent} e - the keyboard event
     */
    handleTriggerKeydown: (e: KeyboardEvent) => boolean | void;
    /**
     * Handles document click events to close the menu when a click occurs outside of the menu or the trigger.
     * @private
     * @param {Event} e - The event triggered on document click.
     */
    private handleDocumentClick;
}

/**
 * The base class used for constructing a fluent-menu-button custom element
 * @public
 */
export declare class MenuButton extends Button {
}

/**
 * Menu Button Appearance constants
 * @public
 */
export declare const MenuButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};

/**
 * A Menu Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type MenuButtonAppearance = ValuesOf<typeof MenuButtonAppearance>;

/**
 * The Fluent Menu Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-button\>
 */
export declare const MenuButtonDefinition: FASTElementDefinition<typeof MenuButton>;

/**
 * A Menu Button can be square, circular or rounded.
 * @public
 */
export declare const MenuButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * A Menu Button can be square, circular or rounded
 * @public
 */
export declare type MenuButtonShape = ValuesOf<typeof MenuButtonShape>;

/**
 * A Menu Button can be a size of small, medium or large.
 * @public
 */
export declare const MenuButtonSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * A Menu Button can be on of several preset sizes.
 * @public
 */
export declare type MenuButtonSize = ValuesOf<typeof MenuButtonSize>;

/**
 * The template for the Button component.
 * @public
 */
export declare const MenuButtonTemplate: ElementViewTemplate<MenuButton>;

/**
 * The Fluent Menu Element.
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu>
 */
export declare const MenuDefinition: FASTElementDefinition<typeof Menu>;

/**
 * The base class used for constructing a fluent-menu-item custom element
 * @public
 */
export declare class MenuItem extends FASTMenuItem {
}

export declare type MenuItemColumnCount = 0 | 1 | 2;

/**
 * The Fluent Menu Item Element. Implements {@link @microsoft/fast-foundation#MenuItem },
 * {@link @microsoft/fast-foundation#menuItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu-item>
 */
export declare const MenuItemDefinition: FASTElementDefinition<typeof MenuItem>;

export { MenuItemRole }

/** MenuItem styles
 * @public
 */
export declare const MenuItemStyles: ElementStyles;

export declare const MenuItemTemplate: ElementViewTemplate<MenuItem>;

/**
 * The base class used for constructing a fluent-menu-list custom element
 * @public
 */
export declare class MenuList extends FASTMenu {
    protected setItems(): void;
    private static elementIndent;
}

/**
 * The Fluent MenuList Element. Implements {@link @microsoft/fast-foundation#Menu },
 * {@link @microsoft/fast-foundation#menuTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: <fluent-menu-list>
 */
export declare const MenuListDefinition: FASTElementDefinition<typeof MenuList>;

/** MenuList styles
 * @public
 */
export declare const MenuListStyles: ElementStyles;

export declare const MenuListTemplate: ElementViewTemplate<MenuList>;

/** Menu styles
 * @public
 */
export declare const MenuStyles: ElementStyles;

export declare const MenuTemplate: ElementViewTemplate<Menu>;

/**
 * The base class used for constructing a fluent-progress-bar custom element
 * @public
 */
declare class ProgressBar_2 extends FASTProgress {
    /**
     * The thickness of the progress bar
     *
     * @public
     * @remarks
     * HTML Attribute: thickness
     */
    thickness?: ProgressBarThickness;
    /**
     * The shape of the progress bar
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape?: ProgressBarShape;
    /**
     * The validation state of the progress bar
     * @public
     * @remarks
     * HTML Attribute: validation-state
     */
    validationState: ProgressBarValidationState | null;
}
export { ProgressBar_2 as ProgressBar }

/**
 * The Fluent ProgressBar Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-progress-bar\>
 */
export declare const ProgressBarDefinition: FASTElementDefinition<typeof ProgressBar_2>;

/**
 * ProgressBarShape Constants
 * @public
 */
export declare const ProgressBarShape: {
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * Applies bar shape to the content
 * @public
 */
export declare type ProgressBarShape = ValuesOf<typeof ProgressBarShape>;

/** ProgressBar styles
 * @public
 */
export declare const ProgressBarStyles: ElementStyles;

export declare const ProgressBarTemplate: ElementViewTemplate<ProgressBar_2>;

/**
 * ProgressBarThickness Constants
 * @public
 */
export declare const ProgressBarThickness: {
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * Applies bar thickness to the content
 * @public
 */
export declare type ProgressBarThickness = ValuesOf<typeof ProgressBarThickness>;

/**
 * ProgressBarValidationState Constants
 * @public
 */
export declare const ProgressBarValidationState: {
    readonly success: "success";
    readonly warning: "warning";
    readonly error: "error";
};

/**
 * Applies validation state to the content
 * @public
 */
export declare type ProgressBarValidationState = ValuesOf<typeof ProgressBarValidationState>;

/**
 * The base class used for constructing a fluent-radio custom element
 * @public
 */
export declare class Radio extends FASTRadio {
}

/**
 * The Fluent Radio Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio\>
 */
export declare const RadioDefinition: FASTElementDefinition<typeof Radio>;

/**
 * The base class used for constructing a fluent-radio-group custom element
 * @public
 */
export declare class RadioGroup extends FASTRadioGroup {
    /**
     * sets radio layout styles
     *
     * @public
     * @remarks
     * HTML Attribute: stacked
     */
    stacked: boolean;
}

/**
 * The Fluent RadioGroup Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-radio-group\>
 */
export declare const RadioGroupDefinition: FASTElementDefinition<typeof RadioGroup>;

export { RadioGroupOrientation }

/** RadioGroup styles
 * @public
 */
export declare const RadioGroupStyles: ElementStyles;

export declare const RadioGroupTemplate: ElementViewTemplate<RadioGroup>;

/** Radio styles
 * @public
 */
export declare const RadioStyles: ElementStyles;

export declare const RadioTemplate: ElementViewTemplate<Radio>;

/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export declare const setTheme: (theme: Theme) => void;

export declare const setThemeFor: (element: FASTElement, theme: Theme) => void;

export declare const shadow16: CSSDesignToken<string>;

export declare const shadow16Brand: CSSDesignToken<string>;

export declare const shadow2: CSSDesignToken<string>;

export declare const shadow28: CSSDesignToken<string>;

export declare const shadow28Brand: CSSDesignToken<string>;

export declare const shadow2Brand: CSSDesignToken<string>;

export declare const shadow4: CSSDesignToken<string>;

export declare const shadow4Brand: CSSDesignToken<string>;

export declare const shadow64: CSSDesignToken<string>;

export declare const shadow64Brand: CSSDesignToken<string>;

export declare const shadow8: CSSDesignToken<string>;

export declare const shadow8Brand: CSSDesignToken<string>;

/**
 * The base class used for constructing a fluent-slider custom element
 * @public
 */
export declare class Slider extends FASTSlider {
    /**
     * The size of the slider
     * @public
     * @remarks
     * HTML Attribute: size
     */
    size?: SliderSize;
    handleChange(source: any, propertyName: string): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private stepStyles?;
    /**
     * Handles changes to step styling based on the step value
     * NOTE: This function is not a changed callback, stepStyles is not observable
     */
    private handleStepStyles;
}

/**
 * The Fluent Slider Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-slider\>
 */
export declare const SliderDefinition: FASTElementDefinition<typeof Slider>;

export { SliderOrientation }

/**
 * SliderSize Constants
 * @public
 */
export declare const SliderSize: {
    readonly small: "small";
    readonly medium: "medium";
};

/**
 * Applies bar height to the slider rail and diameter to the slider thumbs
 * @public
 */
export declare type SliderSize = ValuesOf<typeof SliderSize>;

/** Text styles
 * @public
 */
export declare const SliderStyles: ElementStyles;

export declare const SliderTemplate: ElementViewTemplate<FASTSlider>;

export declare const spacingHorizontalL: CSSDesignToken<string>;

export declare const spacingHorizontalM: CSSDesignToken<string>;

export declare const spacingHorizontalMNudge: CSSDesignToken<string>;

export declare const spacingHorizontalNone: CSSDesignToken<string>;

export declare const spacingHorizontalS: CSSDesignToken<string>;

export declare const spacingHorizontalSNudge: CSSDesignToken<string>;

export declare const spacingHorizontalXL: CSSDesignToken<string>;

export declare const spacingHorizontalXS: CSSDesignToken<string>;

export declare const spacingHorizontalXXL: CSSDesignToken<string>;

export declare const spacingHorizontalXXS: CSSDesignToken<string>;

export declare const spacingHorizontalXXXL: CSSDesignToken<string>;

export declare const spacingVerticalL: CSSDesignToken<string>;

export declare const spacingVerticalM: CSSDesignToken<string>;

export declare const spacingVerticalMNudge: CSSDesignToken<string>;

export declare const spacingVerticalNone: CSSDesignToken<string>;

export declare const spacingVerticalS: CSSDesignToken<string>;

export declare const spacingVerticalSNudge: CSSDesignToken<string>;

export declare const spacingVerticalXL: CSSDesignToken<string>;

export declare const spacingVerticalXS: CSSDesignToken<string>;

export declare const spacingVerticalXXL: CSSDesignToken<string>;

export declare const spacingVerticalXXS: CSSDesignToken<string>;

export declare const spacingVerticalXXXL: CSSDesignToken<string>;

/**
 * The base class used for constructing a fluent-spinner custom element
 * @public
 */
export declare class Spinner extends FASTProgressRing {
    /**
     * The size of the spinner
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: size
     */
    size?: SpinnerSize;
    /**
     * The appearance of the spinner
     * @public
     * @default 'primary'
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: SpinnerAppearance;
}

/**
 * SpinnerAppearance constants
 * @public
 */
export declare const SpinnerAppearance: {
    readonly primary: "primary";
    readonly inverted: "inverted";
};

/**
 * A Spinner's appearance can be either primary or inverted
 * @public
 */
export declare type SpinnerAppearance = ValuesOf<typeof SpinnerAppearance>;

/**
 * The Fluent Spinner Element. Implements {@link @microsoft/fast-foundation#ProgressRing },
 * {@link @microsoft/fast-foundation#progress-ringTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-spinner\>
 */
export declare const SpinnerDefinition: FASTElementDefinition<typeof Spinner>;

/**
 * SpinnerSize constants
 * @public
 */
export declare const SpinnerSize: {
    readonly tiny: "tiny";
    readonly extraSmall: "extra-small";
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
    readonly extraLarge: "extra-large";
    readonly huge: "huge";
};

/**
 * A Spinner's size can be either small, tiny, extra-small, medium, large, extra-large, or huge
 * @public
 */
export declare type SpinnerSize = ValuesOf<typeof SpinnerSize>;

export declare const SpinnerStyles: ElementStyles;

export declare const SpinnerTemplate: ElementViewTemplate<Spinner>;

export declare const strokeWidthThick: CSSDesignToken<string>;

export declare const strokeWidthThicker: CSSDesignToken<string>;

export declare const strokeWidthThickest: CSSDesignToken<string>;

export declare const strokeWidthThin: CSSDesignToken<string>;

declare const styles: ElementStyles;
export { styles as ButtonStyles }
export { styles as MenuButtonStyles }

export declare class Switch extends FASTSwitch {
    /**
     * The label position of the switch
     *
     * @public
     * @default 'after'
     * @remarks
     * HTML Attribute: labelposition
     */
    labelPosition: SwitchLabelPosition | undefined;
}

/**
 * The Fluent Switch Element.
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-switch\>
 */
export declare const SwitchDefinition: FASTElementDefinition<typeof Switch>;

/**
 * SwitchLabelPosition Constants
 * @public
 */
export declare const SwitchLabelPosition: {
    readonly above: "above";
    readonly after: "after";
    readonly before: "before";
};

/**
 * Applies label position
 * @public
 */
export declare type SwitchLabelPosition = ValuesOf<typeof SwitchLabelPosition>;

export declare const SwitchStyles: ElementStyles;

export declare const SwitchTemplate: ElementViewTemplate<Switch>;

/**
 * Tab extends the FASTTab and is a child of the TabList
 */
export declare class Tab extends FASTTab {
    private styles;
    connectedCallback(): void;
}

export declare const TabDefinition: FASTElementDefinition<typeof Tab>;

export declare class TabPanel extends FASTTabPanel {
}

export declare const TabPanelDefinition: FASTElementDefinition<typeof TabPanel>;

export declare const TabPanelStyles: ElementStyles;

export declare const TabPanelTemplate: ElementViewTemplate<FASTTabPanel, any>;

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

export declare const TabsAppearance: {
    readonly subtle: "subtle";
    readonly transparent: "transparent";
};

export declare type TabsAppearance = ValuesOf<typeof TabsAppearance>;

export declare const TabsDefinition: FASTElementDefinition<typeof Tabs>;

export { TabsOrientation }

export declare const TabsSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};

export declare type TabsSize = ValuesOf<typeof TabsSize>;

export declare const TabsStyles: ElementStyles;

export declare const TabsTemplate: ElementViewTemplate<FASTTabs, any>;

export declare const TabStyles: ElementStyles;

export declare const TabTemplate: ElementViewTemplate<FASTTab, any>;

/**
 * The base class used for constructing a fluent-text custom element
 * @public
 */
declare class Text_2 extends FASTElement {
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
export { Text_2 as Text }

/**
 * TextAlign Constants
 * @public
 */
export declare const TextAlign: {
    readonly start: "start";
    readonly end: "end";
    readonly center: "center";
    readonly justify: "justify";
};

/**
 * Aligns the content
 * @public
 */
export declare type TextAlign = ValuesOf<typeof TextAlign>;

/**
 * The Fluent Text Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text\>
 */
export declare const TextDefinition: FASTElementDefinition<typeof Text_2>;

/**
 * TextFont Constants
 * @public
 */
export declare const TextFont: {
    readonly base: "base";
    readonly numeric: "numeric";
    readonly monospace: "monospace";
};

/**
 * Applies font family to the content
 * @public
 */
export declare type TextFont = ValuesOf<typeof TextFont>;

/**
 * The base class used for constructing a fluent-text-input custom element
 * @public
 */
export declare class TextInput extends FASTTextField {
    /**
     * Defines TextInput control size
     *
     * @public
     * @default 'medium'
     * @remarks
     * HTML Attribute: control-size
     */
    controlSize?: TextInputControlSize;
    /**
     * Defines TextInput appearance.
     *
     * @public
     * @default 'outline'
     * @remarks
     * HTML Attribute: appearance
     */
    appearance?: TextInputAppearance;
}

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
 * The Fluent TextInput Element.
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-text-input\>
 */
export declare const TextInputDefinition: FASTElementDefinition<typeof TextInput>;

/** TextInput styles
 * @public
 */
export declare const TextInputStyles: ElementStyles;

/**
 * @internal
 */
export declare const TextInputTemplate: ElementViewTemplate<TextInput>;

export { TextInputType }

/**
 * TextSize constants
 * @public
 */
export declare const TextSize: {
    readonly _100: "100";
    readonly _200: "200";
    readonly _300: "300";
    readonly _400: "400";
    readonly _500: "500";
    readonly _600: "600";
    readonly _700: "700";
    readonly _800: "800";
    readonly _900: "900";
    readonly _1000: "1000";
};

/**
 * The type for TextSize
 * The font size and line height based on the theme tokens
 * @public
 */
export declare type TextSize = ValuesOf<typeof TextSize>;

/** Text styles
 * @public
 */
export declare const TextStyles: ElementStyles;

/**
 * @internal
 */
export declare const TextTemplate: ElementViewTemplate<Text_2>;

/**
 * TextWeight Constants
 * @public
 */
export declare const TextWeight: {
    readonly medium: "medium";
    readonly regular: "regular";
    readonly semibold: "semibold";
    readonly bold: "bold";
};

/**
 * Applies font weight to the content
 * @public
 */
export declare type TextWeight = ValuesOf<typeof TextWeight>;

/**
 * The base class used for constructing a fluent-toggle-button custom element
 * @public
 */
export declare class ToggleButton extends Button {
    /**
     * Tracks whether the "checked" property has been changed.
     * This is necessary to provide consistent behavior with
     * normal input checkboxes
     */
    protected dirtyChecked: boolean;
    /**
     * Provides the default checkedness of the input element
     * Passed down to proxy
     *
     * @public
     * @remarks
     * HTML Attribute: checked
     */
    checkedAttribute: boolean;
    protected checkedAttributeChanged(): void;
    defaultChecked: boolean;
    protected defaultCheckedChanged(): void;
    /**
     * The checked state of the control.
     *
     * @public
     */
    checked: boolean;
    protected checkedChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * The current checkedness of the element. This property serves as a mechanism
     * to set the `checked` property through both property assignment and the
     * .setAttribute() method. This is useful for setting the field's checkedness
     * in UI libraries that bind data through the .setAttribute() API
     * and don't support IDL attribute binding.
     */
    currentChecked: boolean;
    currentCheckedChanged(prev: boolean | undefined, next: boolean): void;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * @internal
     */
    protected handleToggleButtonClick: (e: MouseEvent) => void;
}

/**
 * Toggle Button Appearance constants
 * @public
 */
export declare const ToggleButtonAppearance: {
    readonly primary: "primary";
    readonly outline: "outline";
    readonly subtle: "subtle";
    readonly secondary: "secondary";
    readonly transparent: "transparent";
};

/**
 * A Toggle Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export declare type ToggleButtonAppearance = ValuesOf<typeof ToggleButtonAppearance>;

/**
 * The Fluent Toggle Button Element. Implements {@link @microsoft/fast-foundation#Button },
 * {@link @microsoft/fast-foundation#buttonTemplate}
 *
 * @public
 * @remarks
 * HTML Element: \<fluent-toggle-button\>
 */
export declare const ToggleButtonDefinition: FASTElementDefinition<typeof ToggleButton>;

/**
 * A Toggle Button can be square, circular or rounded.
 * @public
 */
export declare const ToggleButtonShape: {
    readonly circular: "circular";
    readonly rounded: "rounded";
    readonly square: "square";
};

/**
 * A Toggle Button can be square, circular or rounded
 * @public
 */
export declare type ToggleButtonShape = ValuesOf<typeof ToggleButtonShape>;

/**
 * A Toggle Button can be a size of small, medium or large.
 * @public
 */
export declare const ToggleButtonSize: {
    readonly small: "small";
    readonly medium: "medium";
    readonly large: "large";
};

/**
 * A Toggle Button can be on of several preset sizes.
 * @public
 */
export declare type ToggleButtonSize = ValuesOf<typeof ToggleButtonSize>;

export declare const ToggleButtonStyles: ElementStyles;

/**
 * The template for the ToggleButton component.
 * @public
 */
export declare const ToggleButtonTemplate: ElementViewTemplate<ToggleButton>;

export { }
