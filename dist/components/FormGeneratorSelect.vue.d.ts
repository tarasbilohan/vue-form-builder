import Vue from 'vue';
import { ErrorMessages, SelectOptions } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, {
    selectOptions: SelectOptions;
}, unknown, {
    computedValue: string | number;
}, {
    id: string;
    value: string | number;
    errors: ErrorMessages;
    label: string;
    options: SelectOptions | (() => Promise<SelectOptions>);
    formGroupClassName: string;
    placeholder: string;
    help: string;
    required: boolean;
    disabled: boolean;
}>;
export default _default;
