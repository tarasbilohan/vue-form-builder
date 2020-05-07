import Vue from 'vue';
import { ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    onInput(event: InputEvent): void;
}, unknown, {
    id: string;
    value: string | number;
    errors: ErrorMessages;
    label: string;
    formGroupClassName: string;
    placeholder: string;
    help: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
}>;
export default _default;
