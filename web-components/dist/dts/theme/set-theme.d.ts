import type { Theme } from '@fluentui/tokens';
import { FASTElement } from '@microsoft/fast-element';
/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export declare const setTheme: (theme: Theme) => void;
export declare const setThemeFor: (element: FASTElement, theme: Theme) => void;
