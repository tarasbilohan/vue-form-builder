<template>
  <form-generator-form-field
    :class-name="formGroupClassName"
    class="form-generator-select"
  >
    <form-generator-label
      :for-input="id"
      :label="label"
      :required="required"
    />
    <slot name="before-field" />
    <select
      v-model="computedValue"
      :disabled="disabled"
      class="form-generator-select__select"
    >
      <option value="">
        {{ placeholder }}
      </option>
      <option
        v-for="option in selectOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
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

import { ErrorMessages, SelectOptions } from '../types'

import FormGeneratorFormField from './FormGeneratorFormField.vue'
import FormGeneratorLabel from './FormGeneratorLabel.vue'
import FormGeneratorHelp from './FormGeneratorHelp.vue'
import FormGeneratorError from './FormGeneratorError.vue'

export default Vue.extend({
  name: 'FormGeneratorSelect',
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
    label: {
      type: String,
      default: ''
    },
    options: {
      type: [Array, Function] as ((() => SelectOptions) | (() => () => Promise<SelectOptions>))[],
      required: true
    },
    formGroupClassName: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Please select'
    },
    help: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectOptions: [] as SelectOptions
    }
  },
  computed: {
    computedValue: {
      get (): string | number {
        return this.value
      },
      set (value: string | number) {
        this.$emit('update:value', value)
        this.$emit('change', value)
      }
    }
  },
  watch: {
    options: {
      async handler (options) {
        if (typeof options === 'function') {
          this.selectOptions = await options()
        } else {
          this.selectOptions = options
        }
      },
      immediate: true
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-select {
  &__select {
    height: 37px;
    width: 100%;
    border-radius: 4px;
    border: solid 1px #d2d2d2;
    padding: 0 10px;
    background: #fff;

    &::placeholder {
      opacity: 0.5;
      font-size: 14px;
      letter-spacing: 0.3px;
    }
  }
}
</style>
