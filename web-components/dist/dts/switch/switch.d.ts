import { FASTSwitch } from '@microsoft/fast-foundation/switch.js';
import { SwitchLabelPosition } from './switch.options.js';
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
