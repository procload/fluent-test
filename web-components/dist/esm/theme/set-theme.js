import * as tokens from './design-tokens.js';
const tokenNames = Object.keys(tokens);
/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export const setTheme = (theme) => {
    for (const t of tokenNames) {
        tokens[t].withDefault(theme[t]);
    }
};
export const setThemeFor = (element, theme) => {
    for (const t of tokenNames) {
        tokens[t].setValueFor(element, theme[t]);
    }
};
//# sourceMappingURL=set-theme.js.map