import Vue from 'vue';
import { Schema, Errors, Model } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getFormGeneratorId(index: number): string;
    getFormGeneratorErrors(index: number): Errors;
    updateValue(value: Model[]): void;
    onItemModelUpdate(index: number, value: Model): void;
    onDeleteButtonClick(index: number): void;
    onAddButtonClick(): void;
}, unknown, {
    id: string;
    value: Model[];
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
