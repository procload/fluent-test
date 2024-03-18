import type { ValuesOf } from '@microsoft/fast-foundation/utilities.js';
/**
 * Dialog modal type
 * @public
 */
export declare const DialogModalType: {
    readonly modal: "modal";
    readonly nonModal: "non-modal";
    readonly alert: "alert";
};
export declare type DialogModalType = ValuesOf<typeof DialogModalType>;
