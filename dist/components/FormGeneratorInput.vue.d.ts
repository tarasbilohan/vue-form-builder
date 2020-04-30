import Vue from 'vue';
import { ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    onInput(event: InputEvent): void;
}, unknown, {
    id: string;
    value: string | number;
    errors: ErrorMessages;
    type: string;
    label: string;
    formGroupClassName: string;
    placeholder: string;
    help: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    autocomplete: string;
}>;
export default _default;
