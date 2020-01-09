<template>
  <form-generator-form-item
    :class-name="formGroupClassName"
    class="form-generator-radio"
  >
    <form-generator-label
      slot="label"
      :for-input="id"
      :label="label"
      :required="required"
    />
    <div class="radio-buttons">
      <label
        v-for="option in options"
        :key="option.key"
        class="radio-button"
      >
        <input
          :value="option.value"
          :checked="option.value === value"
          type="radio"
          class="radio-button__input"
          @change="onChange"
        >
        <span class="radio-button__title">
          {{ option.label }}
        </span>
      </label>
    </div>
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
  name: 'FormGeneratorRadio',
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
      type: Array as () => { value: string, label: string }[],
      required: true
    },
    formGroupClassName: {
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
    }
  },
  methods: {
    onChange (event: InputEvent) {
      const target = event.target as HTMLInputElement

      this.$emit('update:value', target.value)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-radio {
  .radio-button {
    font-size: 14px;
    margin: 0;

    &:hover {
      cursor: pointer;
    }

    &:not(:last-child) {
      margin-right: 35px;
    }

    &__input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      margin: 0;

      &:checked + .radio-button__title::after {
        opacity: 1;
      }

      &:checked + .radio-button__title::before {
        border-color: #f27023;
        background: #f27023;
      }
    }

    &__title {
      position: relative;
      padding: 0 0 0 25px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 16px;
        height: 16px;
        border: 1px solid #b2b2b2;
        border-radius: 50%;
        background: #fff;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 5px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
        opacity: 0;
        transition: 0.2s;
      }
    }
  }
}
</style>
