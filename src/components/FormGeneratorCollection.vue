<template>
  <form-generator-form-field
    :class-name="formGroupClassName"
    class="form-generator-collection"
  >
    <form-generator-label
      :for-input="id"
      :label="label"
      :required="false"
      class="form-generator-collection__label"
    />
    <form-generator-help
      :help="help"
    />
    <div class="form-generator-collection__items">
      <div
        v-for="(item, index) in value"
        :key="index"
        class="form-generator-collection__item collection-item"
      >
        <form-generator
          :id="getFormGeneratorId(index)"
          :model="item"
          :schema="schema"
          :errors="getFormGeneratorErrors(index)"
          @update:model="onItemModelUpdate(index, $event)"
        />
        <div
          v-if="isDeleteAllowed"
          class="collection-item__actions"
        >
          <button
            type="button"
            class="form-generator-collection__btn btn-delete"
            @click.prevent="onDeleteButtonClick(index)"
          >
            {{ deleteButtonLabel }}
          </button>
        </div>
      </div>
      <button
        v-if="isAddAllow"
        type="button"
        class="form-generator-collection__btn btn-add"
        @click.prevent="onAddButtonClick"
      >
        {{ addButtonLabel }}
      </button>
    </div>
  </form-generator-form-field>
</template>

<script lang="ts">
import Vue from 'vue'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'

import { Schema, Errors, Model } from '../types'

import FormGenerator from './FormGenerator.vue'
import FormGeneratorFormField from './FormGeneratorFormField.vue'
import FormGeneratorLabel from './FormGeneratorLabel.vue'
import FormGeneratorHelp from './FormGeneratorHelp.vue'

export default Vue.extend({
  name: 'FormGeneratorCollection',
  components: {
    FormGenerator,
    FormGeneratorFormField,
    FormGeneratorLabel,
    FormGeneratorHelp
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Array as () => Model[],
      required: true
    },
    errors: {
      type: Array as () => Errors[],
      default: () => []
    },
    schema: {
      type: Array as () => Schema,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    formGroupClassName: {
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
    isAddAllow: {
      type: Boolean,
      default: false
    },
    addButtonLabel: {
      type: String,
      default: 'Add new'
    },
    isDeleteAllowed: {
      type: Boolean,
      default: false
    },
    deleteButtonLabel: {
      type: String,
      default: 'Delete'
    }
  },
  methods: {
    getFormGeneratorId (index: number): string {
      return `${this.id}-${index}`
    },
    getFormGeneratorErrors (index: number): Errors {
      return get(this.errors, index, {})
    },
    updateValue (value: Model) {
      this.$emit('update:value', value)
      this.$emit('input', value)
    },
    onItemModelUpdate (index: number, value: Model) {
      const clonedValue = cloneDeep(this.value)

      set(clonedValue, index, value)

      this.updateValue(clonedValue)
    },
    onDeleteButtonClick (index: number) {
      const clonedValue = cloneDeep(this.value)

      clonedValue.splice(index, 1)

      this.updateValue(clonedValue)
    },
    onAddButtonClick () {
      const clonedValue = cloneDeep(this.value)

      const defaultItem = {}
      Object.values(this.schema).forEach((field) => {
        set(defaultItem, field.path, field.params.default || '')
      })

      clonedValue.push(defaultItem)

      this.updateValue(clonedValue)
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-collection {
  &__label {
    margin-bottom: 15px;
  }

  &__btn {
    border-radius: 4px;
    background-image: linear-gradient(to left, #9e9e9e, #b5b5b5);
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.88px;
    color: #fff;
    text-align: center;
    border: none;
    padding: 5px 10px;
  }

  .btn-add {
    background-image: linear-gradient(to left, #329235, #41a544);
  }

  .btn-delete {
    background-image: linear-gradient(to left, #d84727, #de5638);
  }

  .collection-item {
    &__actions {
      text-align: right;
    }

    &::v-deep {
      .form-generator-form-field {
        padding: 0;
      }
    }
  }
}
</style>
