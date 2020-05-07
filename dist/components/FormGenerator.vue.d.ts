import Vue from 'vue';
import { Schema, Errors, Model, SchemaField, SchemaFieldParams, ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getFieldValue(field: SchemaField): unknown;
    getFieldErrors(field: SchemaField): Errors | ErrorMessages;
    getFieldProps(field: SchemaField): SchemaFieldParams;
    onFieldUpdate(field: SchemaField, value: unknown): void;
}, unknown, {
    id: string;
    model: Model;
    schema: Schema;
    errors: Errors;
}>;
export default _default;
