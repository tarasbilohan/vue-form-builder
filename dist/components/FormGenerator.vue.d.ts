import Vue from 'vue';
import { Schema, Errors, SchemaField, SchemaFieldParams, ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getFieldValue(field: SchemaField): unknown;
    getFieldErrors(field: SchemaField): ErrorMessages | Errors;
    getFieldProps(field: SchemaField): SchemaFieldParams;
    onFieldUpdate(field: SchemaField, value: unknown): void;
}, unknown, {
    id: string;
    model: object;
    schema: Schema;
    errors: Errors;
}>;
export default _default;
