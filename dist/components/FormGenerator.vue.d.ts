import Vue from 'vue';
import { Schema, Errors, Model, SchemaField, SchemaFieldParams } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    getFieldValue(field: SchemaField): any;
    getFieldErrors(field: SchemaField): any;
    getFieldProps(field: SchemaField): SchemaFieldParams;
    onFieldUpdate(field: SchemaField, value: unknown): void;
}, unknown, {
    model: Model;
    schema: Schema;
    errors: Errors;
    id: string;
}>;
export default _default;
