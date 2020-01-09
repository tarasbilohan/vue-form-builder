<template>
  <form
    :id="builderId"
    class="form-builder"
    @keyup.enter="onFormEnter"
  >
    <form-generator-error
      slot="error"
      :errors="firstGlobalError"
      class="form-builder__error"
    />
    <form-generator
      :id="generatorId"
      :model="generatorModel"
      :schema="generatorSchema"
      :errors="generatorErrors"
      class="form-builder__fields"
      @update:model="onModelUpdate"
    />
    <div
      slot="actions"
      :class="`form-builder__actions--${actionsAlign}`"
      class="form-builder__actions actions"
    >
      <button
        type="button"
        class="actions__submit-btn form-btn"
        @click.prevent="onSubmitBtnClick"
      >
        {{ submitButtonLabel }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import kebabCase from 'lodash/kebabCase'
import isArray from 'lodash/isArray'

import { Schema, Errors, Model, ErrorMessages } from '../types'

import FormGenerator from './FormGenerator.vue'
import FormGeneratorError from './FormGeneratorError.vue'

export default Vue.extend({
  name: 'FormBuilder',
  components: {
    FormGenerator,
    FormGeneratorError
  },
  props: {
    model: {
      type: Object as () => Model,
      required: true
    },
    schema: {
      type: Array as () => Schema,
      required: true
    },
    errors: {
      type: Object as () => Errors,
      default: () => ({})
    },
    id: {
      type: String as () => string,
      required: true
    },
    actionsAlign: {
      type: String as () => ('right' | 'left' | 'center'),
      default: 'right',
      validator (value: unknown) {
        return ['right', 'left', 'center'].includes(`${value}`)
      }
    },
    submitButtonLabel: {
      type: String as () => string,
      default: 'Submit'
    }
  },
  computed: {
    generatorModel (): Model {
      return this.model
    },
    generatorSchema (): Schema {
      return this.schema
    },
    generatorErrors (): Errors {
      return this.errors
    },
    generatorId (): string {
      return this.builderId
    },
    builderId (): string {
      return kebabCase(this.id)
    },
    firstGlobalError (): ErrorMessages {
      if (this.errors.hasOwnProperty(0)) {
        return isArray(this.errors[0]) ? this.errors[0] : []
      } else if (this.errors.hasOwnProperty('0')) {
        return isArray(this.errors['0']) ? this.errors['0'] : []
      }

      return []
    }
  },
  methods: {
    onModelUpdate (model: Model) {
      this.$emit('update:model', model)
    },
    onSubmitBtnClick () {
      this.$emit('submit', { model: this.model })
    },
    onFormEnter () {
      this.$emit('submit', { model: this.model })
    }
  }
})
</script>

<style lang="scss" scoped>
.form-builder {
  &__error {
    padding: 0 45px;
    margin-bottom: 15px;
    text-align: center;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-bottom: -15px;

    &--left {
      justify-content: flex-start;
    }

    &--center {
      justify-content: center;
    }

    &--rigth {
      justify-content: flex-end;
    }

    .form-btn {
      display: block;
      width: 200px;
      height: 40px;
      border-radius: 100px;
      background-image: linear-gradient(to left, #ff6200, #ff7d00);
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 0.88px;
      color: #fff;
      text-transform: uppercase;
      text-align: center;
      border: none;
      margin-left: 15px;
      margin-bottom: 15px;
    }
  }
}
</style>
