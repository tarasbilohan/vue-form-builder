import Vue from 'vue';
import { Schema, Errors } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getFormGeneratorId(index: number): string;
    getFormGeneratorErrors(index: number): Errors;
    updateValue(value: object): void;
    onItemModelUpdate(index: number, value: object): void;
    onDeleteButtonClick(index: number): void;
    onAddButtonClick(): void;
}, unknown, {
    id: string;
    value: object[];
    errors: Errors[];
    schema: Schema;
    label: string;
    formGroupClassName: string;
    help: string;
    required: boolean;
    isAddAllow: boolean;
    addButtonLabel: string;
    isDeleteAllowed: boolean;
    deleteButtonLabel: string;
}>;
export default _default;
