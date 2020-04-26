import Vue from 'vue';
import { Schema, Errors, ErrorMessages } from '../types';
declare const _default: import("vue/types/vue").ExtendedVue<Vue, unknown, {
    onModelUpdate(model: object): void;
    onSubmitBtnClick(): void;
    onFormEnter(): void;
}, {
    generatorModel: object;
    generatorSchema: Schema;
    generatorErrors: Errors;
    generatorId: string;
    builderId: string;
    firstGlobalError: ErrorMessages;
}, {
    model: object;
    schema: Schema;
    errors: Errors;
    id: string;
    actionsAlign: unknown;
    submitButtonLabel: string;
}>;
export default _default;
