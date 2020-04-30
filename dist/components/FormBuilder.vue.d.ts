import Vue from 'vue';
import { Schema, Errors, Model, ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    onModelUpdate(model: Model): void;
    onSubmitBtnClick(): void;
    onFormEnter(): void;
}, {
    generatorModel: Model;
    generatorSchema: Schema;
    generatorErrors: Errors;
    generatorId: string;
    builderId: string;
    firstGlobalError: ErrorMessages;
}, {
    model: Model;
    schema: Schema;
    errors: Errors;
    id: string;
    autocomplete: string;
    actionsAlign: unknown;
    submitButtonLabel: string;
}>;
export default _default;
