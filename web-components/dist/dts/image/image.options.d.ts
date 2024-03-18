import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
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
