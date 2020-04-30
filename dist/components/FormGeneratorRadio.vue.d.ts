import Vue from 'vue';
import { ErrorMessages, RadioOptions } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    onChange(event: InputEvent): void;
}, unknown, {
    id: string;
    value: string | number;
    errors: ErrorMessages;
    label: string;
    options: RadioOptions;
    formGroupClassName: string;
    help: string;
    required: boolean;
    disabled: boolean;
}>;
export default _default;
