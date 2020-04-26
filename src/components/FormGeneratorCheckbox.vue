<template>
  <form-generator-form-field
    :class-name="formGroupClassName"
    class="form-generator-checkbox"
  >
    <form-generator-label
      :for-input="id"
      :label="label"
      :required="required"
    />
    <label class="form-generator-checkbox__checkbox checkbox">
      <input
        :id="id"
        :checked="checked"
        :disabled="disabled"
        type="checkbox"
        name="isSubscribed"
        class="checkbox__input"
        @change="onChange"
      >
      <label
        :for="id"
        class="checkbox__label"
      >
        {{ text }}
      </label>
    </label>
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
  name: 'FormGeneratorCheckbox',
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
      type: Boolean,
      default: false
    },
    errors: {
      type: Array as () => ErrorMessages,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    text: {
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
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  watch: {
    value: {
      handler (value) {
        this.checked = Boolean(value)
        this.setValue(this.checked)
      },
      immediate: true
    }
  },
  methods: {
    onChange (event: InputEvent) {
      const target = event.target as HTMLInputElement
      this.setValue(target.checked)
    },
    setValue (value: boolean) {
      this.$emit('update:value', value)
      this.$emit('input', value)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-checkbox {
  .checkbox {
    position: relative;
    display: inline-block;
    backface-visibility: hidden;
    outline: 0;
    vertical-align: initial;
    font-style: normal;
    min-height: 16px;
    font-size: 16px;
    line-height: 16px;
    min-width: 16px;

    &__input {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      outline: none;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;

      &:checked {
        & + .checkbox__label {
          &::before {
            background-color: #f0702f;
            border: 1px solid #f0702f;
          }

          &::after {
            display: block;
          }
        }
      }
    }

    &__label {
      position: relative;
      display: block;
      padding-left: 30px;
      outline: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, .87);
      transition: color .1s ease;
      cursor: pointer;
      user-select: none;
      min-height: 16px;

      &::before,
      &::after {
        content: "";
        transition: border .1s ease, opacity .1s ease, transform .1s ease, box-shadow .1s ease;
        position: absolute;
        top: 0;
        left: 0;
        width: 16px;
        height: 16px;
        background-color: #fff;
        border: 1px solid #b2b2b2;
        border-radius: 3px;
      }

      &::after {
        display: none;
        background: transparent;
        width: 5px;
        height: 10px;
        border: 1px solid #fff;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin: 2px 0 0 6px;
        border-radius: 0;
      }
    }
  }
}
</style>
