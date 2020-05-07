import Vue from 'vue';
import { ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    checked: boolean;
}, {
    onChange(event: InputEvent): void;
    setValue(value: boolean): void;
}, unknown, {
    id: string;
    value: boolean;
    errors: ErrorMessages;
    label: string;
    text: string;
    formGroupClassName: string;
    placeholder: string;
    help: string;
    required: boolean;
    disabled: boolean;
}>;
export default _default;
