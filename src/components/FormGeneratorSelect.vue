<template>
  <form-generator-form-item
    :class-name="formGroupClassName"
    class="form-generator-select"
  >
    <form-generator-label
      slot="label"
      :for-input="id"
      :label="label"
      :required="required"
    />
    <select
      v-model="computedValue"
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

import { ErrorMessages, SelectOptions } from '../types'

import FormGeneratorFormItem from './FormGeneratorFormItem.vue'
import FormGeneratorLabel from './FormGeneratorLabel.vue'
import FormGeneratorHelp from './FormGeneratorHelp.vue'
import FormGeneratorError from './FormGeneratorError.vue'

export default Vue.extend({
  name: 'FormGeneratorSelect',
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
    options: {
      type: [Array, Function] as ((() => SelectOptions) | (() => () => Promise<SelectOptions>))[],
      required: true
    },
    formGroupClassName: {
      type: String as () => string,
      default: ''
    },
    placeholder: {
      type: String as () => string,
      default: 'Please select'
    },
    help: {
      type: String as () => string,
      default: ''
    },
    required: {
      type: Boolean as () => boolean,
      default: true
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
      }
    }
  },
  async mounted () {
    if (typeof this.options === 'function') {
      this.selectOptions = await this.options()
    } else {
      this.selectOptions = this.options
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

    &::placeholder {
      opacity: 0.5;
      font-size: 14px;
      letter-spacing: 0.3px;
    }
  }
}
</style>
