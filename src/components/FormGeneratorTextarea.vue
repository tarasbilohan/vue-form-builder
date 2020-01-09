<template>
  <form-generator-form-item
    :class-name="formGroupClassName"
    class="form-generator-textarea"
  >
    <form-generator-label
      slot="label"
      :for-input="id"
      :label="label"
      :required="required"
    />
    <textarea
      :id="id"
      :placeholder="placeholder"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      class="form-generator-textarea__input"
      @input="onInput"
      @keyup.enter.stop=""
    />
    <form-generator-help
      slot="help"
      :help="help"
    />
    <form-generator-error
      slot="error"
      :errors="errors"
    />
  </form-generator-form-item>
</template>

<script lang="ts">
import Vue from 'vue'

import { ErrorMessages } from '../types'

import FormGeneratorFormItem from './FormGeneratorFormItem.vue'
import FormGeneratorLabel from './FormGeneratorLabel.vue'
import FormGeneratorHelp from './FormGeneratorHelp.vue'
import FormGeneratorError from './FormGeneratorError.vue'

export default Vue.extend({
  name: 'FormGeneratorTextarea',
  components: {
    FormGeneratorFormItem,
    FormGeneratorLabel,
    FormGeneratorHelp,
    FormGeneratorError
  },
  props: {
    id: {
      type: String as () => string,
      required: true
    },
    value: {
      type: [String, Number] as ((() => string) | (() => number))[],
      default: ''
    },
    errors: {
      type: Array as () => ErrorMessages,
      default: () => []
    },
    label: {
      type: String as () => string,
      default: ''
    },
    formGroupClassName: {
      type: String as () => string,
      default: ''
    },
    placeholder: {
      type: String as () => string,
      default: ''
    },
    help: {
      type: String as () => string,
      default: ''
    },
    required: {
      type: Boolean as () => boolean,
      default: true
    },
    readonly: {
      type: Boolean as () => boolean,
      default: false
    },
    disabled: {
      type: Boolean as () => boolean,
      default: false
    }
  },
  methods: {
    onInput (event: InputEvent) {
      const target = event.target as HTMLInputElement

      this.$emit('update:value', target.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-textarea {
  &__input {
    height: 37px;
    width: 100%;
    border-radius: 4px;
    border: solid 1px #d2d2d2;
    padding: 0 10px;

    &::placeholder {
      opacity: 0.5;
      font-size: 14px;
      letter-spacing: 0.3px;
    }
  }
}
</style>
