import Vue from 'vue';
import { ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    onChange(event: InputEvent): void;
}, unknown, {
    id: string;
    value: string | number;
    errors: ErrorMessages;
    label: string;
    options: {
        value: string;
        label: string;
    }[];
    formGroupClassName: string;
    help: string;
    required: boolean;
}>;
export default _default;
