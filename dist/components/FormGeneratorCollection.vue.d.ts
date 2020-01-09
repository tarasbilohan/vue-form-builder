import Vue from 'vue';
import { Schema, Errors, Model } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getFormGeneratorId(index: number): string;
    getFormGeneratorErrors(index: number): Errors;
    updateValue(value: Model): void;
    onItemModelUpdate(index: number, value: Model): void;
    onDelete(index: number): void;
    onAdd(): void;
}, unknown, {
    id: string;
    value: any[];
    errors: void | {
        [key: number]: Errors;
    };
    schema: Schema;
    label: string;
    formGroupClassName: string;
    help: string;
    required: boolean;
    allowAdd: boolean;
    addButtonLabel: string;
    allowDelete: boolean;
    deleteButtonLabel: string;
}>;
export default _default;
