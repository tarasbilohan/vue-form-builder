<template>
  <form-generator-form-field
    :class-name="formGroupClassName"
    class="form-generator-input"
  >
    <form-generator-label
      :for-input="id"
      :label="label"
      :required="required"
    />
    <slot name="before-field" />
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      :autocomplete="autocomplete"
      class="form-generator-input__input"
      @input="onInput"
    >
    <slot name="after-field" />
    <form-generator-help
      :help="help"
    />
    <form-generator-error
      :errors="errors"
    />
  </form-generator-form-field>
</template>

<script lang="ts">
import Vue from 'vue'

import { ErrorMessages } from '../types'

import FormGeneratorFormField from './FormGeneratorFormField.vue'
import FormGeneratorLabel from './FormGeneratorLabel.vue'
import FormGeneratorHelp from './FormGeneratorHelp.vue'
import FormGeneratorError from './FormGeneratorError.vue'

export default Vue.extend({
  name: 'FormGeneratorInput',
  components: {
    FormGeneratorFormField,
    FormGeneratorLabel,
    FormGeneratorHelp,
    FormGeneratorError
  },
  props: {
    id: {
      type: String,
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
    type: {
      type: String as () => 'text' | 'email' | 'number' | 'password',
      default: 'text',
      validator (value) {
        const allowedTypes = [
          'text',
          'email',
          'number',
          'password'
        ]

        return allowedTypes.includes(`${value}`)
      }
    },
    label: {
      type: String,
      default: ''
    },
    formGroupClassName: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'on'
    }
  },
  methods: {
    onInput (event: InputEvent) {
      const target = event.target as HTMLInputElement

      this.$emit('update:value', target.value)
      this.$emit('input', target.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-input {
  &__input {
    height: 37px;
    width: 100%;
    border-radius: 4px;
    border: solid 1px #d2d2d2;
    padding: 0 10px;
    box-sizing: border-box;

    &::placeholder {
      opacity: 0.5;
      font-size: 14px;
      letter-spacing: 0.3px;
    }
  }
}
</style>
